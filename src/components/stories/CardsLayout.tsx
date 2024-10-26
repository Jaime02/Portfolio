"use client";
import React, { useState, useRef, forwardRef, useEffect, useCallback, useImperativeHandle } from "react";
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
  floatingHeader?: boolean;
  videoRefs?: React.MutableRefObject<(HTMLVideoElement)[]>;
  setActiveStoryCardIndex?: React.Dispatch<React.SetStateAction<number>>;
  selectMyself?: () => void;
  goToPreviousStoryGroup?: () => void;
  goToNextStoryGroup?: () => void;
}

const CardsLayout = forwardRef<HTMLDivElement, CardsLayoutProps>(
  ({ children, storyGroup, active, isFirstGroup, isLastGroup, activeStoryCardIndex, font, floatingHeader = false, videoRefs, setActiveStoryCardIndex, selectMyself, goToPreviousStoryGroup, goToNextStoryGroup }, forwardedRef) => {
    
    const ref = useRef<HTMLInputElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);

    let cards = React.Children.toArray(children);
    const storiesContainerRef = useRef<HTMLDivElement>(null);
    const storiesRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [storyTimer, setStoryTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [mouseDownTime, setMouseDownTime] = useState<number>(0);
  
    const [currentVideoRef, setCurrentVideoRef] = useState<HTMLVideoElement | null>(null);
  
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


    // Play current video observer
    useEffect(() => {
      if (!active || !(videoRefs?.current)) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
              let video = entry.target as HTMLVideoElement;
              setCurrentVideoRef(video);
              video.currentTime = 0;
              video.play();
            }
          });
        },
        { root: ref.current, threshold: 0.8 },
      );
  
      videoRefs.current.forEach((video) => observer.observe(video));
  
      return () => observer.disconnect();
    }, [active, videoRefs]);
  
    // Pause the video when the tab is not active
    useEffect(() => {
      if (!active && currentVideoRef) {
        currentVideoRef.pause();
      }
    }, [active, currentVideoRef]);

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

    function navigationMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      if (!active) {
        return;
      }
      setMouseDownTime(Date.now());
      setTimerRunning(false);
    }

    function selectThisGroup() {
      if (active) {
        return;
      }
      setActiveStoryCardIndex!(0);
      setStoryTimer(0);
      selectMyself!();
    }

    function navigationMouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
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
      <div
        className={`flex h-full max-w-full flex-row items-center sm:gap-4 ${!active ? "scale-50 opacity-50" : ""} transition-transform duration-300 ease-in-out ${font ? font : ""}`}
        onMouseUp={selectThisGroup}
        ref={ref}
      >
        {<PreviousArrow extraClasses={`sm:shrink-0 invisible ${active && (activeStoryCardIndex !== 0 || !isFirstGroup) ? "sm:visible" : ""}`} onClick={goToPreviousStory} />}
        <div className={`${floatingHeader ? "relative" : ""} overflow-hidden flex flex-col aspect-[9/16] h-full max-h-full max-w-full rounded-md bg-black ${!active ? "pointer-events-none" : ""}`}>
          <div className={`${floatingHeader ? "absolute z-20 w-full p-2" : ""}`}>
            {active && <ProgressBar storyCount={cards.length} activeStoryIndex={activeStoryCardIndex!} progress={storyTimer} floatingHeader={floatingHeader!} />}
            <Header active={active!} storyGroup={storyGroup!} timerRunning={timerRunning} setTimerRunning={setTimerRunning} floatingHeader={floatingHeader!} />
          </div>
          <div
            ref={storiesContainerRef}
            className={`${floatingHeader ? "absolute h-full w-full" : ""} flex min-w-full max-w-full flex-1 snap-x flex-row gap-2 overflow-x-hidden`}
            onMouseDown={navigationMouseDown}
            onMouseUp={navigationMouseUp}
          >
            {cards.map((child, index) => {
              return React.cloneElement(child as React.ReactElement<any>, {
                ref: (el: HTMLDivElement) => {
                  storiesRefs.current[index] = el;
                },
                key: index,
                padding: !floatingHeader,
              });
            })}
          </div>
          {active && <BottomBar floatingHeader={floatingHeader!} />}
        </div>
        {<NextArrow extraClasses={`sm:shrink-0 invisible ${active ? "sm:visible" : ""}`} onClick={goToNextStory} />}
      </div>
    );
  },
);

CardsLayout.displayName = "CardsLayout";
export default CardsLayout;
