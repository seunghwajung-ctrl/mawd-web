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
        logoUrl: "/sponsors/channeltalk-logo-primary.svg",
        href: "https://channel.io/ko",
        className: "sponsor-logo-channel",
      },
    ],
  },
  {
    tier: "SILVER SPONSOR",
    sponsors: [
      {
        name: "셀피쉬클럽",
        logoUrl: "https://cdn.prod.website-files.com/645118d6c53a1df851717d70/65e43d32a113437e30c4b16d_Group%2041.svg",
        href: "https://www.selfishclub.xyz/",
        className: "sponsor-logo-selfish",
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
