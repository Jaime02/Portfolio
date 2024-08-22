"use client";
import React, { useState, useRef, forwardRef, useEffect, useLayoutEffect } from "react";
import NextArrow from "@/icons/NextArrow";
import PreviousArrow from "@/icons/PreviousArrow";
import BottomBar from "@/components/histories/BottomBar";
import Header from "@/components/histories/Header";
import * as Constants from "@/app/misc/Constants";

interface Props {
  children?: React.ReactNode[];
  title?: string;
  thumbnail?: string;
  active?: boolean;
  invisible?: boolean;
  onClick?: () => void;
}

const CardsLayout = forwardRef<HTMLDivElement, Props>(({ children, title, thumbnail, active, invisible = false, onClick }: Props, ref) => {
  const [activeHistoryCardIndex, setActiveHistoryCardIndex] = useState(0);

  const historiesRefs = useRef<(HTMLDivElement | null)[]>([]);

  function goToPreviousHistory() {
    if (activeHistoryCardIndex > 0) {
      console.log("Going to history", activeHistoryCardIndex - 1);
      
      historiesRefs.current[activeHistoryCardIndex - 1]?.scrollIntoView({
        behavior: "smooth",
      });
      setActiveHistoryCardIndex(activeHistoryCardIndex - 1);
    }
  }

  function goToNextHistory() {
    if (activeHistoryCardIndex < historiesRefs.current.length - 1) {
      console.log("Going to history", activeHistoryCardIndex + 1);
      historiesRefs.current[activeHistoryCardIndex + 1]?.scrollIntoView({
        behavior: "smooth",
      });
      setActiveHistoryCardIndex(activeHistoryCardIndex + 1);

    }
  }

  function navigateIfSmallScreen(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (window.innerWidth > Constants.SMALL_BREAKPOINT_WIDTH) {
      return;
    }

    if (event.pageX - event.currentTarget.offsetLeft > event.currentTarget.offsetWidth / 2) {
      goToNextHistory();
    } else {
      goToPreviousHistory();
    }
  }

  return (
    <div className={`mx-auto flex h-full w-fit snap-center flex-row items-center gap-4 ${active ? "" : "opacity-50"}`} ref={ref} onClick={onClick}>
      <PreviousArrow extraClasses={`${activeHistoryCardIndex !== 0 && active ? "sm:visible" : ""}`} onClick={goToPreviousHistory} />
      <div className="flex aspect-[9/16] h-full flex-col rounded-md bg-black text-center">
        {thumbnail && title && <Header thumbnail={thumbnail} title={title} />}
        <div className="flex flex-1 snap-x flex-row overflow-x-hidden rounded-md" onClick={navigateIfSmallScreen}>
          {children?.map((child, index) => {
            return React.cloneElement(child as React.ReactElement<any>, {
              ref: (el: HTMLDivElement) => {
                historiesRefs.current[index] = el;
              },
              key: index,
            });
          })}
        </div>
        {active && <BottomBar />}
      </div>
      <NextArrow extraClasses={`${active && activeHistoryCardIndex !== historiesRefs.current.length - 1 ? "sm:visible" : ""}`} onClick={goToNextHistory} />
    </div>
  );
});

export default CardsLayout;
