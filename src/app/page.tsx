"use client";

import React, { useEffect, useRef, useState } from "react";

import { storyCategories } from "@/misc/Constants";
import ProfileContent from "@/components/misc/ProfileContent";

export default function Page() {
  const tabsContainerRef = useRef(null);
  const tabElements = useRef<HTMLElement[]>([]);

  const [borderTab, setBorderTab] = useState(0);

  // Scroll to the initially selected tab by the title in the URL
  useEffect(() => {
    let defaultTab = window.location.hash.replace("#", "") ? window.location.hash.replace("#", "") : storyCategories[0].getId();
    let defaultBorderIndex = defaultTab ? storyCategories.findIndex((tab) => tab.getId() === defaultTab) : 0;
    setBorderTab(defaultBorderIndex);
    tabElements.current[defaultBorderIndex].scrollIntoView({ behavior: "auto" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let index = (entry.target as HTMLElement).dataset.index;
            if (index !== undefined) {
              setBorderTab(Number(index));
            }
          }
        });
      },
      { root: tabsContainerRef.current, threshold: 0.5 },
    );

    tabElements.current.forEach((tab) => observer.observe(tab));

    return () => observer.disconnect();
  }, []);

  function updateSelectedTab(tabId: string) {
    let hash = `#${tabId}`;
    if (tabId === "projects") {
      hash = "";
    }

    if (hash === window.location.hash) {
      return;
    }

    let location = window.location.toString().split("#")[0];
    history.replaceState(null, "", location + hash);

    let tabIndex = storyCategories.findIndex((tab) => tab.getId() === tabId);
    tabElements.current[tabIndex].scrollIntoView({ behavior: "smooth" });
  }

  function handleAnchorClick(tabId: string, event: React.MouseEvent<HTMLAnchorElement>) {
    // Prevent default behavior. By default, it always sets the hash in the URL
    event.preventDefault();
    updateSelectedTab(tabId);
  }

  return (
    <main className="mx-auto sm:mt-[30px] md:max-w-3xl lg:max-w-4xl">
      <ProfileContent />
      <div className="flex w-full flex-row justify-around border-t-[1px] border-[#dbdbdb] sm:justify-center sm:gap-[60px]">
        {storyCategories.map((tab, index) => {
          let tabId = tab.getId();
          return (
            <a
              key={tabId}
              className={`flex flex-1 flex-row items-center justify-center gap-2 border-black py-2 aria-selected:border-t-[1px] ${borderTab === index ? "border-t-[1px]" : ""}`}
              href={tabId === "projects" ? "" : `#${tabId}`}
              aria-label={tab.name}
              onClick={(event) => handleAnchorClick(tabId, event)}
            >
              {tab.icon}
              <span className="hidden text-sm uppercase tracking-widest sm:inline">{tab.name}</span>
            </a>
          );
        })}
      </div>
      <div ref={tabsContainerRef} className="flex snap-x flex-row gap-2 overflow-x-hidden data-[dragging]:snap-none">
        {storyCategories.map((tab, index) =>
          React.cloneElement(tab.storyTabThumbnails, {
            ref: (el: HTMLDivElement) => (tabElements.current[index] = el),
            key: index,
          }),
        )}
      </div>
    </main>
  );
}
