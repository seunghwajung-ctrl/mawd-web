/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type SocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

const socialLinks: SocialLink[] = [
  {
    label: "Discord",
    href: "https://discord.com/",
    icon: (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.32 4.37A19.8 19.8 0 0 0 15.36 2.8a13.9 13.9 0 0 0-.64 1.3 18.42 18.42 0 0 0-5.44 0 13.9 13.9 0 0 0-.64-1.3 19.8 19.8 0 0 0-4.96 1.57C.54 9.03-.31 13.57.13 18.05a19.94 19.94 0 0 0 6.08 3.07 14.74 14.74 0 0 0 1.3-2.1 12.87 12.87 0 0 1-2.05-.98c.17-.12.34-.25.5-.38a14.2 14.2 0 0 0 12.08 0c.16.13.33.26.5.38-.65.39-1.33.72-2.05.98.37.73.8 1.43 1.3 2.1a19.9 19.9 0 0 0 6.08-3.07c.52-5.2-.88-9.7-3.55-13.68ZM8.02 15.3c-1.18 0-2.15-1.08-2.15-2.4s.95-2.4 2.15-2.4c1.2 0 2.17 1.09 2.15 2.4 0 1.32-.95 2.4-2.15 2.4Zm7.96 0c-1.18 0-2.15-1.08-2.15-2.4s.95-2.4 2.15-2.4c1.2 0 2.17 1.09 2.15 2.4 0 1.32-.95 2.4-2.15 2.4Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/team_mawd?igsh=MW0zdHVhd3Vxbmx6aw%3D%3D&utm_source=qr",
    icon: (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
      >
        <rect
          width="16"
          height="16"
          x="4"
          y="4"
          rx="4"
          stroke="url(#instagram-gradient)"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="3.5" stroke="url(#instagram-gradient)" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.1" fill="#facc15" />
        <defs>
          <linearGradient id="instagram-gradient" x1="5" x2="19" y1="19" y2="5">
            <stop stopColor="#f97316" />
            <stop offset="0.48" stopColor="#ec4899" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <img
        src="https://images.shadcnspace.com/assets/svgs/icon-linkedin.svg"
        alt=""
        className="h-4 w-4"
      />
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <img
        src="https://images.shadcnspace.com/assets/svgs/icon-facebook.svg"
        alt=""
        className="h-4 w-4"
      />
    ),
  },
];

const ButtonSocialIconDemo = () => {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {socialLinks.map((link) => (
        <Button
          asChild
          key={link.label}
          variant="outline"
          aria-label={link.label}
          className="rounded-lg hover:scale-120 transition-all duration-300 cursor-pointer"
        >
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.icon}
          </a>
        </Button>
      ))}
    </div>
  );
};

export default ButtonSocialIconDemo;
