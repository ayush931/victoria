import { z } from "zod";
export const password = z
  .string()
  .min(15, "Use at least 15 characters.")
  .max(128);
export const login = z
  .string()
  .trim()
  .toLowerCase()
  .regex(
    /^[a-z0-9][a-z0-9._-]{2,63}$/,
    "Use 3–64 letters, numbers, dots, dashes or underscores.",
  );
export const loginInput = z.object({
  login,
  password: z.string().min(1).max(128),
});
export const adminInput = z.object({
  login,
  name: z.string().trim().min(1).max(100),
  password,
});
export const leadInput = z.object({
  requestId: z.uuid(),
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s().-]{7,30}$/)
    .refine(
      (v) =>
        v.replace(/\D/g, "").length >= 7 && v.replace(/\D/g, "").length <= 15,
    ),
  country: z.string().max(120).optional(),
  residence: z.string().min(1).max(160),
  message: z.string().max(1500).optional(),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  transfer: z.boolean().default(false),
  consent: z.literal(true),
  analyticsConsent: z.boolean().default(false),
  sourcePath: z
    .string()
    .max(200)
    .regex(/^\/(?!\/)[^?#]*$/),
});
export const publicPath = z
  .string()
  .max(200)
  .regex(/^\/(?!\/)[a-zA-Z0-9/_-]*$/)
  .refine(
    (p) => !p.startsWith("/victoria-admin-panel") && !p.startsWith("/api/"),
  );
export const activityInput = z.object({
  consent: z.literal(true),
  visitId: z.uuid().optional(),
  kind: z.enum(["page_view", "click", "scroll", "heartbeat", "page_exit"]),
  path: publicPath,
  target: z
    .string()
    .max(120)
    .regex(/^(?:link:\/[a-zA-Z0-9/_-]*|[a-z_]{1,80})$/)
    .refine(
      (value) =>
        !value.startsWith("link:") ||
        publicPath.safeParse(value.slice(5)).success,
    )
    .optional(),
  depth: z.number().int().min(0).max(100).optional(),
  referrer: z.string().max(200).optional(),
});
