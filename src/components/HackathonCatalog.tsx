"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { LumaCheckoutButton } from "@/components/LumaCheckoutButton";

type Tone = "lime" | "violet" | "orange";
type Program = { id: string; status: string; title: string; summary: string; description: string; date: string; tags: string[]; image: string; tone: Tone };
const fallback: Program[] = [
  { id: "local-impact", status: "THEME 01", title: "AI로 동네의 문제를 푸는\n로컬 임팩트 해커톤", summary: "우리 동네에서 실제로 반복되는 불편을 찾아, AI로 작동하는 첫 해결책을 만듭니다.", description: "동네의 문제를 한 가지 고르고, 팀과 함께 AI 기반 해결책을 만들어요.", date: "일정 / 장소 공개 예정", tags: ["#로컬", "#AI에이전트", "#초보환영"], image: "/gallery/mawd-field-01.jpg", tone: "lime" },
  { id: "ai-workflow", status: "THEME 02", title: "혼자 일하는 사람을 위한\nAI 워크플로 해커톤", summary: "매일 반복되는 일을 덜어내는 나만의 AI 워크플로를 팀과 함께 설계합니다.", description: "반복되는 일을 골라 나만의 자동화 흐름을 설계합니다.", date: "일정 / 장소 공개 예정", tags: ["#1인사업", "#자동화", "#빌드데이"], image: "/gallery/mawd-field-02.jpg", tone: "violet" },
  { id: "creator-ai", status: "THEME 03", title: "콘텐츠가 결과가 되는\n크리에이터 AI 해커톤", summary: "아이디어부터 발행, 반응 분석까지. 창작자의 시간을 돌려주는 도구를 만듭니다.", description: "창작의 전 과정을 돕는 AI 도구를 직접 만들어 봅니다.", date: "일정 / 장소 공개 예정", tags: ["#콘텐츠", "#크리에이터", "#바이브코딩"], image: "/gallery/mawd-field-03.jpg", tone: "orange" },
];

export function HackathonCatalog() {
  const [programs, setPrograms] = useState<Program[]>(fallback);
  const [selected, setSelected] = useState<Program | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Program[]>(fallback);
  const [message, setMessage] = useState("");
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/catalog", { cache: "no-store" }).then(async (response) => {
      const data = await response.json();
      if (response.ok && Array.isArray(data.catalog) && data.catalog.length) { setPrograms(data.catalog); setDraft(data.catalog); }
      if (response.ok) setAuthenticated(Boolean(data.authenticated));
    }).catch(() => undefined);
    const open = () => setLoginOpen(true);
    window.addEventListener("mawd:admin-login", open);
    return () => window.removeEventListener("mawd:admin-login", open);
  }, []);

  const slide = (direction: number) => rail.current?.scrollBy({ left: direction * Math.min(440, rail.current.clientWidth * 0.85), behavior: "smooth" });
  const update = (index: number, field: keyof Program, value: string | string[]) => setDraft((items) => items.map((item, i) => i === index ? { ...item, [field]: value } : item));

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/catalog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "login", username: form.get("username"), password: form.get("password") }) });
    const data = await response.json();
    if (!response.ok) return setMessage(data.error || "로그인에 실패했습니다.");
    setAuthenticated(true); setLoginOpen(false); setMessage("");
  }
  async function save() {
    setMessage("저장 중...");
    const response = await fetch("/api/catalog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "save", catalog: draft }) });
    const data = await response.json();
    if (!response.ok) return setMessage(data.error || "저장에 실패했습니다.");
    setPrograms(data.catalog); setDraft(data.catalog); setEditing(false); setMessage("저장했어.");
  }
  async function logout() { await fetch("/api/catalog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) }); setAuthenticated(false); setEditing(false); }

  return <section id="hackathons" className="hackathon-catalog">
    <div className="wrap">
      <div className="catalog-head"><div><p className="section-kicker">CHOOSE YOUR QUEST</p><h2>지금, 만들고 싶은<br />해커톤을 고르세요.</h2></div><p>내 문제와 관심사에서 출발하는 빌드 챌린지. 카드를 열어 자세히 보고, 원하는 주제에 바로 참가할 수 있어요.</p></div>
      <div className="catalog-controls"><button type="button" onClick={() => slide(-1)} aria-label="이전 해커톤">←</button><span>좌우로 밀어서 더 보기</span><button type="button" onClick={() => slide(1)} aria-label="다음 해커톤">→</button></div>
      <div className="hackathon-rail-shell"><div className="hackathon-rail" ref={rail}>{programs.map((program, index) => <button className={`hackathon-card hackathon-card--${program.tone}`} type="button" onClick={() => setSelected(program)} key={program.id}>
        <div className="hackathon-thumb"><Image src={program.image} alt="" fill sizes="(max-width: 760px) 84vw, 390px" priority={index === 0} /><div className="hackathon-thumb-shade" /><div className="hackathon-thumb-top"><span>{program.status}</span><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{program.title}</h3></div>
        <div className="hackathon-card-body"><p className="hackathon-date">{program.date}</p><p className="hackathon-summary">{program.summary}</p><ul className="hackathon-tags">{program.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><span className="hackathon-detail">상세 보기 <b>↗</b></span></div>
      </button>)}</div></div>
      {authenticated && <div className="catalog-admin-bar"><span>관리자 편집 모드</span><button type="button" onClick={() => setEditing(true)}>카드 편집</button><button type="button" onClick={logout}>로그아웃</button></div>}
      {selected && <div className="catalog-modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><article className={`catalog-modal catalog-modal--${selected.tone}`} role="dialog" aria-modal="true" aria-label={`${selected.title} 상세`} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setSelected(null)}>×</button><div className="catalog-modal-image"><Image src={selected.image} alt="" fill sizes="(max-width: 760px) 100vw, 640px" /></div><div className="catalog-modal-body"><p className="section-kicker">{selected.status}</p><h3>{selected.title}</h3><p className="catalog-modal-date">{selected.date}</p><p>{selected.description || selected.summary}</p><ul className="hackathon-tags">{selected.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><LumaCheckoutButton className="catalog-modal-apply">이 해커톤 참가하기 <span>↗</span></LumaCheckoutButton></div></article></div>}
      {loginOpen && <div className="catalog-modal-backdrop"><form className="login-dialog" onSubmit={login}><button className="modal-close" type="button" onClick={() => setLoginOpen(false)}>×</button><p className="section-kicker">ADMIN ONLY</p><h3>관리자 로그인</h3><label>아이디<input name="username" autoComplete="username" required /></label><label>비밀번호<input name="password" type="password" autoComplete="current-password" required /></label>{message && <p className="login-error">{message}</p>}<button className="btn primary" type="submit">로그인</button></form></div>}
      {editing && <div className="catalog-modal-backdrop"><section className="catalog-editor" role="dialog" aria-modal="true"><button className="modal-close" type="button" onClick={() => setEditing(false)}>×</button><p className="section-kicker">EDIT CATALOG</p><h3>해커톤 카드 편집</h3>{draft.map((card, index) => <fieldset key={card.id}><legend>{card.status || `CARD ${index + 1}`}</legend><label>상단 라벨<input value={card.status} onChange={(e) => update(index, "status", e.target.value)} /></label><label>제목<textarea value={card.title} onChange={(e) => update(index, "title", e.target.value)} /></label><label>한 줄 소개<textarea value={card.summary} onChange={(e) => update(index, "summary", e.target.value)} /></label><label>상세 설명<textarea value={card.description} onChange={(e) => update(index, "description", e.target.value)} /></label><label>일정<input value={card.date} onChange={(e) => update(index, "date", e.target.value)} /></label><label>태그 (쉼표로 구분)<input value={card.tags.join(", ")} onChange={(e) => update(index, "tags", e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} /></label><label>이미지 주소<input value={card.image} onChange={(e) => update(index, "image", e.target.value)} /></label><label>색상<select value={card.tone} onChange={(e) => update(index, "tone", e.target.value as Tone)}><option value="lime">Lime</option><option value="violet">Violet</option><option value="orange">Orange</option></select></label></fieldset>)}<div className="editor-actions"><span>{message}</span><button type="button" onClick={save}>저장하기</button></div></section></div>}
    </div>
  </section>;
}
