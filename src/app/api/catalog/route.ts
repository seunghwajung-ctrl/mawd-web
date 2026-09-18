import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COOKIE = "mawd_catalog_admin";
const DEFAULT_STATE_PATH = "data/website-catalog.json";

type CatalogCard = {
  id: string;
  status: string;
  title: string;
  summary: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  tone: "lime" | "violet" | "orange";
};

function config() {
  const username = process.env.MAWD_ADMIN_USERNAME;
  const password = process.env.MAWD_ADMIN_PASSWORD;
  const secret = process.env.MAWD_CATALOG_SECRET;
  const githubToken = process.env.GITHUB_TOKEN;
  const repository = process.env.MAWD_CATALOG_REPOSITORY;
  const statePath = process.env.MAWD_CATALOG_STATE_PATH || DEFAULT_STATE_PATH;
  if (!username || !password || !secret || !githubToken || !repository) throw new Error("관리자 설정이 아직 준비되지 않았습니다.");
  return { username, password, secret, githubToken, repository, statePath };
}

async function githubState() {
  const { githubToken, repository, statePath } = config();
  const response = await fetch(`https://api.github.com/repos/${repository}/contents/${statePath}?ref=main`, {
    headers: { Authorization: `Bearer ${githubToken}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" }, cache: "no-store",
  });
  const result = await response.json().catch(() => ({}));
  if (response.status === 404) return { state: {} as { websiteCatalog?: CatalogCard[] }, sha: "", githubToken, repository, statePath };
  if (!response.ok || !result.content || !result.sha) throw new Error("카드 저장소를 불러오지 못했습니다.");
  const state = JSON.parse(Buffer.from(result.content, "base64").toString("utf8")) as { websiteCatalog?: CatalogCard[] };
  return { state, sha: result.sha, githubToken, repository, statePath };
}

async function writeCatalog(catalog: CatalogCard[]) {
  const { state, sha, githubToken, repository, statePath } = await githubState();
  state.websiteCatalog = catalog;
  const response = await fetch(`https://api.github.com/repos/${repository}/contents/${statePath}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${githubToken}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
    body: JSON.stringify({ branch: "main", message: "Update MAWD website catalog", content: Buffer.from(JSON.stringify(state, null, 2)).toString("base64"), ...(sha ? { sha } : {}) }),
  });
  if (!response.ok) throw new Error("카드 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
  return catalog;
}

function token(secret: string) {
  return createHmac("sha256", secret).update("mawd-catalog-admin").digest("base64url");
}

async function isAdmin() {
  const { secret } = config();
  const saved = (await cookies()).get(COOKIE)?.value || "";
  const expected = token(secret);
  return saved.length === expected.length && timingSafeEqual(Buffer.from(saved), Buffer.from(expected));
}

export async function GET() {
  try {
    const { state } = await githubState();
    return NextResponse.json({ catalog: state.websiteCatalog || [], authenticated: await isAdmin() });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "요청에 실패했습니다." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, secret } = config();
    if (body.action === "login") {
      if (body.username !== username || body.password !== password) return NextResponse.json({ error: "아이디 또는 비밀번호가 올바르지 않습니다." }, { status: 401 });
      const response = NextResponse.json({ authenticated: true });
      response.cookies.set(COOKIE, token(secret), { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 60 * 60 * 12 });
      return response;
    }
    if (body.action === "logout") {
      const response = NextResponse.json({ authenticated: false });
      response.cookies.delete(COOKIE);
      return response;
    }
    if (body.action === "save") {
      if (!(await isAdmin())) return NextResponse.json({ error: "관리자 로그인이 필요합니다." }, { status: 401 });
      if (!Array.isArray(body.catalog) || !body.catalog.length || body.catalog.length > 12) return NextResponse.json({ error: "카드 목록을 확인해주세요." }, { status: 400 });
      return NextResponse.json({ catalog: await writeCatalog(body.catalog) });
    }
    return NextResponse.json({ error: "알 수 없는 요청입니다." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "요청에 실패했습니다." }, { status: 500 });
  }
}
