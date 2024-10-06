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
  activeStoryCardIndex?: number;
  setActiveStoryCardIndex?: React.Dispatch<React.SetStateAction<number>>;
  selectMyself?: () => void;
  goToPreviousStoryGroup?: () => void;
  goToNextStoryGroup?: () => void;
}

const STORY_DURATION = 60000;
const MOUSE_PRESS_DURATION_THRESHOLD = 200;
let TIMER_RESOLUTION = 50;

const CardsLayout = forwardRef<HTMLDivElement, CardsLayoutProps>(({ children, title, thumbnail, active, isFirstGroup, isLastGroup, activeStoryCardIndex, setActiveStoryCardIndex, selectMyself, goToPreviousStoryGroup, goToNextStoryGroup }, ref) => {
  const storiesContainerRef = useRef<HTMLDivElement>(null);
  const storiesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [storyTimer, setStoryTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [mouseDownTime, setMouseDownTime] = useState<number>(0);

  const firstTimeRendering = useRef(true);

  useEffect(() => {
    if (activeStoryCardIndex !== 0) {
      window.history.replaceState(null, "", `#${activeStoryCardIndex}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }

    if (active && storiesRefs.current[activeStoryCardIndex!]) {
      storiesContainerRef.current?.scrollTo({
        top: 0,
        left: storiesRefs.current[activeStoryCardIndex!]!.offsetWidth * activeStoryCardIndex!,
        behavior: firstTimeRendering.current ? "instant" : "smooth", 
      });

      if (firstTimeRendering.current) {
        firstTimeRendering.current = false;
      }
      
    }
  }, [activeStoryCardIndex, active]);

  const goToPreviousStory = useCallback(() => {
    if (activeStoryCardIndex === 0) {
      goToPreviousStoryGroup!();
      return;
    } 
    
    setStoryTimer(0);
    setActiveStoryCardIndex!(activeStoryCardIndex! - 1);
  }, [activeStoryCardIndex, setActiveStoryCardIndex, goToPreviousStoryGroup]);

  const goToNextStory = useCallback(() => {
    if (activeStoryCardIndex === storiesRefs.current.length - 1 && isLastGroup) {
      window.location.href = "/";
      return;
    }

    setStoryTimer(0);

    if (activeStoryCardIndex === storiesRefs.current.length - 1) {
      setActiveStoryCardIndex!(0);
      goToNextStoryGroup!();
      return;
    }

    setActiveStoryCardIndex!(activeStoryCardIndex! + 1);
  }, [activeStoryCardIndex, setActiveStoryCardIndex, goToNextStoryGroup, isLastGroup]);

  useEffect(() => {
    if (!active) {
      return;
    }

    const timer = setInterval(() => {
      if (!timerRunning) {
        return;
      }

      if (storyTimer < 100) {
        setStoryTimer((storyTimer) => storyTimer + 100 / (STORY_DURATION / TIMER_RESOLUTION));
      } else {
        goToNextStory();
        clearInterval(timer);
      }
    }, TIMER_RESOLUTION);

    return () => clearInterval(timer);
  }, [storyTimer, goToNextStory, active, timerRunning]);
  
  useEffect(() => {
    if (!active) {
      return;
    } 

    setTimerRunning(true);
  }, [active]);

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

  function mouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!active) {
      return;
    }
    setMouseDownTime(Date.now());
    setTimerRunning(false);
  }

  function mouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!active) {
      setActiveStoryCardIndex!(0);
      setStoryTimer(0);
      selectMyself!();
      return;
    }
  
    const mousePressDuration = Date.now() - mouseDownTime;
    if (mousePressDuration < MOUSE_PRESS_DURATION_THRESHOLD) {
      navigateIfSmallScreen(event);
    }

    setMouseDownTime(0);
    setTimerRunning(true);
  }
  
  return (
    <div className={`mx-auto flex h-full max-w-full w-fit flex-row items-center sm:gap-4 ${!active ? "opacity-50" : ""}`} ref={ref}>
      {active && <PreviousArrow extraClasses={`invisible ${activeStoryCardIndex !== 0 || !isFirstGroup ? "sm:visible" : ""}`} onClick={goToPreviousStory} />}
      <div className="flex aspect-[9/16] max-w-full h-full flex-col rounded-md bg-black text-center">
        {active && <ProgressBar storyCount={children ? children.length : 0} activeStoryIndex={activeStoryCardIndex!} progress={storyTimer}/>}
        {thumbnail && title && <Header active={active!} thumbnail={thumbnail} title={title} timerRunning={timerRunning} setTimerRunning={setTimerRunning} />}
        <div ref={storiesContainerRef} className="flex flex-1 snap-x flex-row overflow-x-hidden rounded-md" onMouseDown={mouseDown} onMouseUp={mouseUp}>
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
