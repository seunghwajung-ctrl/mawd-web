/**
 * MAWD Challenge 폼 설정
 */

const DEFAULT_GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd_6_tYFLZbwDP-KytHumlfoul1ane7t54zHAe_AAhCNUU9PA/viewform?usp=header";

/** 구글 스프레드시트 웹앱 URL (웹사이트 폼 → 스프레드시트 직접 기록) */
export const GOOGLE_SHEET_WEBAPP_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBAPP_URL ?? "";

export const GOOGLE_FORM_URL =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ?? DEFAULT_GOOGLE_FORM_URL;
