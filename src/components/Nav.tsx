export function Nav() {
  return (
    <nav className="nav" aria-label="주요 메뉴">
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label="MAWD Challenge home">
          <span className="brand-mark">MAWD</span>
          <span>
            <small>CHALLENGE</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#challenge">챌린지 소개</a>
          <a href="#program">프로그램</a>
          <a href="#benefits">혜택</a>
          <a href="#apply">참가 안내</a>
        </div>
        <a className="btn primary" href="#apply">
          참가 신청 <span className="arrow">›</span>
        </a>
      </div>
    </nav>
  );
}
