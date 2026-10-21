import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import { NextRequest } from "next/server";
import { hashPassword, checkPassword, digest } from "../lib/admin/crypto";
import { leadInput, activityInput } from "../lib/admin/validation";
import { GET, POST, PATCH, DELETE } from "../app/api/admin/[...path]/route";
import { POST as track } from "../app/api/analytics/route";
import { POST as enquire } from "../app/api/enquiries/route";
import { db } from "../lib/admin/db";

process.env.APP_ORIGIN = "http://localhost:3000";
const origin = "http://localhost:3000";
function request(
  path: string,
  method = "GET",
  body?: unknown,
  cookie?: string,
  foreign = false,
) {
  return new NextRequest(`${origin}/api/admin/${path}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(method === "GET"
        ? {}
        : { Origin: foreign ? "https://foreign.example" : origin }),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
const ctx = (path: string) => ({
  params: Promise.resolve({ path: path.split("/") }),
});
async function call(
  path: string,
  method = "GET",
  body?: unknown,
  cookie?: string,
  foreign = false,
) {
  const fn =
    method === "POST"
      ? POST
      : method === "PATCH"
        ? PATCH
        : method === "DELETE"
          ? DELETE
          : GET;
  return fn(request(path, method, body, cookie, foreign), ctx(path));
}
const credentials = {
  login: "integration-owner",
  password: "A sufficiently long test password",
};
let ownerId = "",
  ownerCookie = "",
  visitorCookie = "",
  visitorId = "",
  leadId = "";
const testUrl = process.env.TEST_DATABASE_URL;
if (testUrl) {
  const url = new URL(testUrl);
  assert(
    ["127.0.0.1", "localhost"].includes(url.hostname) &&
      url.pathname.endsWith("_test"),
    "Integration tests require a disposable local database ending _test",
  );
  process.env.DATABASE_URL = testUrl;
}

test("password hashing uses per-password salts and rejects incorrect credentials", async () => {
  const first = await hashPassword(credentials.password),
    second = await hashPassword(credentials.password);
  assert.notEqual(first, second);
  assert(await checkPassword(credentials.password, first));
  assert(!(await checkPassword("incorrect", first)));
  assert(!first.includes(credentials.password));
  assert.equal(digest("token").length, 64);
});
test("public validation refuses missing contact consent and sensitive paths", () => {
  assert(!leadInput.safeParse({ name: "Name" }).success);
  assert(
    !activityInput.safeParse({
      kind: "page_view",
      path: "/victoria-admin-panel",
      consent: true,
    }).success,
  );
  assert(
    !activityInput.safeParse({
      kind: "page_view",
      path: "/contact?email=private",
      consent: true,
    }).success,
  );
  assert(
    !activityInput.safeParse({ kind: "page_view", path: "/", consent: false })
      .success,
  );
});
test("private endpoints reject missing sessions and cross-origin mutations", async () => {
  assert.equal((await call("overview")).status, 401);
  assert.equal(
    (await call("auth/login", "POST", credentials, undefined, true)).status,
    403,
  );
});

before(async () => {
  if (!testUrl) return;
  await db().activity.deleteMany();
  await db().lead.deleteMany();
  await db().visit.deleteMany();
  await db().visitor.deleteMany();
  await db().audit.deleteMany();
  await db().adminSession.deleteMany();
  await db().admin.deleteMany();
  await db().rateBucket.deleteMany();
  await db().websiteSettings.deleteMany();
  const owner = await db().admin.create({
    data: {
      login: credentials.login,
      name: "Integration owner",
      passwordHash: await hashPassword(credentials.password),
      role: "OWNER",
    },
  });
  ownerId = owner.id;
});
after(async () => {
  if (testUrl) await db().$disconnect();
});

test(
  "database-backed access, tracking, enquiry and audit lifecycle",
  { skip: !testUrl },
  async (t) => {
    await t.test(
      "login stores hashed verifier, sets protected cookie and replaces prior session",
      async () => {
        const first = await call("auth/login", "POST", credentials);
        assert.equal(first.status, 200);
        const cookie = first.headers.get("set-cookie")!;
        assert.match(cookie, /HttpOnly/i);
        assert.match(cookie, /SameSite=strict/i);
        const old = cookie.split(";")[0];
        const second = await call("auth/login", "POST", credentials);
        assert.equal(second.status, 200);
        ownerCookie = second.headers.get("set-cookie")!.split(";")[0];
        assert.notEqual(ownerCookie, old);
        assert.equal(
          (await call("overview", "GET", undefined, old)).status,
          401,
        );
        assert.equal(await db().adminSession.count(), 1);
        const session = await db().adminSession.findUniqueOrThrow({
          where: { adminId: ownerId },
        });
        assert.notEqual(
          session.tokenHash,
          decodeURIComponent(ownerCookie.split("=")[1]),
        );
      },
    );
    let staffId = "",
      staffCookie = "";
    await t.test(
      "owner creates admins; staff cannot manage accounts or read audit logs",
      async () => {
        const create = await call(
          "admins",
          "POST",
          {
            login: "integration-staff",
            name: "Staff",
            password: credentials.password,
          },
          ownerCookie,
        );
        assert.equal(create.status, 201);
        staffId = (
          await db().admin.findUniqueOrThrow({
            where: { login: "integration-staff" },
          })
        ).id;
        const login = await call("auth/login", "POST", {
          login: "integration-staff",
          password: credentials.password,
        });
        staffCookie = login.headers.get("set-cookie")!.split(";")[0];
        assert.equal(
          (await call("admins", "GET", undefined, staffCookie)).status,
          403,
        );
        assert.equal(
          (await call("audit", "GET", undefined, staffCookie)).status,
          403,
        );
        assert.equal(
          (await call("overview", "GET", undefined, staffCookie)).status,
          200,
        );
      },
    );
    await t.test(
      "analytics rejects missing consent and strips referrer path",
      async () => {
        const denied = await track(
          request("analytics", "POST", {
            kind: "page_view",
            path: "/",
            consent: false,
          }),
        );
        assert.equal(denied.status, 400);
        assert.equal(await db().visitor.count(), 0);
        const result = await track(
          request("analytics", "POST", {
            kind: "page_view",
            path: "/villas",
            consent: true,
            referrer: "https://example.com/private?secret=value",
          }),
        );
        assert.equal(result.status, 200);
        visitorCookie = result.headers.get("set-cookie")!.split(";")[0];
        const data = await result.json();
        const visit = await db().visit.findUniqueOrThrow({
          where: { id: data.visitId },
        });
        visitorId = visit.visitorId;
        assert.equal(visit.referrer, "example.com");
        assert.equal(await db().activity.count(), 1);
      },
    );
    await t.test(
      "explicit enquiries are idempotent and link only with analytics permission",
      async () => {
        const body = {
          requestId: randomUUID(),
          name: "Test contact",
          email: "test@example.com",
          phone: "+919000000000",
          residence: "Test residence",
          sourcePath: "/contact",
          consent: true,
          analyticsConsent: true,
        };
        const a = await enquire(
          request("enquiries", "POST", body, visitorCookie),
        );
        assert.equal(a.status, 201);
        leadId = (await a.json()).id;
        const b = await enquire(
          request("enquiries", "POST", body, visitorCookie),
        );
        assert.equal(b.status, 201);
        assert.equal((await b.json()).id, leadId);
        assert.equal(await db().lead.count(), 1);
        assert.equal(
          (await db().lead.findUniqueOrThrow({ where: { id: leadId } }))
            .visitorId,
          visitorId,
        );
        const other = await enquire(
          request(
            "enquiries",
            "POST",
            { ...body, requestId: randomUUID(), analyticsConsent: false },
            visitorCookie,
          ),
        );
        assert.equal(other.status, 201);
        assert.equal(
          (
            await db().lead.findUniqueOrThrow({
              where: { id: (await other.json()).id },
            })
          ).visitorId,
          null,
        );
      },
    );
    await t.test(
      "visitor timeline and enquiries require authentication and audit reads",
      async () => {
        assert.equal((await call(`visitors/${visitorId}`)).status, 401);
        const detail = await call(
          `visitors/${visitorId}`,
          "GET",
          undefined,
          staffCookie,
        );
        assert.equal(detail.status, 200);
        assert.equal((await detail.json()).events.length, 1);
        assert(
          (await db().audit.count({
            where: { action: "VIEW_VISITOR", adminId: staffId },
          })) > 0,
        );
      },
    );
    await t.test(
      "lead status updates persist, deletion is owner-only",
      async () => {
        assert.equal(
          (
            await call(
              `leads/${leadId}`,
              "PATCH",
              { status: "CONTACTED" },
              staffCookie,
            )
          ).status,
          200,
        );
        assert.equal(
          (await db().lead.findUniqueOrThrow({ where: { id: leadId } })).status,
          "CONTACTED",
        );
        assert.equal(
          (await call(`leads/${leadId}`, "DELETE", undefined, staffCookie))
            .status,
          403,
        );
        assert.equal(
          (await call(`leads/${leadId}`, "DELETE", undefined, ownerCookie))
            .status,
          200,
        );
        assert.equal(
          await db().lead.findUnique({ where: { id: leadId } }),
          null,
        );
      },
    );
    await t.test(
      "disabled collection creates no additional events",
      async () => {
        assert.equal(
          (
            await call(
              "settings",
              "PATCH",
              { trackingEnabled: false },
              ownerCookie,
            )
          ).status,
          200,
        );
        const n = await db().activity.count();
        const result = await track(
          request(
            "analytics",
            "POST",
            {
              kind: "click",
              path: "/villas",
              target: "link:/contact",
              consent: true,
            },
            visitorCookie,
          ),
        );
        assert.equal((await result.json()).disabled, true);
        assert.equal(await db().activity.count(), n);
      },
    );
    await t.test(
      "disabling an admin revokes access immediately; owner cannot disable itself",
      async () => {
        assert.equal(
          (
            await call(
              `admins/${staffId}`,
              "PATCH",
              { enabled: false },
              ownerCookie,
            )
          ).status,
          200,
        );
        assert.equal(
          (await call("leads", "GET", undefined, staffCookie)).status,
          401,
        );
        assert.equal(
          (
            await call(
              `admins/${ownerId}`,
              "PATCH",
              { enabled: false },
              ownerCookie,
            )
          ).status,
          400,
        );
      },
    );
    await t.test(
      "password reset revokes sessions and old credentials stop working",
      async () => {
        await call(
          `admins/${staffId}`,
          "PATCH",
          { enabled: true },
          ownerCookie,
        );
        const login = await call("auth/login", "POST", {
          login: "integration-staff",
          password: credentials.password,
        });
        const activeCookie = login.headers.get("set-cookie")!.split(";")[0];
        const replacement = "A completely different long password";
        assert.equal(
          (
            await call(
              `admins/${staffId}`,
              "PATCH",
              { password: replacement },
              ownerCookie,
            )
          ).status,
          200,
        );
        assert.equal(
          (await call("overview", "GET", undefined, activeCookie)).status,
          401,
        );
        assert.equal(
          (
            await call("auth/login", "POST", {
              login: "integration-staff",
              password: credentials.password,
            })
          ).status,
          401,
        );
        assert.equal(
          (
            await call("auth/login", "POST", {
              login: "integration-staff",
              password: replacement,
            })
          ).status,
          200,
        );
      },
    );
    await t.test(
      "background polling does not prolong the idle timeout",
      async () => {
        const seen = new Date(Date.now() - 10 * 60000);
        await db().adminSession.update({
          where: { adminId: ownerId },
          data: { lastSeen: seen },
        });
        assert.equal(
          (await call("auth/session", "GET", undefined, ownerCookie)).status,
          200,
        );
        assert.equal(
          (
            await db().adminSession.findUniqueOrThrow({
              where: { adminId: ownerId },
            })
          ).lastSeen.toISOString(),
          seen.toISOString(),
        );
        // Route handlers receive the path segment separately from URL search parameters.
        const response = await GET(
          request("overview?background=1", "GET", undefined, ownerCookie),
          ctx("overview"),
        );
        assert.equal(response.status, 200);
        assert.equal(
          (
            await db().adminSession.findUniqueOrThrow({
              where: { adminId: ownerId },
            })
          ).lastSeen.toISOString(),
          seen.toISOString(),
        );
      },
    );
    await t.test(
      "retention removes old activity while keeping enquiries",
      async () => {
        const old = new Date(Date.now() - 95 * 86400000);
        const visitor = await db().visitor.create({
          data: {
            tokenHash: digest(randomUUID()),
            firstSeen: old,
            lastSeen: old,
          },
        });
        const visit = await db().visit.create({
          data: {
            visitorId: visitor.id,
            device: "Desktop",
            browser: "Other",
            startedAt: old,
            lastSeen: old,
          },
        });
        await db().activity.create({
          data: {
            visitId: visit.id,
            kind: "page_view",
            path: "/",
            createdAt: old,
          },
        });
        const lead = await db().lead.create({
          data: {
            requestId: randomUUID(),
            visitorId: visitor.id,
            name: "Retained enquiry",
            email: "retained@example.com",
            phone: "+919000000001",
            residence: "Test",
            sourcePath: "/contact",
            createdAt: old,
          },
        });
        execFileSync(
          process.execPath,
          ["node_modules/tsx/dist/cli.mjs", "scripts/prune-activity.ts"],
          { env: { ...process.env, DATABASE_URL: testUrl! }, stdio: "pipe" },
        );
        assert.equal(
          await db().visitor.findUnique({ where: { id: visitor.id } }),
          null,
        );
        assert.equal(
          await db().visit.findUnique({ where: { id: visit.id } }),
          null,
        );
        const saved = await db().lead.findUniqueOrThrow({
          where: { id: lead.id },
        });
        assert.equal(saved.name, "Retained enquiry");
        assert.equal(saved.visitorId, null);
      },
    );
    await t.test(
      "idle sessions expire and audits never contain passwords or raw tokens",
      async () => {
        const audits = await db().audit.findMany();
        assert(audits.some((x) => x.action === "LOGIN_SUCCEEDED"));
        assert(audits.some((x) => x.action === "SESSION_REPLACED"));
        assert(audits.some((x) => x.action === "DISABLE_ADMIN"));
        assert(!JSON.stringify(audits).includes(credentials.password));
        assert(!JSON.stringify(audits).includes(ownerCookie.split("=")[1]));
        await db().adminSession.update({
          where: { adminId: ownerId },
          data: { lastSeen: new Date(Date.now() - 31 * 60000) },
        });
        assert.equal(
          (await call("overview", "GET", undefined, ownerCookie)).status,
          401,
        );
      },
    );
  },
);
