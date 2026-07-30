"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { useEffect } from "react";
import { LUMA_EVENT_ID, LUMA_EVENT_URL } from "@/lib/luma-config";

declare global {
  interface Window {
    luma?: {
      initCheckout?: () => void;
    };
  }
}

type LumaCheckoutButtonProps = {
  children: ReactNode;
  className: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function LumaCheckoutButton({
  children,
  className,
  onClick,
}: LumaCheckoutButtonProps) {
  useEffect(() => {
    window.luma?.initCheckout?.();
  }, []);

  return (
    <a
      href={LUMA_EVENT_URL}
      className={className}
      data-luma-action="checkout"
      data-luma-event-id={LUMA_EVENT_ID}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
