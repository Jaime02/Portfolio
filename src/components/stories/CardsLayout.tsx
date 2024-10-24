"use client";
import React, { useState, useRef, forwardRef, useEffect, useCallback } from "react";
import NextArrow from "@/icons/NextArrow";
import PreviousArrow from "@/icons/PreviousArrow";
import BottomBar from "@/components/stories/BottomBar";
import Header from "@/components/stories/Header";
import * as Constants from "@/misc/Constants";
import ProgressBar from "@/components/stories/ProgressBar";
import { StoryGroup } from "@/misc/Constants";

export interface CardsLayoutProps {
  children?: React.ReactNode[] | React.ReactNode;
  storyGroup?: StoryGroup;
  active?: boolean;
  isFirstGroup?: boolean;
  isLastGroup?: boolean;
  activeStoryCardIndex?: number;
  font?: string;
  setActiveStoryCardIndex?: React.Dispatch<React.SetStateAction<number>>;
  selectMyself?: () => void;
  goToPreviousStoryGroup?: () => void;
  goToNextStoryGroup?: () => void;
}

const CardsLayout = forwardRef<HTMLDivElement, CardsLayoutProps>(
  ({ children, storyGroup, active, isFirstGroup, isLastGroup, activeStoryCardIndex, font, setActiveStoryCardIndex, selectMyself, goToPreviousStoryGroup, goToNextStoryGroup }, ref) => {
    let cards = React.Children.toArray(children);
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
          setStoryTimer((storyTimer) => storyTimer + 100 / (Constants.STORY_DURATION / Constants.TIMER_RESOLUTION));
        } else {
          goToNextStory();
          clearInterval(timer);
        }
      }, Constants.TIMER_RESOLUTION);

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
      // Ignore other mouse keys except left click
      if (event.button !== 0) {
        return;
      }

      const mousePressDuration = Date.now() - mouseDownTime;
      if (mousePressDuration < Constants.MOUSE_PRESS_DURATION_THRESHOLD) {
        navigateIfSmallScreen(event);
      }

      setMouseDownTime(0);
      setTimerRunning(true);
    }

    return (
      <div className={`flex h-full max-w-min flex-row items-center sm:gap-4 ${!active ? "scale-50 opacity-50" : ""} transition-transform duration-300 ease-in-out ${font ? `font-${font}` : ""}`} ref={ref}>
        {<PreviousArrow extraClasses={`sm:shrink-0 invisible ${active && (activeStoryCardIndex !== 0 || !isFirstGroup) ? "sm:visible" : ""}`} onClick={goToPreviousStory} />}
        <div className="flex aspect-[9/16] overflow-hidden h-full max-h-full max-w-full flex-col rounded-md bg-black">
          {active && <ProgressBar storyCount={cards.length} activeStoryIndex={activeStoryCardIndex!} progress={storyTimer} />}
          <Header active={active!} storyGroup={storyGroup!} timerRunning={timerRunning} setTimerRunning={setTimerRunning} />
          <div ref={storiesContainerRef} className="flex flex-1 min-w-full max-w-full snap-x flex-row gap-2 overflow-x-hidden" onMouseDown={mouseDown} onMouseUp={mouseUp}>
            {cards.map((child, index) => {
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
        {<NextArrow extraClasses={`sm:shrink-0 invisible ${active ? "sm:visible" : ""}`} onClick={goToNextStory} />}
      </div>
    );
  },
);

CardsLayout.displayName = "CardsLayout";
export default CardsLayout;
