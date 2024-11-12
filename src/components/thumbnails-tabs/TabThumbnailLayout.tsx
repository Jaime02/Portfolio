"use client";
import { ThumbnailContext } from "@/components/thumbnails-tabs/ThumbnailContext";
import { Link } from "@/translations/routing";
import { useContext, useState } from "react";

interface TabThumbnailLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  href: string;
  title: string;
  padding: boolean;
}

export default function TabThumbnailLayout({ children, href, title, padding = false }: TabThumbnailLayoutProps) {
  const [isHovered, setIsHovered] = useState(false);
  const {onFocus} = useContext(ThumbnailContext);

  return (
    <Link
      href={href}
      className={`relative flex aspect-square items-center overflow-hidden rounded-md bg-white data-[animate]:transition-transform data-[animate]:duration-700 hover:scale-[102%] active:ring-2 dark:bg-gray-300 ${padding ? "p-2" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={(event) => {onFocus(event); setIsHovered(true)}}
      onBlur={() => setIsHovered(false)}
      aria-label={`Select tab: ${title}`}
    >
      {children}
      <div
        className={`absolute left-0 top-0 w-full transform bg-gray-700 py-2 text-center text-white transition-transform duration-300 ${isHovered ? "translate-y-0" : "-translate-y-full"}`}
        aria-hidden={!isHovered}
      >
        {title}
      </div>
      <span className="sr-only">{title}</span>
    </Link>
  );
}
