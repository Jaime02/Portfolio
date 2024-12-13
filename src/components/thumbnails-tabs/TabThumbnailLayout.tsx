"use client";
import { ThumbnailContext } from "@/components/thumbnails-tabs/ThumbnailContext";
import { Link } from "@/translations/routing";
import { useContext, useState } from "react";
import { SettingsContext } from "@/app/lib/SettingsContext";

interface TabThumbnailLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  href: string;
  title: string;
  padding: boolean;
}

export default function TabThumbnailLayout({ children, href, title, padding = false }: TabThumbnailLayoutProps) {
  const { fullScreenStories, setFullScreenStories } = useContext(SettingsContext);
  const [isHovered, setIsHovered] = useState(false);
  const { onFocus } = useContext(ThumbnailContext);

  async function setFullScreenIfNecessary() {
    if (!fullScreenStories) {
      return;
    }
    document.documentElement.requestFullscreen()
      .then(() => {
        console.log("Fullscreen enabled");
        
      })
      .catch((err) => {
        setFullScreenStories(false);
      });
  }

  return (
    <Link
      href={href}
      className={`relative flex aspect-square items-center overflow-hidden rounded-md bg-white hover:scale-[102%] active:ring-2 data-[animate]:transition-transform data-[animate]:duration-700 dark:bg-gray-300 ${padding ? "p-2" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={(event) => {
        onFocus(event);
        setIsHovered(true);
      }}
      onBlur={() => setIsHovered(false)}
      onClick={setFullScreenIfNecessary}
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
