'use client';

import React, { useEffect, useRef, useState } from "react";

import { tabs } from "@/app/lib/Constants";
import ProjectsTab from "@/components/content-tabs/ProjectsTab";
import ExperienceTab from "@/components/content-tabs/ExperienceTab";
import OthersTab from "@/components/content-tabs/OthersTab";
import ProfileContent from "@/components/misc/ProfileContent";

export default function Page() {
  const tabsContainerRef = useRef(null);
  const tabAnchors = useRef<(HTMLAnchorElement | null)[]>([]);
  const tabElements = useRef<(HTMLElement | null)[]>([]);
  const [selectedTab, setSelectedTab] = useState("projects");
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateSelectedTab(entry.target.id);
          }
        });
      },
      { root: tabsContainerRef.current, threshold: 0.5 },
    );

    tabElements.current.forEach((tab) => {
      if (tab) observer.observe(tab);
    });

    // Clean up on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  function updateSelectedTab(tabId: string) {
    setSelectedTab(tabId);
    let hash = `#${tabId}`;
    if (tabId === "projects") {
      hash = "";
    }

    if (hash === window.location.hash) {
      return;
    }

    let location = window.location.toString().split("#")[0];
    history.replaceState(null, "", location + hash);
  }

  function handleAnchorClick(tabId: string, event: React.MouseEvent<HTMLAnchorElement>) {
    // Prevent default behavior. By default, it always sets the hash in the URL 
    event.preventDefault();
    updateSelectedTab(tabId);
  }

  useEffect(() => {
    
  }, [selectedTab]);

  return (
    <main className="mx-auto sm:mt-[30px] md:max-w-3xl lg:max-w-4xl">
      <ProfileContent />
      <div className="flex w-full flex-row justify-around border-t-[1px] border-[#dbdbdb] sm:justify-center sm:gap-[60px]">
        {tabs.map((tab, index) => (
          <a
            key={tab.id}
            className={`flex flex-1 flex-row items-center justify-center gap-2 border-black py-2 aria-selected:border-t-[1px] ${selectedTab === tab.id ? "border-t-[1px]" : ""}`}
            href={`#${tab.id}`}
            aria-label={tab.name}
            onClick={(event) => handleAnchorClick(tab.id, event)}
          >
            {tab.Icon}
            <span className="hidden text-sm uppercase tracking-widest sm:inline">{tab.name}</span>
          </a>
        ))}
      </div>
      <div ref={tabsContainerRef} className="flex snap-x flex-row gap-2 overflow-x-hidden scroll-smooth data-[dragging]:snap-none">
        <ProjectsTab ref={tabElements.current[0]} />
        <ExperienceTab ref={tabElements.current[1]} />
        <OthersTab ref={tabElements.current[2]} />
      </div>
    </main>
  );
}
