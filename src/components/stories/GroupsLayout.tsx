"use client";
import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef } from "react";
import useOnWindowResize from "@/hooks/useOnWindowResize";
import { StoryGroupContextProvider } from "@/app/lib/StoryGroupContext";
import { StoryGroupsContext } from "@/app/lib/StoryGroupsContext";
import { StoryGroup } from "@/components/stories/StoryGroup";
import * as Constants from "@/misc/Constants";

export default function GroupsLayout() {
  const { activeStoryCategory, activeStoryGroupIndex } = useContext(StoryGroupsContext);

  const storyGroupsRefs = useRef<HTMLDivElement[]>([]);
  const groupsLayoutContainerRef = useRef<HTMLDivElement | null>(null);
  const groupsLayoutRef = useRef<HTMLDivElement | null>(null);

  const updateLayoutOffset = useCallback(() => {
    if (!groupsLayoutContainerRef.current || !storyGroupsRefs.current[activeStoryGroupIndex]) {
      return 0;
    }

    const storyWidth = storyGroupsRefs.current[activeStoryGroupIndex].offsetWidth;
    const containerWidth = groupsLayoutContainerRef.current.offsetWidth;
    // 8 because of the px-2 of the main container
    // 80 because of the arrows indicators of the card layout
    let buttonsOffset = window.innerWidth > Constants.SMALL_BREAKPOINT_WIDTH ? (- 8 + 80 * activeStoryGroupIndex) : 0;
    let offset = containerWidth / 2 - storyWidth / 2 - activeStoryGroupIndex * storyWidth + buttonsOffset - 8;
    groupsLayoutRef.current!.style.transform = `translateX(${offset}px)`;
  }, [activeStoryGroupIndex]);

  useOnWindowResize(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  useEffect(() => {
    updateLayoutOffset();
  }, [activeStoryGroupIndex, updateLayoutOffset]);

  useEffect(() => {
    // Animate the scroll only after the component has been mounted. Avoid animating the scroll on page render
    groupsLayoutRef.current!.setAttribute("data-animate", "");
  }, []);

  useLayoutEffect(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  return (
    <main role="main" ref={groupsLayoutContainerRef} className="flex h-dvh max-h-dvh w-full max-w-full flex-col justify-center overflow-hidden bg-black px-2 py-1 sm:bg-[#1a1a1a] sm:py-3">
      <div ref={groupsLayoutRef} className="flex h-full max-h-full flex-row data-[animate]:transition-transform data-[animate]:duration-500">
        {activeStoryCategory.storyGroups.map((storyGroup: StoryGroup, storyGroupIndex: number) => (
          <StoryGroupContextProvider key={storyGroupIndex} storyGroup={storyGroup!} storyGroupIndex={storyGroupIndex!}>
            {React.cloneElement(storyGroup.component, {
              ref: (el: HTMLDivElement) => (storyGroupsRefs.current[storyGroupIndex] = el),
            })}
          </StoryGroupContextProvider>
        ))}
      </div>
    </main>
  );
}
