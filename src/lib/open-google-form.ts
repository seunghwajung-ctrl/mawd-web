"use client";

import { GOOGLE_FORM_URL } from "@/lib/form-config";

export function openGoogleForm() {
  if (!GOOGLE_FORM_URL) {
    return false;
  }

  window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  return true;
}
