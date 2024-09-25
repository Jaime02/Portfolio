"use client";
import React, { useState, useRef, forwardRef, useEffect, useCallback } from "react";
import NextArrow from "@/icons/NextArrow";
import PreviousArrow from "@/icons/PreviousArrow";
import BottomBar from "@/components/stories/BottomBar";
import Header from "@/components/stories/Header";
import * as Constants from "@/app/misc/Constants";
import HistoriesProgressBar from "@/components/stories/StoriesProgressBar";

export interface CardsLayoutProps {
  children?: React.ReactNode[];
  title?: string;
  thumbnail?: string;
  active?: boolean;
  isFirstGroup?: boolean;
  isLastGroup?: boolean;
  selectMyself?: () => void;
  goToPreviousHistoryGroup?: () => void;
  goToNextHistoryGroup?: () => void;
}

const STORY_DURATION = 100000;
let timerResolution = 50;

const CardsLayout = forwardRef<HTMLDivElement, CardsLayoutProps>(
  ({ children, title, thumbnail, active, isFirstGroup, isLastGroup, selectMyself, goToPreviousHistoryGroup, goToNextHistoryGroup }, ref) => {
    const [activeHistoryCardIndex, setActiveHistoryCardIndex] = useState(0);
    const historiesContainerRef = useRef<HTMLDivElement>(null);
    const historiesRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [historyTimer, setHistoryTimer] = useState(0);

    useEffect(() => {
      if (active && historiesRefs.current[activeHistoryCardIndex]) {
        historiesContainerRef.current?.scrollTo({
          top: 0,
          left: historiesRefs.current[activeHistoryCardIndex]?.offsetWidth * activeHistoryCardIndex,
          behavior: "smooth",
        });
      }
    }, [activeHistoryCardIndex, active]);

    const goToPreviousHistory = useCallback(() => {
      setHistoryTimer(0);

      if (activeHistoryCardIndex === 0) {
        goToPreviousHistoryGroup!();
        return;
      }
      setActiveHistoryCardIndex(activeHistoryCardIndex - 1);
    }, [activeHistoryCardIndex, goToPreviousHistoryGroup]);

    const goToNextHistory = useCallback(() => {
      if (activeHistoryCardIndex === historiesRefs.current.length - 1 && isLastGroup) {
        window.location.href = "/";
        return;
      }

      setHistoryTimer(0);

      if (activeHistoryCardIndex === historiesRefs.current.length - 1) {
        setActiveHistoryCardIndex(0);
        goToNextHistoryGroup!();
        return;
      }

      setActiveHistoryCardIndex(activeHistoryCardIndex + 1);
    }, [activeHistoryCardIndex, goToNextHistoryGroup, isLastGroup]);

    useEffect(() => {
      if (!active) {
        return;
      }

      const timer = setInterval(() => {
        if (historyTimer < 100) {
          setHistoryTimer((historyTimer) => historyTimer + 100 / (STORY_DURATION / timerResolution));
        } else {
          goToNextHistory();
        }
      }, timerResolution);

      return () => clearInterval(timer);
    }, [historyTimer, goToNextHistory, active]);

    function navigateIfSmallScreen(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      if (window.innerWidth > Constants.SMALL_BREAKPOINT_WIDTH) {
        return;
      }

      let elementRect = event.currentTarget.getBoundingClientRect();
      let centerX = elementRect.left + elementRect.width / 2;
      let clickX = event.clientX;

      if (clickX > centerX) {
        goToNextHistory();
      } else {
        goToPreviousHistory();
      }
    }

    function onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      if (active) {
        return;
      }

      setActiveHistoryCardIndex(0);
      setHistoryTimer(0);
      selectMyself!();
    }

    return (
      <div className={`mx-auto flex h-full w-fit flex-row items-center gap-4 transition duration-300 ease-in-out ${active ? "" : "scale-50 opacity-50"}`} onClick={onClick} ref={ref}>
        {active && <PreviousArrow extraClasses={`invisible ${activeHistoryCardIndex !== 0 || !isFirstGroup ? "sm:visible" : ""}`} onClick={goToPreviousHistory} />}
        <div className="flex aspect-[9/16] h-full flex-col rounded-md bg-black text-center">
          {active && <HistoriesProgressBar historyCount={children ? children.length : 0} activeHistoryIndex={activeHistoryCardIndex} progress={historyTimer}></HistoriesProgressBar>}
          {thumbnail && title && <Header active={active!} thumbnail={thumbnail} title={title} />}
          <div ref={historiesContainerRef} className="flex flex-1 snap-x flex-row overflow-x-hidden rounded-md" onClick={navigateIfSmallScreen}>
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
        {active && <NextArrow extraClasses={"invisible sm:visible"} onClick={goToNextHistory} />}
      </div>
    );
  },
);

CardsLayout.displayName = "CardsLayout";
export default CardsLayout;
