'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DownArrowIcon from "./icons/DownArrowIcon";
import ThreeDotsIcon from "./icons/ThreeDotsIcon";
import UserPlusIcon from "./icons/UserPlusIcon";
import { tabs } from "./lib/constants";
import ProjectsTab from "./ui/content-tabs/ProjectsTab";
import ExperienceTab from "./ui/content-tabs/ExperienceTab";
import OthersTab from "./ui/content-tabs/OthersTab";

export default function Page() {
  const yearsOld = new Date().getFullYear() - 2002;
  const tabsContainerRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState("projects");

  useEffect(() => {
    const tabsContainer = tabsContainerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateSelectedTab(entry.target.id);
          }
        });
      },
      { root: tabsContainer, threshold: 0.5 },
    );

    const tabElements = [document.getElementById("projects"), document.getElementById("experience"), document.getElementById("others")];

    tabElements.forEach((tab) => {
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
    history.replaceState(null, null, location + hash);
  }

  function handleAnchorClick(tabId: string, event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = document.getElementById(tabId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    updateSelectedTab(tabId);
  }

  return (
    <main className="mx-auto sm:mt-[30px] md:max-w-3xl lg:max-w-4xl">
      <section className="flex flex-col items-start justify-center">
        <header className="flex h-11 w-full flex-row items-center justify-center border-b-[1px] border-[#dbdbdb] sm:hidden">
          <h1 className="font-system font-semibold">Jaime Resano</h1>
        </header>
        <div className="mt-4 grid grid-flow-col sm:mb-4 sm:mt-0">
          <div className="col-start-1 row-span-2 row-start-1 mx-4 h-fit w-fit rounded-full bg-gradient-to-tr from-yellow-200 via-[#FD1D1D] to-[#FF00AA] p-[3.5px] sm:row-span-3 sm:ml-0 sm:mr-7">
            <div className="rounded-full bg-white p-1">
              <Image src="/images/jaimePicture.png" alt="Jaime Resano face" className="size-20 min-h-20 min-w-20 rounded-full sm:size-44 sm:min-h-44 sm:min-w-44" width="80" height="80" />
            </div>
          </div>

          <div className="col-start-2 row-start-1 flex flex-row flex-wrap items-center justify-start gap-2 sm:mb-5">
            <h1 className="text-nowrap text-xl">Jaime Resano</h1>
            <div className="flex flex-row items-start justify-center gap-2">
              <div className="btn-secondary">
                <p>Following</p>
                <DownArrowIcon extraClasses="size-3 stroke-black dark:stroke-white" />
              </div>
              <div className="btn-secondary text-nowrap">Send message</div>
              <div className="btn-secondary">
                <UserPlusIcon extraClasses="size-4 stroke-black dark:stroke-white" />
              </div>
              <ThreeDotsIcon extraClasses="size-8 stroke-black dark:stroke-white" />
            </div>
          </div>
          <div className="col-span-2 row-start-4 border-t-[1px] border-[#dbdbdb] py-3 sm:col-start-2 sm:row-start-2 sm:border-t-0 sm:p-0">
            <div className="flex flex-1 flex-row flex-nowrap justify-around sm:justify-start sm:gap-10">
              <div className="flex flex-col items-center gap-0 font-system text-sm sm:flex-row sm:gap-1 sm:font-normal">
                <span className="font-lg font-semibold">12</span> projects
              </div>
              <div className="flex flex-col items-center gap-0 font-system text-sm sm:flex-row sm:gap-1 sm:font-normal">
                <span className="font-lg font-semibold">{yearsOld}</span> years old
              </div>
              <div className="flex flex-col items-center gap-0 font-system text-sm sm:flex-row sm:gap-1 sm:font-normal">
                <span className="font-lg font-semibold">69</span> followers
              </div>
            </div>
          </div>
          <div className="col-span-2 col-start-1 p-4 font-system text-sm sm:col-span-1 sm:col-start-2 sm:row-start-3 sm:p-0">
            <h2 className="font-lg font-bold">Welcome to my personal website</h2>
            <p>
              I am a software engineer with a strong passion for programming and anything related to computers.
              <br />
              In this website you can find my portfolio with the format of an Instagram profile.
            </p>
          </div>
        </div>
      </section>
      <div id="anchorsTabsContainer" className="flex w-full flex-row justify-around border-t-[1px] border-[#dbdbdb] sm:justify-center sm:gap-[60px]">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            className={`flex flex-1 flex-row items-center justify-center gap-2 border-black py-2 aria-selected:border-t-[1px] ${selectedTab === tab.id ? "border-t-[1px]" : ""}`}
            href={`#${tab.id}`}
            aria-label={tab.name}
            id={`anchor${tab.name}`}
            onClick={(event) => handleAnchorClick(tab.id, event)}
          >
            <tab.icon extraClasses="size-8" />
            <span className="hidden text-sm uppercase tracking-widest sm:inline">{tab.name}</span>
          </a>
        ))}
      </div>
      <div ref={tabsContainerRef} id="tabsContainer" className="flex snap-x flex-row gap-2 overflow-x-hidden scroll-smooth data-[dragging]:snap-none">
        <ProjectsTab id="projects" />
        <ExperienceTab id="experience" />
        <OthersTab id="others" />
      </div>
    </main>
  );
}
