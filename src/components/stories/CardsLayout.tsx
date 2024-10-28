"use client";
import React, { useState, useRef, forwardRef, useEffect, useCallback, useImperativeHandle, useLayoutEffect } from "react";
import NextArrow from "@/icons/NextArrow";
import PreviousArrow from "@/icons/PreviousArrow";
import BottomBar from "@/components/stories/BottomBar";
import Header from "@/components/stories/Header";
import * as Constants from "@/misc/Constants";
import ProgressBar from "@/components/stories/ProgressBar";
import { StoryGroup } from "@/misc/Constants";
import useOnWindowResize from "@/misc/useOnWindowResize";

export interface CardsLayoutProps {
  children?: React.ReactNode[] | React.ReactNode;
  storyGroup?: StoryGroup;
  active?: boolean;
  isFirstGroup?: boolean;
  isLastGroup?: boolean;
  activeStoryCardIndex?: number;
  font?: string;
  floatingHeader?: boolean;
  setActiveStoryCardIndex?: React.Dispatch<React.SetStateAction<number>>;
  selectMyself?: () => void;
  goToPreviousStoryGroup?: () => void;
  goToNextStoryGroup?: () => void;
}

const CardsLayout = forwardRef<HTMLDivElement, CardsLayoutProps>(
  (
    { children, storyGroup, active, isFirstGroup, isLastGroup, activeStoryCardIndex, font, floatingHeader = false, setActiveStoryCardIndex, selectMyself, goToPreviousStoryGroup, goToNextStoryGroup },
    forwardedRef,
  ) => {
    const ref = useRef<HTMLInputElement>(null);
    useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);

    let cards = React.Children.toArray(children);
    const storyGroupContainer = useRef<HTMLDivElement>(null);
    const storiesContainerRef = useRef<HTMLDivElement>(null);
    const storiesRefs = useRef<HTMLDivElement[]>([]);

    const [storyTimer, setStoryTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [mouseDownTime, setMouseDownTime] = useState<number>(0);

    const currentVideoRef = useRef<HTMLVideoElement | null>(null);

    const updateLayoutOffset = useCallback(() => {
      if (!storiesContainerRef.current || !storiesRefs.current[activeStoryCardIndex!]) {
        return 0;
      }

      const storyWidth = storiesRefs.current[activeStoryCardIndex!].offsetWidth;
      const containerWidth = storiesContainerRef.current.offsetWidth;
      let offset = containerWidth / 2 - storyWidth / 2 - activeStoryCardIndex! * storyWidth - activeStoryCardIndex! * 8;
      storiesContainerRef.current.style.transform = ` translateX(${offset}px)`;
    }, [activeStoryCardIndex]);

    useOnWindowResize(() => {
      updateLayoutOffset();
    }, [updateLayoutOffset]);

    useEffect(() => {
      updateLayoutOffset();
    }, [activeStoryCardIndex, updateLayoutOffset]);

    useLayoutEffect(() => {
      updateLayoutOffset();
    }, [updateLayoutOffset]);

    // Play current video observer
    useEffect(() => {
      if (!active || !storiesRefs?.current) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            let story = entry.target as HTMLDivElement;
            let video = story.querySelector("video");
            if (!video) {
              return;
            }
            video.currentTime = 0;
            if (!entry.isIntersecting) {
              video.pause();
              return;
            }

            // Try to unmute the video
            video.muted = false;
            video
              .play()
              .catch((error) => {
                video.muted = true;
                video.play();
              });

            currentVideoRef.current = video;
          });
        },
        { root: storyGroupContainer.current, threshold: 0.5 },
      );

      storiesRefs.current.forEach((story) => {
        observer.observe(story);
      });

      return () => observer.disconnect();
    }, [active, storiesRefs]);

    // Pause the video when the tab is not active
    useEffect(() => {
      if (!active && currentVideoRef.current) {
        currentVideoRef.current.pause();
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

    useEffect(() => {
      // Animate the scroll only after the component has been mounted. Avoid animating the scroll on page render
      storiesContainerRef.current!.setAttribute("data-animate", "");
    }, []);

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
        <div
          ref={storyGroupContainer}
          className={`${floatingHeader ? "relative" : ""} flex aspect-[9/16] h-full max-h-full max-w-full flex-col overflow-hidden rounded-md bg-black ${!active ? "pointer-events-none" : ""}`}
        >
          <div className={`${floatingHeader ? "absolute z-20 w-full p-2" : ""}`}>
            {active && <ProgressBar storyCount={cards.length} activeStoryIndex={activeStoryCardIndex!} progress={storyTimer} floatingHeader={floatingHeader!} />}
            <Header active={active!} storyGroup={storyGroup!} timerRunning={timerRunning} setTimerRunning={setTimerRunning} floatingHeader={floatingHeader!} />
          </div>
          <div
            ref={storiesContainerRef}
            className={`${floatingHeader ? "h-full w-full" : ""} flex min-w-full max-w-full flex-1 snap-x flex-row gap-2 data-[animate]:transition-transform data-[animate]:duration-500`}
            onMouseDown={navigationMouseDown}
            onMouseUp={navigationMouseUp}
          >
            {cards.map((child, index) =>
              React.cloneElement(child as React.ReactElement<any>, {
                ref: (el: HTMLDivElement) => (storiesRefs.current[index] = el),
                key: index,
                padding: !floatingHeader,
              }),
            )}
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
