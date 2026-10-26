type Sponsor = {
  name: string;
  logoUrl?: string;
  href: string;
  className?: string;
};

const sponsorTiers: Array<{ tier: string; sponsors: Sponsor[] }> = [
  { tier: "MAIN SPONSOR", sponsors: [] },
  {
    tier: "PREMIER SPONSOR",
    sponsors: [
      {
        name: "채널톡",
        logoUrl: "/sponsors/channeltalk-logo-white-on-black.jpg",
        href: "https://channel.io/ko",
        className: "sponsor-logo-channel",
      },
      {
        name: "스티비",
        logoUrl: "/sponsors/stibee-logo-white.png",
        href: "https://stibee.com/",
        className: "sponsor-logo-stibee",
      },
    ],
  },
  {
    tier: "SILVER SPONSOR",
    sponsors: [
      {
        name: "라이너",
        logoUrl: "/sponsors/liner-logo-white.png",
        href: "https://liner.com/",
        className: "sponsor-logo-liner",
      },
      {
        name: "Render",
        logoUrl: "/sponsors/render-logo-white.png",
        href: "https://render.com/",
        className: "sponsor-logo-render",
      },
    ],
  },
  {
    tier: "API SPONSOR",
    sponsors: [
      {
        name: "아정당",
        logoUrl: "https://cdn.ajd.kr/images/platform/landing/internet/ajd_logo_w.webp?w=300&h=144&q=90&f=webp",
        href: "https://www.ajd.co.kr/",
        className: "sponsor-logo-ajd",
      },
      {
        name: "Vapi.ai",
        logoUrl: "https://vapi.ai/VAPI.svg",
        href: "https://vapi.ai/",
        className: "sponsor-logo-vapi",
      },
      {
        name: "ZETIC.ai",
        logoUrl: "/sponsors/zetic-ai-white-on-black.png",
        href: "https://zetic.ai/",
        className: "sponsor-logo-zetic",
      },
    ],
  },
  { tier: "SUPPORT", sponsors: [] },
];

export function SponsorSection() {
  return (
    <section id="sponsors" className="sponsor-section" aria-labelledby="sponsor-heading">
      <div className="wrap">
        <p className="section-kicker">SPONSORS</p>
        <h2 id="sponsor-heading">MAWD와 함께합니다.</h2>

        <div className="sponsor-tiers">
          {sponsorTiers.map(({ tier, sponsors }, index) => (
            <section className={`sponsor-tier sponsor-tier--${index + 1}`} key={tier} aria-label={tier}>
              <h3>{tier}</h3>
              <div className="sponsor-logos">
                {sponsors.length ? (
                  sponsors.map(({ name, logoUrl, href, className }) => (
                    <a
                      className="sponsor-logo-link"
                      href={href}
                      key={name}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${name} 홈페이지 열기`}
                    >
                      {/* External brand artwork is intentionally rendered at its intrinsic ratio. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className={className} src={logoUrl} alt={`${name} 로고`} />
                      <span>{name}</span>
                    </a>
                  ))
                ) : (
                  <p className="sponsor-vacancy">PARTNERSHIP OPEN</p>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
