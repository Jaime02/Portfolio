"use client";

import { storyCategories } from "@/misc/Constants";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import useOnWindowResize from "@/misc/useOnWindowResize";
import React from "react";

export default function ContentTabs() {
  const tabsContainerLayoutRef = useRef<HTMLDivElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabElements = useRef<HTMLElement[]>([]);

  let initialTabIndex: number = 0;
  let urlHash = window.location.hash.replace("#", "");
  if (urlHash) {
    initialTabIndex = Math.max(
      storyCategories.findIndex((tab) => tab.getId() === urlHash),
      0,
    );
  }

  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);
  const [activeBorderIndex, setActiveBorderIndex] = useState(initialTabIndex);

  const updateLayoutOffset = useCallback(() => {
    if (!tabsContainerLayoutRef.current || !tabElements.current[activeTabIndex]) {
      return 0;
    }
    const tabWidth = tabElements.current[activeTabIndex].offsetWidth;
    const containerWidth = tabsContainerLayoutRef.current.offsetWidth;
    let offset = containerWidth / 2 - tabWidth / 2 - activeTabIndex * tabWidth;
    tabsContainerRef.current!.style.transform = ` translateX(${offset}px)`;
  }, [activeTabIndex]);

  useOnWindowResize(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  // Observer which updates the border of the active tab
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            let index = (entry.target as HTMLElement).dataset.index;
            if (index !== undefined) {
              setActiveBorderIndex(Number(index));
            }
          }
        });
      },
      { root: tabsContainerLayoutRef.current, threshold: 0.8 },
    );

    tabElements.current.forEach((tab) => observer.observe(tab));

    return () => observer.disconnect();
  }, []);

  function updateSelectedTab(tabId: string) {
    if (tabId === "projects") {
      // Remove the URL hash on the first tab 
      history.replaceState(null, "", window.location.pathname);
    } else {
      history.replaceState(null, "", `#${tabId}`);
    }

    setActiveTabIndex(storyCategories.findIndex((tab) => tab.getId() === tabId));
    updateLayoutOffset();
  }

  // This will load the offset properly on page loading before displaying anything
  useLayoutEffect(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  function handleAnchorClick(tabId: string, event: React.MouseEvent<HTMLAnchorElement>) {
    // Prevent default behavior. By default, it always sets the hash in the URL
    event.preventDefault();

    // Animate the scroll only after the first click. Avoid animating the scroll on page render
    tabsContainerRef.current!.setAttribute("data-animate", "");

    updateSelectedTab(tabId);
  }

  return (
    <>
      <div className="flex w-full flex-row justify-around border-t-[1px] sm:justify-center sm:gap-[60px]">
        {storyCategories.map((tab, index) => {
          let tabId = tab.getId();
          let isActive = activeBorderIndex === index;
          return (
            <a
              key={tabId}
              className={`flex flex-1 flex-row items-center justify-center gap-2 ${isActive ? "border-black dark:border-white border-t-[1px]" : "text-gray-800 dark:text-ig-gray"} py-2`}
              href={tabId === "projects" ? "" : `#${tabId}`}
              aria-label={tab.name}
              onClick={(event) => handleAnchorClick(tabId, event)}
            >
              {tab.icon}
              <span className={`hidden text-sm uppercase tracking-widest sm:inline ${isActive ? "font-bold" : ""}`}>{tab.name}</span>
            </a>
          );
        })}
      </div>
      <div ref={tabsContainerLayoutRef} className="w-full overflow-x-hidden">
        <div ref={tabsContainerRef} className="flex flex-row data-[animate]:transition-transform data-[animate]:duration-700"> 
          {storyCategories.map((tab, index) =>
            React.cloneElement(tab.storyTabThumbnails, {
              ref: (el: HTMLDivElement) => (tabElements.current[index] = el),
              key: index,
            }),
          )}
        </div>
      </div>
    </>
  );
}

ContentTabs.displayName = "Content tabs";
