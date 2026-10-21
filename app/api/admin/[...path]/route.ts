import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/admin/db";
import {
  audit,
  HttpError,
  json,
  originCheck,
  readJson,
  requireAdmin,
  SESSION_COOKIE,
  signIn,
} from "@/lib/admin/auth";
import { adminInput, password } from "@/lib/admin/validation";
import { checkPassword, hashPassword } from "@/lib/admin/crypto";
const safeAdmin = {
  id: true,
  login: true,
  name: true,
  role: true,
  enabled: true,
  createdAt: true,
  session: { select: { lastSeen: true, expiresAt: true } },
} as const;
async function handle(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await context.params;
    const route = path.join("/");
    if (route === "auth/login" && request.method === "POST")
      return await signIn(request);
    if (request.method !== "GET") originCheck(request);
    const ownerRoute =
      route === "audit" ||
      route === "admins" ||
      route.startsWith("admins/") ||
      route === "settings" ||
      (route.startsWith("leads/") && request.method === "DELETE");
    const background =
      request.method === "GET" &&
      request.nextUrl.searchParams.get("background") === "1";
    const admin = await requireAdmin(
      request,
      ownerRoute,
      route !== "auth/session" && !background,
    );
    const url = request.nextUrl;
    const page = Math.max(
      1,
      Math.min(10000, Math.floor(Number(url.searchParams.get("page"))) || 1),
    );
    const search = (url.searchParams.get("q") || "").trim().slice(0, 100);
    const pagination = { skip: (page - 1) * 25, take: 25 };
    if (route === "auth/session" && request.method === "GET")
      return json({
        admin: {
          id: admin.id,
          name: admin.name,
          login: admin.login,
          role: admin.role,
        },
      });
    if (route === "auth/logout" && request.method === "POST") {
      await db().$transaction(async (tx) => {
        await tx.adminSession.deleteMany({ where: { adminId: admin.id } });
        await audit(request, admin, "LOGOUT", undefined, tx);
      });
      const response = json({ ok: true });
      response.cookies.set(SESSION_COOKIE, "", {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 0,
      });
      return response;
    }
    if (route === "auth/password" && request.method === "POST") {
      const input = z
        .object({ current: z.string().max(128), password })
        .parse(await readJson(request));
      if (!(await checkPassword(input.current, admin.passwordHash)))
        throw new HttpError(400, "Current password is incorrect.");
      const encoded = await hashPassword(input.password);
      await db().$transaction(async (tx) => {
        await tx.admin.update({
          where: { id: admin.id },
          data: { passwordHash: encoded },
        });
        await tx.adminSession.deleteMany({ where: { adminId: admin.id } });
        await audit(request, admin, "PASSWORD_CHANGED", undefined, tx);
      });
      return json({ ok: true, signInAgain: true });
    }
    if (route === "overview" && request.method === "GET") {
      const since = new Date(Date.now() - 7 * 86400000),
        activeSince = new Date(Date.now() - 120000);
      const [
        visitors,
        views,
        clicks,
        leads,
        active,
        pages,
        recent,
        settings,
        days,
      ] = await Promise.all([
        db().visitor.count({ where: { lastSeen: { gte: since } } }),
        db().activity.count({
          where: { kind: "page_view", createdAt: { gte: since } },
        }),
        db().activity.count({
          where: { kind: "click", createdAt: { gte: since } },
        }),
        db().lead.count({ where: { status: "NEW" } }),
        db().visit.findMany({
          where: { lastSeen: { gte: activeSince } },
          select: { visitorId: true },
          distinct: ["visitorId"],
        }),
        db().activity.groupBy({
          by: ["path"],
          where: { kind: "page_view", createdAt: { gte: since } },
          _count: { _all: true },
          orderBy: { _count: { path: "desc" } },
          take: 8,
        }),
        db().lead.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            name: true,
            residence: true,
            status: true,
            createdAt: true,
          },
        }),
        db().websiteSettings.findUnique({ where: { id: "website" } }),
        db().$queryRaw<
          { day: string; views: bigint }[]
        >`SELECT to_char("createdAt" AT TIME ZONE 'UTC','YYYY-MM-DD') as day,count(*) as views FROM "Activity" WHERE kind='page_view' AND "createdAt">=${since} GROUP BY day ORDER BY day`,
      ]);
      if (!background) await audit(request, admin, "VIEW_OVERVIEW");
      return json({
        visitors,
        views,
        clicks,
        newLeads: leads,
        active: active.length,
        pages: pages.map((p) => ({ path: p.path, views: p._count._all })),
        recent,
        tracking: settings?.trackingEnabled ?? true,
        days: days.map((d) => ({ day: d.day, views: Number(d.views) })),
      });
    }
    if (route === "visitors" && request.method === "GET") {
      const filtered = {
        lastSeen: { gte: new Date(Date.now() - 90 * 86400000) },
        ...(search
          ? {
              OR: [
                ...(z.uuid().safeParse(search).success ? [{ id: search }] : []),
                {
                  leads: {
                    some: {
                      OR: [
                        {
                          name: {
                            contains: search,
                            mode: "insensitive" as const,
                          },
                        },
                        {
                          email: {
                            contains: search,
                            mode: "insensitive" as const,
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            }
          : {}),
      };
      const [items, total] = await Promise.all([
        db().visitor.findMany({
          where: filtered,
          ...pagination,
          orderBy: { lastSeen: "desc" },
          select: {
            id: true,
            firstSeen: true,
            lastSeen: true,
            leads: {
              select: { name: true, email: true },
              take: 1,
              orderBy: { createdAt: "desc" },
            },
            visits: {
              take: 1,
              orderBy: { lastSeen: "desc" },
              select: {
                device: true,
                browser: true,
                events: {
                  take: 1,
                  orderBy: { createdAt: "desc" },
                  select: { path: true },
                },
              },
            },
            _count: { select: { visits: true } },
          },
        }),
        db().visitor.count({ where: filtered }),
      ]);
      if (!background) await audit(request, admin, "VIEW_VISITORS");
      return json({ items, total, page });
    }
    if (
      path[0] === "visitors" &&
      path.length === 2 &&
      request.method === "GET"
    ) {
      const id = z.uuid().parse(path[1]);
      const visitor = await db().visitor.findUnique({
        where: { id, lastSeen: { gte: new Date(Date.now() - 90 * 86400000) } },
        select: {
          id: true,
          firstSeen: true,
          lastSeen: true,
          leads: { select: { id: true, name: true, email: true, phone: true } },
          visits: {
            where: { lastSeen: { gte: new Date(Date.now() - 90 * 86400000) } },
            take: 25,
            orderBy: { startedAt: "desc" },
            select: {
              id: true,
              startedAt: true,
              lastSeen: true,
              device: true,
              browser: true,
              referrer: true,
            },
          },
        },
      });
      if (!visitor) throw new HttpError(404, "Visitor not found.");
      const events = await db().activity.findMany({
        where: {
          visit: { visitorId: id },
          createdAt: { gte: new Date(Date.now() - 90 * 86400000) },
        },
        orderBy: { createdAt: "desc" },
        take: 100,
        skip: (page - 1) * 100,
        select: {
          id: true,
          kind: true,
          path: true,
          target: true,
          depth: true,
          createdAt: true,
        },
      });
      if (!background) await audit(request, admin, "VIEW_VISITOR", id);
      const total = await db().activity.count({
        where: {
          visit: { visitorId: id },
          createdAt: { gte: new Date(Date.now() - 90 * 86400000) },
        },
      });
      return json({ visitor, events, total, page });
    }
    if (route === "leads" && request.method === "GET") {
      const where = search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
              { phone: { contains: search } },
            ],
          }
        : {};
      const [items, total] = await Promise.all([
        db().lead.findMany({
          where,
          ...pagination,
          orderBy: { createdAt: "desc" },
        }),
        db().lead.count({ where }),
      ]);
      await audit(request, admin, "VIEW_ENQUIRIES");
      return json({ items, total, page });
    }
    if (
      path[0] === "leads" &&
      path.length === 2 &&
      request.method === "PATCH"
    ) {
      const id = z.uuid().parse(path[1]);
      const input = z
        .object({ status: z.enum(["NEW", "CONTACTED", "CLOSED"]) })
        .parse(await readJson(request));
      await db().$transaction(async (tx) => {
        await tx.lead.update({ where: { id }, data: input });
        await audit(request, admin, "UPDATE_ENQUIRY_STATUS", id, tx);
      });
      return json({ ok: true });
    }
    if (
      path[0] === "leads" &&
      path.length === 2 &&
      request.method === "DELETE"
    ) {
      const id = z.uuid().parse(path[1]);
      await db().$transaction(async (tx) => {
        await tx.lead.delete({ where: { id } });
        await audit(request, admin, "DELETE_ENQUIRY", id, tx);
      });
      return json({ ok: true });
    }
    if (route === "admins" && request.method === "GET") {
      const items = await db().admin.findMany({
        select: safeAdmin,
        ...pagination,
        orderBy: { createdAt: "asc" },
      });
      await audit(request, admin, "VIEW_ADMINS");
      return json({ items, total: await db().admin.count(), page });
    }
    if (route === "admins" && request.method === "POST") {
      const input = adminInput.parse(await readJson(request));
      const encoded = await hashPassword(input.password);
      await db().$transaction(async (tx) => {
        const created = await tx.admin.create({
          data: { login: input.login, name: input.name, passwordHash: encoded },
        });
        await audit(request, admin, "CREATE_ADMIN", created.id, tx);
      });
      return json({ ok: true }, 201);
    }
    if (
      path[0] === "admins" &&
      path.length === 2 &&
      request.method === "PATCH"
    ) {
      const id = z.uuid().parse(path[1]);
      const input = z
        .object({
          enabled: z.boolean().optional(),
          password: password.optional(),
          revoke: z.literal(true).optional(),
        })
        .refine((v) => v.enabled !== undefined || v.password || v.revoke)
        .parse(await readJson(request));
      if (id === admin.id)
        throw new HttpError(400, "Use Account to change your own password.");
      const encoded = input.password
        ? await hashPassword(input.password)
        : undefined;
      await db().$transaction(async (tx) => {
        const target = await tx.admin.findUniqueOrThrow({ where: { id } });
        if (target.role === "OWNER")
          throw new HttpError(403, "The owner cannot be modified here.");
        await tx.admin.update({
          where: { id },
          data: { enabled: input.enabled, passwordHash: encoded },
        });
        await tx.adminSession.deleteMany({ where: { adminId: id } });
        await audit(
          request,
          admin,
          encoded
            ? "RESET_ADMIN_PASSWORD"
            : input.revoke
              ? "REVOKE_ADMIN_SESSION"
              : input.enabled
                ? "ENABLE_ADMIN"
                : "DISABLE_ADMIN",
          id,
          tx,
        );
      });
      return json({ ok: true });
    }
    if (route === "audit" && request.method === "GET") {
      const where = search
        ? {
            OR: [
              { action: { contains: search, mode: "insensitive" as const } },
              { actor: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {};
      const [items, total] = await Promise.all([
        db().audit.findMany({
          where,
          ...pagination,
          orderBy: { createdAt: "desc" },
        }),
        db().audit.count({ where }),
      ]);
      await audit(request, admin, "VIEW_AUDIT");
      return json({ items, total, page });
    }
    if (route === "settings" && request.method === "GET")
      return json({
        trackingEnabled:
          (await db().websiteSettings.findUnique({ where: { id: "website" } }))
            ?.trackingEnabled ?? true,
        retentionDays: 90,
      });
    if (route === "settings" && request.method === "PATCH") {
      const input = z
        .object({ trackingEnabled: z.boolean() })
        .parse(await readJson(request));
      await db().$transaction(async (tx) => {
        await tx.websiteSettings.upsert({
          where: { id: "website" },
          create: { id: "website", ...input },
          update: input,
        });
        await audit(
          request,
          admin,
          input.trackingEnabled ? "ENABLE_ANALYTICS" : "DISABLE_ANALYTICS",
          undefined,
          tx,
        );
      });
      return json({ ok: true });
    }
    throw new HttpError(404, "Endpoint not found.");
  } catch (error) {
    if (error instanceof HttpError)
      return json({ error: error.message }, error.status);
    if (error instanceof z.ZodError)
      return json(
        {
          error: "Check the highlighted values.",
          fields: error.flatten().fieldErrors,
        },
        400,
      );
    if ((error as { code?: string }).code === "P2002")
      return json({ error: "That login ID already exists." }, 409);
    if ((error as { code?: string }).code === "P2025")
      return json(
        { error: "This record is no longer available. Refresh and try again." },
        404,
      );
    return json(
      {
        error:
          "The database is not ready or is unavailable. Check the connection and apply migrations.",
      },
      503,
    );
  }
}
export const GET = handle;
export const POST = handle;
export const PATCH = handle;
export const DELETE = handle;
