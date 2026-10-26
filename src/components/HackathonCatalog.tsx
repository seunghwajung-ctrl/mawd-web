"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { LumaCheckoutButton } from "@/components/LumaCheckoutButton";

type Tone = "lime" | "violet" | "orange";
type Program = { id: string; status: string; title: string; summary: string; description: string; date: string; tags: string[]; image: string; tone: Tone };
const fallback: Program[] = [
  { id: "vibe-coding-starter", status: "", title: "비전공자를 위한\n바이브코딩 입문 챌린지", summary: "아이디어를 PRD와 첫 프로토타입으로 바꾸는 모집 프로그램입니다.", description: "개발 경험이 없어도 AI 도구로 문제 정의와 화면 흐름을 만들어 봅니다.", date: "모집 중 / 온라인 OT 예정", tags: ["#비전공자", "#PRD", "#프로토타입"], image: "/gallery/mawd-field-01.jpg", tone: "lime" },
  { id: "ai-startup-mvp", status: "", title: "예비창업자를 위한\nAI 창업 MVP 챌린지", summary: "창업 아이디어를 검증 가능한 MVP와 발표 자료로 정리합니다.", description: "문제, 고객, 핵심 기능을 좁히고 팀과 함께 작동하는 MVP를 만듭니다.", date: "모집 중 / 1라운드 제출 예정", tags: ["#예비창업", "#MVP", "#피드백"], image: "/gallery/mawd-field-02.jpg", tone: "violet" },
  { id: "local-problem-builder", status: "", title: "우리 동네에서 시작하는\n로컬 문제해결 챌린지", summary: "생활 속 불편을 찾고 AI 기반 해결책으로 구체화합니다.", description: "주변에서 발견한 문제를 팀 프로젝트로 만들고 포트폴리오에 남깁니다.", date: "모집 중 / 대면 빌드 예정", tags: ["#로컬", "#팀빌딩", "#포트폴리오"], image: "/gallery/mawd-field-03.jpg", tone: "orange" },
];

export function HackathonCatalog() {
  const [programs, setPrograms] = useState<Program[]>(fallback);
  const [selected, setSelected] = useState<Program | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Program[]>(fallback);
  const [message, setMessage] = useState("");
  const [mobileSlide, setMobileSlide] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const swiped = useRef(false);

  useEffect(() => {
    fetch("/api/catalog", { cache: "no-store" }).then(async (response) => {
      const data = await response.json();
      if (response.ok && Array.isArray(data.catalog) && data.catalog.length) { setPrograms(data.catalog); setDraft(data.catalog); }
      if (response.ok) setAuthenticated(Boolean(data.authenticated));
    }).catch(() => undefined);
    const open = () => setLoginOpen(true);
    const openFromHash = () => {
      if (window.location.hash === "#admin") setLoginOpen(true);
    };
    openFromHash();
    window.addEventListener("mawd:admin-login", open);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.removeEventListener("mawd:admin-login", open);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  const slide = (direction: number) => rail.current?.scrollBy({ left: direction * Math.min(440, rail.current.clientWidth * 0.85), behavior: "smooth" });
  const moveMobileSlide = (direction: number) => {
    setMobileSlide((current) => (current + direction + programs.length) % programs.length);
  };
  const handleMobileSwipeStart = (event: React.PointerEvent<HTMLButtonElement>) => {
    swipeStartX.current = event.clientX;
    swiped.current = false;
  };
  const handleMobileSwipeEnd = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (swipeStartX.current === null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(distance) < 36) return;
    swiped.current = true;
    moveMobileSlide(distance < 0 ? 1 : -1);
  };
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
      <div className="mobile-program-intro" aria-label="MAWD 프로그램 안내">
        <div className="mobile-featured-viewport">
          <div className="mobile-featured-track" style={{ transform: `translateX(-${mobileSlide * 100}%)` }}>
            {programs.map((program, index) => <button
              type="button"
              className="mobile-featured-program"
              key={program.id}
              aria-label={`${program.title} 상세 보기`}
              onPointerDown={handleMobileSwipeStart}
              onPointerUp={handleMobileSwipeEnd}
              onPointerCancel={() => { swipeStartX.current = null; }}
              onClick={() => { if (!swiped.current) setSelected(program); }}
            >
              <Image src={program.image} alt="" fill sizes="100vw" priority={index === 0} />
              <span className="mobile-featured-shade" />
              <strong>MAWD<br />CHALLENGE</strong>
              <span className="mobile-featured-copy">{program.title.replace("\n", " ")}</span>
            </button>)}
          </div>
        </div>
        <div className="mobile-featured-dots" aria-label="프로그램 슬라이드 페이지">
          {programs.map((program, index) => <button key={program.id} type="button" className={index === mobileSlide ? "is-active" : ""} aria-label={`${index + 1}번 슬라이드 보기`} aria-current={index === mobileSlide ? "true" : undefined} onClick={() => setMobileSlide(index)} />)}
        </div>
        <div className="mobile-program-shortcuts" aria-label="프로그램 바로가기">
          <a href="#program"><span aria-hidden="true">✦</span>프로그램</a>
          <a href="#benefits"><span aria-hidden="true">◎</span>참가 혜택</a>
          <a href="#faq"><span aria-hidden="true">?</span>자주 묻는 질문</a>
          <button type="button" onClick={() => setSelected(programs[0] ?? null)}><span aria-hidden="true">↗</span>참가 안내</button>
        </div>
      </div>
      <div className="catalog-head"><div><p className="section-kicker">CHOOSE YOUR QUEST</p><h2>지금, 만들고 싶은<br />해커톤을 고르세요.</h2></div><p>내 문제와 관심사에서 출발하는 빌드 챌린지. 카드를 열어 자세히 보고, 원하는 주제에 바로 참가할 수 있어요.</p></div>
      <div className="catalog-controls"><button type="button" onClick={() => slide(-1)} aria-label="이전 해커톤">←</button><span>좌우로 밀어서 더 보기</span><button type="button" onClick={() => slide(1)} aria-label="다음 해커톤">→</button></div>
      <div className="hackathon-rail-shell"><div className="hackathon-rail" ref={rail}>{programs.map((program, index) => <button className={`hackathon-card hackathon-card--${program.tone}`} type="button" onClick={() => setSelected(program)} key={program.id}>
        <div className="hackathon-thumb"><Image src={program.image} alt="" fill sizes="(max-width: 760px) 84vw, 390px" priority={index === 0} /><div className="hackathon-thumb-shade" /><div className="hackathon-thumb-top"><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{program.title}</h3></div>
        <div className="hackathon-card-body"><p className="hackathon-date">{program.date}</p><p className="hackathon-summary">{program.summary}</p><ul className="hackathon-tags">{program.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
      </button>)}</div></div>
      {authenticated && <div className="catalog-admin-bar"><span>관리자 편집 모드</span><button type="button" onClick={() => setEditing(true)}>카드 편집</button><button type="button" onClick={logout}>로그아웃</button></div>}
      {selected && <div className="catalog-modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}><article className={`catalog-modal catalog-modal--${selected.tone}`} role="dialog" aria-modal="true" aria-label={`${selected.title} 상세`} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setSelected(null)}>×</button><div className="catalog-modal-image"><Image src={selected.image} alt="" fill sizes="(max-width: 760px) 100vw, 640px" /></div><div className="catalog-modal-body"><h3>{selected.title}</h3><p className="catalog-modal-date">{selected.date}</p><p>{selected.description || selected.summary}</p><ul className="hackathon-tags">{selected.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><LumaCheckoutButton className="catalog-modal-apply">이 해커톤 참가하기 <span>↗</span></LumaCheckoutButton></div></article></div>}
      {loginOpen && <div className="catalog-modal-backdrop"><form className="login-dialog" onSubmit={login}><button className="modal-close" type="button" onClick={() => setLoginOpen(false)}>×</button><p className="section-kicker">ADMIN ONLY</p><h3>관리자 로그인</h3><label>아이디<input name="username" autoComplete="username" required /></label><label>비밀번호<input name="password" type="password" autoComplete="current-password" required /></label>{message && <p className="login-error">{message}</p>}<button className="btn primary" type="submit">로그인</button></form></div>}
      {editing && <div className="catalog-modal-backdrop"><section className="catalog-editor" role="dialog" aria-modal="true"><button className="modal-close" type="button" onClick={() => setEditing(false)}>×</button><p className="section-kicker">EDIT CATALOG</p><h3>해커톤 카드 편집</h3>{draft.map((card, index) => <fieldset key={card.id}><legend>{`CARD ${index + 1}`}</legend><label>제목<textarea value={card.title} onChange={(e) => update(index, "title", e.target.value)} /></label><label>한 줄 소개<textarea value={card.summary} onChange={(e) => update(index, "summary", e.target.value)} /></label><label>상세 설명<textarea value={card.description} onChange={(e) => update(index, "description", e.target.value)} /></label><label>일정<input value={card.date} onChange={(e) => update(index, "date", e.target.value)} /></label><label>태그 (쉼표로 구분)<input value={card.tags.join(", ")} onChange={(e) => update(index, "tags", e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} /></label><label>이미지 주소<input value={card.image} onChange={(e) => update(index, "image", e.target.value)} /></label><label>색상<select value={card.tone} onChange={(e) => update(index, "tone", e.target.value as Tone)}><option value="lime">Lime</option><option value="violet">Violet</option><option value="orange">Orange</option></select></label></fieldset>)}<div className="editor-actions"><span>{message}</span><button type="button" onClick={save}>저장하기</button></div></section></div>}
    </div>
  </section>;
}
