"use client";
import React, { useState, useRef, forwardRef, useEffect, useCallback, useImperativeHandle, useLayoutEffect, useContext } from "react";
import NextArrow from "@/icons/NextArrow";
import PreviousArrow from "@/icons/PreviousArrow";
import BottomBar from "@/components/stories/BottomBar";
import Header from "@/components/stories/Header";
import * as Constants from "@/misc/Constants";
import ProgressBar from "@/components/stories/ProgressBar";
import { StoryGroup } from "@/misc/Constants";
import useOnWindowResize from "@/misc/useOnWindowResize";
import { StoryGroupContext, StoryGroupContextProvider } from "@/components/stories/StoryGroupContext";
import { StoryGroupsContext } from "@/components/stories/StoryGroupsContext";

export interface CardsLayoutProps {
  children?: React.ReactNode[] | React.ReactNode;
  storyGroup?: StoryGroup;
  storyGroupIndex?: number;
  font?: string;
  floatingHeader?: boolean;
}

const CardsLayout = forwardRef<HTMLDivElement, CardsLayoutProps>(({ children, storyGroup, storyGroupIndex, font, floatingHeader = false }, forwardedRef) => {
  const ref = useRef<HTMLInputElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);
  const { inFirstGroup, setActiveStoryGroupIndex, goToNextStoryGroup, goToPreviousStoryGroup, inLastGroup, paused, setPaused } = useContext(StoryGroupsContext);
  const { active, activeStoryCardIndex, setActiveStoryCardIndex } = useContext(StoryGroupContext);

  let cards = React.Children.toArray(children);
  let storiesCount = cards.length;

  const storyGroupContainer = useRef<HTMLDivElement>(null);
  const storiesContainerRef = useRef<HTMLDivElement>(null);
  const storiesRefs = useRef<HTMLDivElement[]>([]);
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);

  const [storyTimer, setStoryTimer] = useState(0);
  const [mouseDownTime, setMouseDownTime] = useState<number>(0);
  const [storyDuration, setStoryDuration] = useState(5000);

  const updateLayoutOffset = useCallback(() => {
    if (!storiesContainerRef.current || !storiesRefs.current[activeStoryCardIndex]) {
      return 0;
    }

    const storyWidth = storiesRefs.current[activeStoryCardIndex].offsetWidth;
    const containerWidth = storiesContainerRef.current.offsetWidth;
    let offset = containerWidth / 2 - storyWidth / 2 - activeStoryCardIndex * storyWidth - activeStoryCardIndex * 8;
    storiesContainerRef.current.style.transform = `translateX(${offset}px)`;
  }, [activeStoryCardIndex]);

  const goToPreviousStory = useCallback(() => {
    if (activeStoryCardIndex === 0) {
      goToPreviousStoryGroup();
      return;
    }

    setStoryTimer(0);
    setActiveStoryCardIndex(activeStoryCardIndex - 1);
  }, [activeStoryCardIndex, setActiveStoryCardIndex, goToPreviousStoryGroup]);

  const goToNextStory = useCallback(() => {
    if (activeStoryCardIndex === storiesCount - 1 && inLastGroup) {
      window.location.href = "/";
      return;
    }
    setStoryTimer(0);

    if (activeStoryCardIndex === storiesCount - 1) {
      setActiveStoryCardIndex(0);
      goToNextStoryGroup();
      return;
    }

    setActiveStoryCardIndex(activeStoryCardIndex + 1);
  }, [activeStoryCardIndex, storiesCount, inLastGroup, setActiveStoryCardIndex, goToNextStoryGroup]);

  useOnWindowResize(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  useLayoutEffect(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  // Story changed effect
  useEffect(() => {
    updateLayoutOffset();

    if (!storiesRefs.current[activeStoryCardIndex] || !active) {
      return;
    }

    let videoElement = storiesRefs.current[activeStoryCardIndex];
    let video = videoElement.querySelector("video");
    currentVideoRef.current = video;
    if (video) {
      video.currentTime = 0;
      video.onloadedmetadata = () => {
        setStoryDuration(video.duration * 1000);
      }
    }
  }, [active, activeStoryCardIndex, updateLayoutOffset]);

  // Pause the video when the tab is not active
  useEffect(() => {
    if (!active && currentVideoRef.current) {
      currentVideoRef.current.pause();
      setPaused(true);
    }
  }, [active, setPaused]);

  useEffect(() => {
    if (!active) {
      return;
    }

    if (paused) {
      currentVideoRef.current?.pause();
    } else {
      currentVideoRef.current?.play();
    }
  }, [active, paused]);

  // Story timer effect
  useEffect(() => {
    if (!active) {
      return;
    }

    const timer = setInterval(() => {
      if (paused) {
        return;
      }

      if (storyTimer < 100) {
        setStoryTimer((storyTimer) => storyTimer + 100 / (storyDuration / Constants.TIMER_RESOLUTION));
      } else {
        goToNextStory();
        clearInterval(timer);
      }
    }, Constants.TIMER_RESOLUTION);

    return () => clearInterval(timer);
  }, [storyDuration, storyTimer, goToNextStory, active, paused]);

  // Animate the scroll only after the component has been mounted. Avoid animating the scroll on page render
  useEffect(() => {
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
    setPaused(true);
  }

  function selectThisGroup() {
    if (active) {
      return;
    }
    // Pause the previous video if existing
    currentVideoRef.current?.pause();
    setStoryTimer(0);
    setActiveStoryCardIndex(0);
    setActiveStoryGroupIndex(storyGroupIndex);
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
    setPaused(false);
  }

  return (
    <div
      className={`flex h-full max-w-full flex-row items-center sm:gap-4 ${!active ? "scale-50 opacity-50" : ""} transition-transform duration-300 ease-in-out ${font ? font : ""}`}
      onMouseUp={selectThisGroup}
      ref={ref}
    >
      {<PreviousArrow extraClasses={`sm:shrink-0 invisible ${active && (activeStoryCardIndex !== 0 || !inFirstGroup) ? "sm:visible" : ""}`} onClick={goToPreviousStory} />}
      <div
        ref={storyGroupContainer}
        className={`${floatingHeader ? "relative" : ""} flex overflow-x-hidden aspect-[9/16] h-full max-h-full max-w-full flex-col rounded-md bg-black ${!active ? "pointer-events-none" : ""}`}
      >
        <div className={`${floatingHeader ? "absolute z-20 w-full" : ""} p-2 flex flex-col gap-2`}>
          {active && <ProgressBar storyCount={storiesCount} activeStoryIndex={activeStoryCardIndex} progress={storyTimer} />}
          <Header floatingHeader={floatingHeader!} />
        </div>
        <div
          ref={storiesContainerRef}
          className={`${floatingHeader ? "h-full w-full" : ""} flex min-w-full flex-1 snap-x flex-row items-center gap-2 data-[animate]:transition-transform data-[animate]:duration-500 overflow-y-auto`}
        >
          {cards.map((child, index) =>
            React.cloneElement(child as React.ReactElement<any>, {
              ref: (el: HTMLDivElement) => (storiesRefs.current[index] = el),
              key: index,
              padding: !floatingHeader,
              onMouseDown: navigationMouseDown,
              onMouseUp: navigationMouseUp
            }),
          )}
        </div>
        {active && <BottomBar floatingHeader={floatingHeader!} />}
      </div>
      {<NextArrow extraClasses={`sm:shrink-0 invisible ${active ? "sm:visible" : ""}`} onClick={goToNextStory} />}
    </div>
  );
});

CardsLayout.displayName = "CardsLayout";
export default CardsLayout;
