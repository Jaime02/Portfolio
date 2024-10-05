"use client";

import React, { useEffect, useRef, useState } from "react";

import { tabs } from "@/app/misc/Constants";
import ProjectsTab from "@/components/content-tabs/ProjectsTab";
import ExperienceTab from "@/components/content-tabs/ExperienceTab";
import OthersTab from "@/components/content-tabs/OthersTab";
import ProfileContent from "@/components/misc/ProfileContent";

export default function Page() {
  const tabsContainerRef = useRef(null);
  const tabElements = useRef<HTMLElement[]>([]);

  const [borderTab, setBorderTab] = useState(0);

  // Scroll to the initially selected tab by the groupName in the URL
  useEffect(() => {
    let defaultTab = window.location.hash.replace("#", "") ? window.location.hash.replace("#", "") : tabs[0].id;
    let defaultBorderIndex = defaultTab ? tabs.findIndex((tab) => tab.id === defaultTab) : 0;
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

    tabElements.current.forEach(tab => observer.observe(tab));

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

    let tabIndex = tabs.findIndex((tab) => tab.id === tabId);
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
        {tabs.map((tab, index) => (
          <a
            key={tab.id}
            className={`flex flex-1 flex-row items-center justify-center gap-2 border-black py-2 aria-selected:border-t-[1px] ${borderTab === index ? "border-t-[1px]" : ""}`}
            href={tab.id === "projects" ? "" : `#${tab.id}`}
            aria-label={tab.name}
            onClick={(event) => handleAnchorClick(tab.id, event)}
          >
            {tab.Icon}
            <span className="hidden text-sm uppercase tracking-widest sm:inline">{tab.name}</span>
          </a>
        ))}
      </div>
      <div ref={tabsContainerRef} className="flex snap-x flex-row gap-2 overflow-x-hidden data-[dragging]:snap-none">
        <ProjectsTab
          ref={(el) => {
            if (el) tabElements.current[0] = el;
          }}
          index={0}
        />
        <ExperienceTab
          ref={(el) => {
            if (el) tabElements.current[1] = el;
          }}
          index={1}
        />
        <OthersTab
          ref={(el) => {
            if (el) tabElements.current[2] = el;
          }}
          index={2}
        />
      </div>
    </main>
  );
}
