import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { db } from "./db";
import { checkPassword, digest, randomToken } from "./crypto";
import { loginInput } from "./validation";
import type { Prisma } from "../generated/prisma/client";
export const SESSION_COOKIE = "victoria_admin_session";
const HOURS = 12 * 60 * 60;
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export const metadata = (request: Request) => ({
  ip:
    process.env.TRUST_PROXY === "true"
      ? request.headers
          .get("x-forwarded-for")
          ?.split(",")[0]
          .trim()
          .slice(0, 64) || "unknown"
      : "unknown",
  userAgent: (request.headers.get("user-agent") || "unknown").slice(0, 300),
});
export function originCheck(request: Request) {
  const origin =
    process.env.APP_ORIGIN ||
    (process.env.NODE_ENV !== "production"
      ? new URL(request.url).origin
      : null);
  if (!origin)
    throw new HttpError(
      503,
      "Set APP_ORIGIN before enabling the admin service.",
    );
  if (request.headers.get("origin") !== new URL(origin).origin)
    throw new HttpError(403, "This request did not come from this website.");
}
export async function readJson(request: Request, limit = 12000) {
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new HttpError(415, "Send JSON content.");
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "Request body is missing.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      throw new HttpError(413, "Request is too large.");
    }
    chunks.push(value);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, "Send a valid JSON request.");
  }
}
export async function audit(
  request: Request,
  actor: { id?: string; login: string },
  action: string,
  target?: string,
  client: Pick<Prisma.TransactionClient, "audit"> = db(),
) {
  await client.audit.create({
    data: {
      adminId: actor.id,
      actor: actor.login,
      action,
      target,
      ...metadata(request),
    },
  });
}
export async function rate(key: string, limit: number, seconds: number) {
  const rows = await db().$queryRaw<
    { count: number }[]
  >`INSERT INTO "RateBucket" ("key","count","expiresAt") VALUES (${key},1,now() + ${seconds} * interval '1 second') ON CONFLICT ("key") DO UPDATE SET "count" = CASE WHEN "RateBucket"."expiresAt" < now() THEN 1 ELSE "RateBucket"."count" + 1 END, "expiresAt" = CASE WHEN "RateBucket"."expiresAt" < now() THEN now() + ${seconds} * interval '1 second' ELSE "RateBucket"."expiresAt" END RETURNING "count"`;
  if (rows[0].count > limit)
    throw new HttpError(429, "Too many requests. Please try again later.");
}
export async function sessionFromToken(token?: string) {
  if (!token || token.length > 100) return null;
  const session = await db().adminSession.findUnique({
    where: { tokenHash: digest(token) },
    include: { admin: true },
  });
  if (
    !session ||
    !session.admin.enabled ||
    session.expiresAt < new Date() ||
    session.lastSeen < new Date(Date.now() - 30 * 60 * 1000)
  )
    return null;
  return session;
}
export async function requireAdmin(
  request: NextRequest,
  owner = false,
  touch = true,
) {
  const session = await sessionFromToken(
    request.cookies.get(SESSION_COOKIE)?.value,
  );
  if (!session)
    throw new HttpError(
      401,
      "Your session expired or another login replaced it. Sign in again.",
    );
  if (owner && session.admin.role !== "OWNER")
    throw new HttpError(403, "Only the owner can perform this action.");
  if (touch && session.lastSeen < new Date(Date.now() - 60000))
    await db().adminSession.updateMany({
      where: { id: session.id },
      data: { lastSeen: new Date() },
    });
  return session.admin;
}
export function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store, private",
      Vary: "Cookie",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
export async function signIn(request: NextRequest) {
  originCheck(request);
  const input = loginInput.parse(await readJson(request));
  await rate(`login:${digest(input.login)}`, 8, 900);
  await rate(`network-login:${digest(metadata(request).ip)}`, 60, 900);
  const admin = await db().admin.findUnique({ where: { login: input.login } });
  // A fixed dummy hash makes nonexistent-account checks use the same expensive KDF.
  const valid = await checkPassword(
    input.password,
    admin?.passwordHash ||
      `scrypt:00000000000000000000000000000000:${"00".repeat(64)}`,
  );
  if (!admin || !admin.enabled || !valid) {
    await audit(request, { login: admin?.login || "unknown" }, "LOGIN_FAILED");
    throw new HttpError(401, "Login ID or password is incorrect.");
  }
  const token = randomToken();
  await db().$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM "Admin" WHERE id = ${admin.id}::uuid FOR UPDATE`;
    const current = await tx.admin.findUniqueOrThrow({
      where: { id: admin.id },
    });
    if (!current.enabled || current.passwordHash !== admin.passwordHash)
      throw new HttpError(401, "Account changed. Sign in again.");
    const previous = await tx.adminSession.findUnique({
      where: { adminId: admin.id },
    });
    if (previous)
      await audit(request, admin, "SESSION_REPLACED", previous.id, tx);
    const data = {
      id: randomUUID(),
      tokenHash: digest(token),
      createdAt: new Date(),
      lastSeen: new Date(),
      expiresAt: new Date(Date.now() + HOURS * 1000),
      ...metadata(request),
    };
    await tx.adminSession.upsert({
      where: { adminId: admin.id },
      create: { adminId: admin.id, ...data },
      update: data,
    });
    await audit(request, admin, "LOGIN_SUCCEEDED", undefined, tx);
  });
  const response = json({
    admin: {
      id: admin.id,
      name: admin.name,
      login: admin.login,
      role: admin.role,
    },
  });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure:
      new URL(process.env.APP_ORIGIN || request.url).protocol === "https:",
    sameSite: "strict",
    path: "/",
    maxAge: HOURS,
  });
  return response;
}
