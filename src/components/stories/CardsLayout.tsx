"use client";
import React, { useState, useRef, forwardRef, useEffect, useCallback, useImperativeHandle, useLayoutEffect, useContext, useMemo } from "react";
import BottomBar from "@/components/stories/BottomBar";
import Header from "@/components/stories/Header";
import * as Constants from "@/misc/Constants";
import ProgressBar from "@/components/stories/ProgressBar";
import useOnWindowResize from "@/hooks/useOnWindowResize";
import { StoryGroupContext } from "@/app/lib/StoryGroupContext";
import { StoryGroupsContext } from "@/app/lib/StoryGroupsContext";
import GoToPreviousStoryArrow from "@/components/stories/GoToPreviousStoryArrow";
import GoToNextStoryArrow from "@/components/stories/GoToNextStoryArrow";
import { SettingsContext } from "@/app/lib/SettingsContext";
import { usePathname } from "@/translations/routing";
import { StoriesContext } from "@/app/lib/StoriesContext";

export interface CardsLayoutProps {
  children?: React.ReactNode[] | React.ReactNode;
  hash?: number;
  font?: string;
  floatingHeader?: boolean;
}

const CardsLayout = forwardRef<HTMLDivElement, CardsLayoutProps>(({ children, font, floatingHeader = false }, forwardedRef) => {
  const ref = useRef<HTMLInputElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);

  let cards = React.Children.toArray(children);
  let storiesCount = cards.length;

  const { router } = useContext(StoriesContext);
  const pathname = usePathname();
  const { inLastGroup, goToNextStoryGroup, goToPreviousStoryGroup, setActiveStoryGroupIndex } = useContext(StoryGroupsContext);
  const { active, storyGroupIndex } = useContext(StoryGroupContext);
  const { pausedStories, setTemporalPause } = useContext(SettingsContext);

  const storiesContainerRef = useRef<HTMLDivElement>(null);
  const storiesRefs = useRef<HTMLDivElement[]>([]);
  const currentVideoRef = useRef<HTMLVideoElement | null>(null);
  
  function parseLocationHash(): number {
    const hashNumber = parseInt(window.location.hash.slice(1), 10);
    return isNaN(hashNumber) ? 0 : hashNumber;
  }

  const [storyTimer, setStoryTimer] = useState(0);
  const [mouseDownTime, setMouseDownTime] = useState<number>(0);
  const [storyDuration, setStoryDuration] = useState(5000);
  const [hash, setHash] = useState(() => (!active || parseLocationHash() > storiesCount - 1 ? 0 : parseLocationHash()));

  const updateLayoutOffset = useCallback(() => {
    if (!storiesContainerRef.current || !storiesRefs.current[hash] || !active) {
      return 0;
    }

    const storyWidth = storiesRefs.current[hash].offsetWidth;
    const containerWidth = storiesContainerRef.current.offsetWidth;
    let offset = containerWidth / 2 - storyWidth / 2 - hash * storyWidth - hash * 8;
    storiesContainerRef.current.style.transform = `translateX(${offset}px)`;
  }, [active, hash]);

  const goToPreviousStory = useCallback((event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event?.stopPropagation();
    if (hash === 0) {
      goToPreviousStoryGroup();
      return;
    }

    setStoryTimer(0);
    setHash(hash - 1);
  }, [hash, setHash, goToPreviousStoryGroup]);

  const goToNextStory = useCallback(async (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event?.stopPropagation();
    if (hash === storiesCount - 1 && inLastGroup) {
      // Go back to the main page
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      router.back();
      return;
    }

    setStoryTimer(0);

    if (hash === storiesCount - 1) {
      setHash(0);
      goToNextStoryGroup();
      return;
    }

    setHash(hash + 1);
  }, [router, hash, storiesCount, inLastGroup, goToNextStoryGroup]);

  useOnWindowResize(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  useLayoutEffect(() => {
    if (!active) {
      return;
    }

    updateLayoutOffset();
    // If a hash greater than the number of stories is provided, replace the hash with 0
    if (parseLocationHash() > storiesCount - 1) {
      router.replace(pathname);
    }
  }, [active, pathname, router, storiesCount, updateLayoutOffset]);

  // Story changed effect
  useEffect(() => {
    updateLayoutOffset();

    if (!storiesRefs.current[hash] || !active) {
      return;
    }
    
    // Pause the previous video if existing
    currentVideoRef.current?.pause();
    
    let videoElement = storiesRefs.current[hash];
    let video = videoElement.querySelector("video");
    currentVideoRef.current = video;
    if (video) {
      video.currentTime = 0;
      video.onloadedmetadata = () => {
        setStoryDuration(video.duration * 1000);
      };
      if (!pausedStories) {
        video.play().catch((err) => {});
      }
    } else {
      setStoryDuration(Constants.DEFAULT_STORY_DURATION);
    }
  }, [active, hash, updateLayoutOffset]);

  // Pause the video when active or pausedStories changes
  useEffect(() => {
    if (!active) {
      if (currentVideoRef.current) {
        currentVideoRef.current.pause();
      }
      return;
    }

    if (pausedStories) {
      currentVideoRef.current?.pause();
    } else {
      currentVideoRef.current?.play().catch((err) => {});
    }
  }, [active, pausedStories]);

  // Story timer effect
  useEffect(() => {
    if (!active) {
      return;
    }

    const timer = setInterval(() => {
      if (pausedStories) {
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
  }, [storyDuration, storyTimer, goToNextStory, active, pausedStories]);

  // Animate the scroll only after the component has been mounted. Avoid animating the scroll on page render
  useEffect(() => {
    storiesContainerRef.current!.setAttribute("data-animate", "");
  }, []);

  // Synchronize the hash with the window.location.hash
  useEffect(() => {
    if (!active) {
      return;
    }
    
    if (hash === 0) {
      router.replace(pathname);
    } else {
      router.replace(`${pathname}#${hash}`);
    }
  }, [active, hash, pathname, router]);

  function navigateIfSmallScreen(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (window.innerWidth > Constants.SMALL_BREAKPOINT_WIDTH) {
      return;
    }

    let elementRect = event.currentTarget.getBoundingClientRect();
    let centerX = elementRect.left + elementRect.width / 2;
    let clickX = event.clientX;

    if (clickX > centerX) {
      goToNextStory(event);
    } else {
      goToPreviousStory(event);
    }
  }
  
  function selectThisGroup() {
    if (active) {
      return;
    }

    currentVideoRef.current?.pause();
    setStoryTimer(0);
    setHash(0);
    setActiveStoryGroupIndex(storyGroupIndex);
  }

  function navigationMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!active) {
      return;
    }

    setMouseDownTime(Date.now());
    setTemporalPause(true);
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
    setTemporalPause(false);
  }

  return (
    <div
      className={`flex h-full max-w-full flex-row items-center sm:gap-4 ${!active ? "scale-50 opacity-50" : ""} transition-transform duration-300 ease-in-out ${font ? font : ""}`}
      onMouseUp={selectThisGroup}
      ref={ref}
    >
      <GoToPreviousStoryArrow onClick={goToPreviousStory} />
      <div className={`${floatingHeader ? "relative" : ""} flex aspect-[9/16] h-full max-h-full max-w-full flex-col overflow-x-hidden rounded-md bg-black ${!active ? "pointer-events-none" : ""}`}>
        <div className={`${floatingHeader ? "absolute z-20 w-full" : ""} flex flex-col gap-2 p-2`}>
          {active && <ProgressBar storyCount={storiesCount} activeStoryIndex={hash} progress={storyTimer} />}
          <Header floatingHeader={floatingHeader!} />
        </div>
        <div
          ref={storiesContainerRef}
          className={`${floatingHeader ? "h-full w-full" : ""} flex min-h-0 grow flex-row items-center gap-2 data-[animate]:transition-transform data-[animate]:duration-500`}
        >
          {cards.map((child, index) =>
            React.cloneElement(child as React.ReactElement<any>, {
              ref: (el: HTMLDivElement) => (storiesRefs.current[index] = el),
              key: index,
              active: active && hash === index,
              padding: !floatingHeader,
              onMouseDown: navigationMouseDown,
              onMouseUp: navigationMouseUp,
            }),
          )}
        </div>
        {active && !floatingHeader && <BottomBar floatingHeader={floatingHeader!} />}
      </div>
      <GoToNextStoryArrow onClick={goToNextStory} /> 
    </div>
  );
});

CardsLayout.displayName = "CardsLayout";
export default CardsLayout;
