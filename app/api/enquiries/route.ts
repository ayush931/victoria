import { NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/admin/db";
import { digest } from "@/lib/admin/crypto";
import { leadInput } from "@/lib/admin/validation";
import {
  HttpError,
  json,
  metadata,
  originCheck,
  rate,
  readJson,
} from "@/lib/admin/auth";
export async function POST(request: NextRequest) {
  try {
    originCheck(request);
    const input = leadInput.parse(await readJson(request, 6000));
    await rate(`enquiry-email:${digest(input.email.toLowerCase())}`, 5, 3600);
    await rate(
      `enquiry-network:${digest(metadata(request).ip)}`,
      metadata(request).ip === "unknown" ? 500 : 60,
      3600,
    );
    const { consent: _, analyticsConsent, ...data } = input;
    void _;
    const token = request.cookies.get("victoria_visitor")?.value;
    const visitor =
      analyticsConsent && token && token.length < 100
        ? await db().visitor.findUnique({
            where: { tokenHash: digest(token) },
            select: { id: true },
          })
        : null;
    const lead = await db().lead.upsert({
      where: { requestId: input.requestId },
      create: { ...data, visitorId: visitor?.id },
      update: {},
      select: { id: true },
    });
    return json({ id: lead.id }, 201);
  } catch (error) {
    if (error instanceof z.ZodError)
      return json(
        {
          error: "Check your enquiry details.",
          fields: error.flatten().fieldErrors,
        },
        400,
      );
    return json(
      {
        error:
          error instanceof HttpError
            ? error.message
            : "Your enquiry could not be saved. Please try again.",
      },
      error instanceof HttpError ? error.status : 503,
    );
  }
}
