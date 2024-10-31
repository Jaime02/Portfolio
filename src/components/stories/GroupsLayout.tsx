"use client";
import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef } from "react";
import useOnWindowResize from "@/misc/useOnWindowResize";
import { StoryGroupsContext } from "@/components/stories/StoryGroupsContext";
import { StoryGroup } from "@/misc/Constants";
import { StoryGroupContextProvider } from "@/components/stories/StoryGroupContext";

export default function GroupsLayout() {
  const { activeStoryGroup, storyCategory, activeStoryGroupIndex } = useContext(StoryGroupsContext);

  const storyGroupsRefs = useRef<HTMLDivElement[]>([]);
  const groupsLayoutContainerRef = useRef<HTMLDivElement | null>(null);
  const groupsLayoutRef = useRef<HTMLDivElement | null>(null);

  const updateLayoutOffset = useCallback(() => {
    if (!groupsLayoutContainerRef.current || !storyGroupsRefs.current[activeStoryGroupIndex]) {
      return 0;
    }

    const storyWidth = storyGroupsRefs.current[activeStoryGroupIndex].offsetWidth;
    const containerWidth = groupsLayoutContainerRef.current.offsetWidth;
    let offset = containerWidth / 2 - storyWidth / 2 - activeStoryGroupIndex * storyWidth;
    groupsLayoutRef.current!.style.transform = `translateX(${offset}px)`;
  }, [activeStoryGroupIndex]);

  useOnWindowResize(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  useEffect(() => {
    window.history.replaceState(null, "", activeStoryGroup.getFullUrl());
    updateLayoutOffset();
  }, [activeStoryGroup, updateLayoutOffset]);

  useEffect(() => {
    // Animate the scroll only after the component has been mounted. Avoid animating the scroll on page render
    groupsLayoutRef.current!.setAttribute("data-animate", "");
  }, []);

  useLayoutEffect(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  return (
    <div ref={groupsLayoutContainerRef} className="flex h-dvh max-h-dvh w-full max-w-full flex-col justify-center overflow-hidden bg-black px-2 py-1 sm:bg-[#1a1a1a] sm:py-3">
      <div ref={groupsLayoutRef} className="flex h-full max-h-full flex-row data-[animate]:transition-transform data-[animate]:duration-500">
        {storyCategory.storyGroups.map((storyGroup: StoryGroup, storyGroupIndex: number) => (
          <StoryGroupContextProvider storyGroupIndex={storyGroupIndex!} storyGroup={storyGroup!} key={storyGroupIndex}>
            {React.cloneElement(storyGroup.component, {
              ref: (el: HTMLDivElement) => (storyGroupsRefs.current[storyGroupIndex] = el),
              storyGroupIndex: storyGroupIndex,
            })}
          </StoryGroupContextProvider>
        ))}
      </div>
    </div>
  );
}
