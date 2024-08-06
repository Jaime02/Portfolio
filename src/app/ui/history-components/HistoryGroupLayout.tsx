"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import CloseIcon from "@/app/icons/CloseIcon";
import NextArrow from "@/app/icons/NextArrow";
import PreviousArrow from "@/app/icons/PreviousArrow";
import BottomBar from "@/app/ui/history-components/BottomBar";

interface Props {
  children: React.ReactNode[];
  title: string;
  thumbnail: string;
  previousHistoryGroupTitle?: string;
  nextHistoryGroupTitle?: string;
}

export default function HistoryGroupLayout({ children, title, thumbnail, previousHistoryGroupTitle, nextHistoryGroupTitle }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const historiesRefs = useRef<(HTMLDivElement | null)[]>([]);

  function scrollToIndex(index: number) {
    historiesRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
    });
    setActiveIndex(index);
  }

  function goToPreviousHistory() {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  }

  function goToNextHistory() {
    if (activeIndex < historiesRefs.current.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  }

  function navigateIfSmallScreen(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (window.innerWidth < 640) {
      if (event.pageX - event.currentTarget.offsetLeft > event.currentTarget.offsetWidth / 2) {
        goToNextHistory();
      } else {
        goToPreviousHistory();
      }
    }
  }

  return (
    <div className="flex h-screen w-full flex-col bg-black sm:w-full sm:flex-row sm:gap-10 sm:bg-[#1a1a1a]">
      {previousHistoryGroupTitle && (
        <div className="hidden sm:block">
          <p>Anterior: {previousHistoryGroupTitle}</p>
        </div>
      )}
      <div className="max-h-full flex-1 sm:my-14">
        <div className="mx-auto flex h-full w-fit flex-row items-center gap-4">
          <PreviousArrow extraClasses={`text-[#8e8e8e] hover:text-white hover:cursor-pointer transition-all invisible ${activeIndex !== 0 ? "sm:visible" : ""}`} onClick={goToPreviousHistory} /> 
          <div className="flex aspect-[9/16] h-full flex-col rounded-md bg-black text-center">
            <div className="flex w-full flex-row items-center gap-1 p-2">
              <Image src={thumbnail} alt="History group thumbnail" width="32" height="32" className="rounded-full" />
              <h1 className="h-fit flex-1 text-left leading-none text-white">{title}</h1>
              <a href="/">
                <CloseIcon extraClasses="text-white" />
              </a>
            </div>
            <div className="flex flex-1 flex-row overflow-x-hidden rounded-md" onClick={navigateIfSmallScreen}>
              {children.map((child, index) => {
                return React.cloneElement(child as React.ReactElement<any>, {
                  ref: (el: HTMLDivElement) => {
                    historiesRefs.current[index] = el;
                  },
                  key: index,
                });
              })}
            </div>
            <BottomBar />
          </div>
          <NextArrow
            extraClasses={`text-[#8e8e8e] hover:text-white hover:cursor-pointer transition-all invisible ${activeIndex !== historiesRefs.current.length - 1 ? "sm:visible" : ""}`}
            onClick={goToNextHistory}
          />
        </div>
      </div>
      {nextHistoryGroupTitle && (
        <div className="hidden sm:block">
          <p>Siguiente: {nextHistoryGroupTitle}</p>
        </div>
      )}
    </div>
  );
}
