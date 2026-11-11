import { submitInquiry } from "@/lib/inquiry";

// Room for reCAPTCHA (3s) + Apps Script (10s); without it a 10s platform default could kill a send mid-flight.
export const maxDuration = 20;

// Server-only env vars (set for Preview and Production in Vercel):
//   RECAPTCHA_SECRET_KEY, INQUIRY_APPS_SCRIPT_URL, INQUIRY_APPS_SCRIPT_SECRET
export async function POST(request: Request) {
  const raw = await request.json().catch(() => null);
  if (!raw || typeof raw !== "object") return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const { status, body } = await submitInquiry(raw, {
    recaptchaSecret: process.env.RECAPTCHA_SECRET_KEY ?? "",
    scriptUrl: process.env.INQUIRY_APPS_SCRIPT_URL ?? "",
    scriptSecret: process.env.INQUIRY_APPS_SCRIPT_SECRET ?? "",
  });
  if (!body.ok) console.error("[inquiry] rejected:", body.error); // reason only, never form contents
  return Response.json(body, { status });
}
