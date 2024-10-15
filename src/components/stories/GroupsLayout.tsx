"use client";
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { StoryCategory } from "@/misc/Constants";
import { motion } from "framer-motion";
import useOnWindowResize from "@/misc/useOnWindowResize";

interface Props {
  initialStoryGroupUrl?: string;
  storyCategory: StoryCategory;
}

export default function GroupsLayout({ initialStoryGroupUrl, storyCategory }: Props) {
  const storyGroupsRefs = useRef<HTMLDivElement[]>([]);
  const groupsLayoutContainerRef = useRef<HTMLDivElement | null>(null);
  const groupsLayoutRef = useRef<HTMLDivElement | null>(null);

  let initialGroupIndex: number = 0;
  if (initialStoryGroupUrl) {
    initialGroupIndex = Math.max(
      storyCategory.storyGroups.findIndex((storyGroup) => storyGroup.getGroupUrl() === initialStoryGroupUrl),
      0,
    );
  }

  const [activeStoryGroupIndex, setActiveStoryGroupIndex] = useState(initialGroupIndex);

  const initialStoryCardIndex = Number(window.location.hash.substring(1));
  const [activeStoryCardIndex, setActiveStoryCardIndex] = useState(initialStoryCardIndex);

  const updateLayoutOffset = useCallback(() => {
    if (!groupsLayoutContainerRef.current || !storyGroupsRefs.current[activeStoryGroupIndex]) {
      return 0;
    }
    const storyWidth = storyGroupsRefs.current[activeStoryGroupIndex].offsetWidth;
    const containerWidth = groupsLayoutContainerRef.current.offsetWidth;
    let offset = containerWidth / 2 - storyWidth / 2 - activeStoryGroupIndex * storyWidth;
    groupsLayoutRef.current!.style.transform = ` translateX(${offset}px)`;
  }, [activeStoryGroupIndex]);

  useOnWindowResize(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  useEffect(() => {
    // Update URL depending on active story group
    window.history.replaceState(null, "", storyCategory.storyGroups[activeStoryGroupIndex].getFullUrl() + window.location.hash);
    updateLayoutOffset();
  }, [activeStoryGroupIndex, storyCategory.storyGroups, updateLayoutOffset]);

  useLayoutEffect(() => {
    updateLayoutOffset();
  }, [updateLayoutOffset]);

  const goToNextStoryGroup = useCallback(() => {
    // Animate the scroll only after the first click. Avoid animating the scroll on page render
    groupsLayoutRef.current!.setAttribute("data-animate", "");
    
    if (activeStoryGroupIndex === storyGroupsRefs.current.length - 1) {
      window.location.href = "/";
      return;
    }

    setActiveStoryGroupIndex(activeStoryGroupIndex + 1);
  }, [activeStoryGroupIndex]);

  const goToPreviousStoryGroup = useCallback(() => {
    // Animate the scroll only after the first click. Avoid animating the scroll on page render
    groupsLayoutRef.current!.setAttribute("data-animate", "");

    if (activeStoryGroupIndex === 0) {
      window.location.href = "/";
      return;
    }

    setActiveStoryGroupIndex(activeStoryGroupIndex - 1);
  }, [activeStoryGroupIndex]);

  return (
    <div ref={groupsLayoutContainerRef} className="flex h-dvh max-h-dvh w-full flex-col justify-center overflow-clip bg-black pt-2 sm:bg-[#1a1a1a] sm:py-8">
      <div ref={groupsLayoutRef} className="flex h-full max-h-full w-max max-w-none flex-row data-[animate]:transition-transform data-[animate]:duration-500">
        {storyCategory.storyGroups.map((storyGroup, index) => {
          return (
            <motion.div
              key={index}
              animate={{
                scale: activeStoryGroupIndex === index ? 1 : 0.5,
              }}
              className=""
              initial={false}
              transition={{ type: "tween", ease: "easeInOut" }}
            >
              {React.cloneElement(storyGroup.component, {
                ref: (el: HTMLDivElement) => (storyGroupsRefs.current[index] = el),
                storyGroup: storyGroup,
                active: index === activeStoryGroupIndex,
                isFirstGroup: index === 0,
                isLastGroup: index === storyGroupsRefs.current.length - 1,
                activeStoryCardIndex: activeStoryCardIndex,
                setActiveStoryCardIndex: setActiveStoryCardIndex,
                selectMyself: () => {
                  groupsLayoutRef.current!.setAttribute("data-animate", "");
                  setActiveStoryGroupIndex(index);
                },
                goToPreviousStoryGroup: goToPreviousStoryGroup,
                goToNextStoryGroup: goToNextStoryGroup,
              })}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
