import { NextRequest } from "next/server";
import { db } from "@/lib/admin/db";
import { digest, randomToken } from "@/lib/admin/crypto";
import { activityInput } from "@/lib/admin/validation";
import {
  HttpError,
  json,
  metadata,
  originCheck,
  rate,
  readJson,
} from "@/lib/admin/auth";
const VISITOR_COOKIE = "victoria_visitor";
export async function POST(request: NextRequest) {
  try {
    originCheck(request);
    const input = activityInput.parse(await readJson(request, 2500));
    if (
      (await db().websiteSettings.findUnique({ where: { id: "website" } }))
        ?.trackingEnabled === false
    )
      return json({ disabled: true });
    await rate(
      `analytics:${digest(request.cookies.get(VISITOR_COOKIE)?.value || metadata(request).ip)}`,
      180,
      60,
    );
    await rate(`analytics-network:${digest(metadata(request).ip)}`, metadata(request).ip === 'unknown' ? 1800 : 240, 60);
    let token = request.cookies.get(VISITOR_COOKIE)?.value;
    let visitor =
      token && token.length < 100
        ? await db().visitor.findUnique({ where: { tokenHash: digest(token) } })
        : null;
    if (!visitor) {
      token = randomToken();
      visitor = await db().visitor.create({
        data: { tokenHash: digest(token) },
      });
    }
    const visitorId = visitor.id;
    const agent = request.headers.get("user-agent") || "";
    const device = /Mobile|Android|iPhone/i.test(agent)
      ? "Mobile"
      : /iPad|Tablet/i.test(agent)
        ? "Tablet"
        : "Desktop";
    const browser = /Edg\//.test(agent)
      ? "Edge"
      : /Firefox\//.test(agent)
        ? "Firefox"
        : /Chrome\//.test(agent)
          ? "Chrome"
          : /Safari\//.test(agent)
            ? "Safari"
            : "Other";
    let visit = input.visitId
      ? await db().visit.findFirst({
          where: {
            id: input.visitId,
            visitorId,
            lastSeen: { gte: new Date(Date.now() - 30 * 60000) },
          },
        })
      : null;
    let referrer: string | undefined;
    try {
      referrer = input.referrer
        ? new URL(input.referrer).hostname.slice(0, 150)
        : undefined;
    } catch {}
    if (!visit)
      visit = await db().visit.create({
        data: { visitorId, device, browser, referrer },
      });
    await db().$transaction([
      db().visitor.update({
        where: { id: visitorId },
        data: { lastSeen: new Date() },
      }),
      db().visit.update({
        where: { id: visit.id },
        data: { lastSeen: new Date() },
      }),
      db().activity.create({
        data: {
          visitId: visit.id,
          kind: input.kind,
          path: input.path,
          target: input.target,
          depth: input.depth,
        },
      }),
    ]);
    const response = json({ visitId: visit.id });
    response.cookies.set(VISITOR_COOKIE, token!, {
      httpOnly: true,
      secure:
        new URL(process.env.APP_ORIGIN || request.url).protocol === "https:",
      sameSite: "strict",
      path: "/",
      maxAge: 90 * 86400,
    });
    return response;
  } catch (error) {
    return json(
      { error: "Activity was not recorded." },
      error instanceof HttpError ? error.status : 400,
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    originCheck(request);
    const response = json({ ok: true });
    response.cookies.set(VISITOR_COOKIE, "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch {
    return json({ error: "Invalid origin." }, 403);
  }
}
