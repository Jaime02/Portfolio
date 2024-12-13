"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function CloseFriends() {
  const t = useTranslations("Icons");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="flex items-center justify-center rounded-md bg-ig-close-friends p-2 text-white">
      <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
        <title>{t("Close friends")}</title>
        <path d="M18.18 22.51a.99.99 0 0 1-.513-.142L12 18.975l-5.667 3.393a1 1 0 0 1-1.492-1.062l1.37-6.544-4.876-4.347a.999.999 0 0 1 .536-1.737l6.554-.855 2.668-5.755a1 1 0 0 1 1.814 0l2.668 5.755 6.554.855a.999.999 0 0 1 .536 1.737l-4.876 4.347 1.37 6.544a1 1 0 0 1-.978 1.205Z"></path>
      </svg>
      <p className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isHovered ? 'sm:w-auto ml-1 sm:opacity-100 sm:translate-x-0' : 'w-0 opacity-0 -translate-x-2'}
          text-xs font-semibold whitespace-nowrap
        `}>
        {t("Close friends")}
      </p>
    </div>
  );
}
