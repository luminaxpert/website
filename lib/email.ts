import { EMAILJS } from "./site";

type Params = Record<string, string | number | null | undefined>;

/**
 * Sends an email through EmailJS. The SDK is loaded on demand (first submit),
 * keeping it out of every page's initial JavaScript.
 */
export async function sendEmail(templateId: string, params: Params) {
  const { default: emailjs } = await import("@emailjs/browser");
  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) clean[k] = v == null ? "" : String(v);
  return emailjs.send(EMAILJS.serviceId, templateId, clean, { publicKey: EMAILJS.publicKey });
}

export function emailErrorMessage(err: unknown, fallback = "Something went wrong. Please try again.") {
  if (err && typeof err === "object") {
    const e = err as { text?: string; message?: string };
    if (e.text) return `${fallback} (${e.text})`;
  }
  return fallback;
}
