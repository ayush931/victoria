import dotenv from "dotenv";
import { db } from "../lib/admin/db";
dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ quiet: true });
async function main() {
  const before = new Date(Date.now() - 90 * 86400000);
  const result = await db().$transaction(async (tx) => {
    const activities = await tx.activity.deleteMany({
      where: { createdAt: { lt: before } },
    });
    await tx.visit.deleteMany({ where: { lastSeen: { lt: before } } });
    await tx.visitor.deleteMany({ where: { lastSeen: { lt: before } } });
    await tx.rateBucket.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    await tx.adminSession.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
    await tx.audit.create({
      data: {
        actor: "system",
        action: "ACTIVITY_RETENTION_RUN",
        target: `${activities.count} events removed`,
        ip: "scheduled-task",
        userAgent: "retention-script",
      },
    });
    return activities.count;
  });
  console.log(
    `Removed ${result} expired activity events. Enquiries and admin audits were retained.`,
  );
}
main()
  .catch(() => {
    console.error("Retention run failed. Check database availability.");
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await db().$disconnect();
    } catch {}
  });
