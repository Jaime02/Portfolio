"use client";

import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import useOnWindowResize from "@/hooks/useOnWindowResize";
import React from "react";
import { ThumbnailContextProvider } from "@/components/thumbnails-tabs/ThumbnailContext";
import { usePathname } from "@/translations/routing";
import { StoriesContext } from "@/app/lib/StoriesContext";
import { StoryGroupCategory } from "@/misc/Constants";

export default function ContentTabs() {
  const tabsContainerLayoutRef = useRef<HTMLDivElement>(null);
  const tabElements = useRef<HTMLElement[]>([]);
  
  const { storyCategories } = useContext(StoriesContext);
  const { useRouter } = useContext(StoriesContext);

  const router = useRouter();
  const pathname = usePathname();
  
  let initialTabIndex: number = 0;
  let urlHash = window.location.hash.replace("#", "");
  if (urlHash) {
    initialTabIndex = Math.max(
      storyCategories.findIndex((tab: StoryGroupCategory) => tab.getId() === urlHash),
      0,
    );
  }
  const [activeTabIndex, setActiveTabIndex] = useState(initialTabIndex);
  const [activeBorderIndex, setActiveBorderIndex] = useState(initialTabIndex);

  const updateLayoutOffset = useCallback(() => {
    if (!tabsContainerLayoutRef.current || !tabElements.current[activeTabIndex]) {
      return 0;
    }
    const tabWidth = tabElements.current[activeTabIndex].clientWidth;
    const containerWidth = tabsContainerLayoutRef.current.offsetWidth;
    for (let i = 0; i < tabElements.current.length; i++) {
      let offset = containerWidth / 2 - tabWidth / 2 + i * tabWidth - activeTabIndex * tabWidth + 20 * i - activeTabIndex * 20;
      tabElements.current![i].style.left = `${offset}px`;
    }
  }, [activeTabIndex]);

  const updateTabsContainerHeight = useCallback(() => {
    let parentHeight = Math.max(...tabElements.current.map((tab) => tab.offsetHeight));
    tabsContainerLayoutRef.current!.style.height = `${parentHeight}px`;
  }, [tabElements]);

  useOnWindowResize(() => {
    updateTabsContainerHeight();
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
    let tabIndex = storyCategories.findIndex((tab: StoryGroupCategory) => tab.getId() === tabId);
    if (tabIndex === 0 || tabIndex === -1) {
      // Remove the URL hash on the first tab
      router.replace(pathname);
    } else {
      router.replace(`${pathname}#${tabId}`);
    }

    setActiveTabIndex(tabIndex);
    updateLayoutOffset();
  }

  // This will load the offset properly on page loading before displaying anything
  useLayoutEffect(() => {
    updateTabsContainerHeight();
    updateLayoutOffset();
  }, [updateLayoutOffset, updateTabsContainerHeight]);

  function handleAnchorClick(tabId: string, event: React.MouseEvent<HTMLAnchorElement>) {
    // Prevent default behavior. By default, it always sets the hash in the URL
    event.preventDefault();

    // Animate the scroll only after the first click. Avoid animating the scroll on page render
    for (let i = 0; i < tabElements.current.length; i++) {
      tabElements.current[i]!.setAttribute("data-animate", "");
    }

    updateSelectedTab(tabId);
  }
  function thumbnailOnFocus(event: React.FocusEvent<HTMLDivElement>, tabId: string) {
    updateSelectedTab(tabId);
    // Avoid the scroll jumping to the top when focusing the thumbnail
    tabsContainerLayoutRef.current!.scrollLeft = 0;
  }

  return (
    <>
      <div className="flex w-full flex-row justify-around border-t-[1px] sm:justify-center sm:gap-[60px]">
        {storyCategories.map((tab: StoryGroupCategory, index: number) => {
          let tabId = tab.getId();
          let isActive = activeBorderIndex === index;
          return (
            <a
              key={tabId}
              className={`flex flex-1 flex-row items-center justify-center gap-2 ${isActive ? "border-t-[1px] border-black dark:border-white" : "text-gray-800 dark:text-ig-gray"} py-2`}
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
      <div ref={tabsContainerLayoutRef} className="relative w-full overflow-hidden">
        {storyCategories.map((tab: StoryGroupCategory, index: number) => (
          <ThumbnailContextProvider key={index} onFocus={(event: React.FocusEvent<HTMLDivElement>) => thumbnailOnFocus(event, tab.getId())}>
            {React.cloneElement(tab.storyTabThumbnails, {
              ref: (el: HTMLDivElement) => (tabElements.current[index] = el),
              key: index,
            })}
          </ThumbnailContextProvider>
        ))}
      </div>
    </>
  );
}

ContentTabs.displayName = "Content tabs";
