"use client";
import React, { useState, useRef, forwardRef, useEffect, useCallback } from "react";
import NextArrow from "@/icons/NextArrow";
import PreviousArrow from "@/icons/PreviousArrow";
import BottomBar from "@/components/stories/BottomBar";
import Header from "@/components/stories/Header";
import * as Constants from "@/app/misc/Constants";
import ProgressBar from "@/components/stories/ProgressBar";

export interface CardsLayoutProps {
  children?: React.ReactNode[];
  title?: string;
  thumbnail?: string;
  active?: boolean;
  isFirstGroup?: boolean;
  isLastGroup?: boolean;
  selectMyself?: () => void;
  goToPreviousStoryGroup?: () => void;
  goToNextStoryGroup?: () => void;
}

const STORY_DURATION = 5000;
let timerResolution = 50;

const CardsLayout = forwardRef<HTMLDivElement, CardsLayoutProps>(({ children, title, thumbnail, active, isFirstGroup, isLastGroup, selectMyself, goToPreviousStoryGroup, goToNextStoryGroup }, ref) => {
  const storiesContainerRef = useRef<HTMLDivElement>(null);
  const storiesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const initialStoryCardIndex = Number(window.location.hash.substring(1));
  const [activeStoryCardIndex, setActiveStoryCardIndex] = useState(initialStoryCardIndex);

  const [storyTimer, setStoryTimer] = useState(0);
  const firstTimeRendering = useRef(true);

  useEffect(() => {
    if (activeStoryCardIndex !== 0) {
      window.history.replaceState(null, "", `#${activeStoryCardIndex}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }

    if (active && storiesRefs.current[activeStoryCardIndex]) {
      storiesContainerRef.current?.scrollTo({
        top: 0,
        left: storiesRefs.current[activeStoryCardIndex]?.offsetWidth * activeStoryCardIndex,
        behavior: firstTimeRendering.current ? "instant" : "smooth", 
      });

      if (firstTimeRendering.current) {
        firstTimeRendering.current = false;
      }
    }
  }, [activeStoryCardIndex, active]);

  const goToPreviousStory = useCallback(() => {
    setStoryTimer(0);

    if (activeStoryCardIndex === 0) {
      goToPreviousStoryGroup!();
      return;
    }
    setActiveStoryCardIndex(activeStoryCardIndex - 1);
  }, [activeStoryCardIndex, goToPreviousStoryGroup]);

  const goToNextStory = useCallback(() => {
    if (activeStoryCardIndex === storiesRefs.current.length - 1 && isLastGroup) {
      window.location.href = "/";
      return;
    }

    setStoryTimer(0);

    if (activeStoryCardIndex === storiesRefs.current.length - 1) {
      setActiveStoryCardIndex(0);
      goToNextStoryGroup!();
      return;
    }

    setActiveStoryCardIndex(activeStoryCardIndex + 1);
  }, [activeStoryCardIndex, goToNextStoryGroup, isLastGroup]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const timer = setInterval(() => {
      if (storyTimer < 100) {
        setStoryTimer((storyTimer) => storyTimer + 100 / (STORY_DURATION / timerResolution));
      } else {
        goToNextStory();
        clearInterval(timer);
      }
    }, timerResolution);

    return () => clearInterval(timer);
  }, [storyTimer, goToNextStory, active]);

  function navigateIfSmallScreen(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (window.innerWidth > Constants.SMALL_BREAKPOINT_WIDTH) {
      return;
    }

    let elementRect = event.currentTarget.getBoundingClientRect();
    let centerX = elementRect.left + elementRect.width / 2;
    let clickX = event.clientX;

    if (clickX > centerX) {
      goToNextStory();
    } else {
      goToPreviousStory();
    }
  }

  function onClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (active) {
      return;
    }

    setActiveStoryCardIndex(0);
    setStoryTimer(0);
    selectMyself!();
  }

  return (
    <div className={`mx-auto flex h-full w-fit flex-row items-center gap-4 ${!active ? "opacity-50" : ""}`} onClick={onClick} ref={ref}>
      {active && <PreviousArrow extraClasses={`invisible ${activeStoryCardIndex !== 0 || !isFirstGroup ? "sm:visible" : ""}`} onClick={goToPreviousStory} />}
      <div className="flex aspect-[9/16] h-full flex-col rounded-md bg-black text-center">
        {active && <ProgressBar storyCount={children ? children.length : 0} activeStoryIndex={activeStoryCardIndex} progress={storyTimer}/>}
        {thumbnail && title && <Header active={active!} thumbnail={thumbnail} title={title} />}
        <div ref={storiesContainerRef} className="flex flex-1 snap-x flex-row overflow-x-hidden rounded-md" onClick={navigateIfSmallScreen}>
          {children?.map((child, index) => {
            return React.cloneElement(child as React.ReactElement<any>, {
              ref: (el: HTMLDivElement) => {
                storiesRefs.current[index] = el;
              },
              key: index,
            });
          })}
        </div>
        {active && <BottomBar />}
      </div>
      {active && <NextArrow extraClasses={"invisible sm:visible"} onClick={goToNextStory} />}
    </div>
  );
});

CardsLayout.displayName = "CardsLayout";
export default CardsLayout;
