"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StoryCategory } from "@/misc/Constants";
import { motion } from "framer-motion";

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

  const calculateOffset = useCallback(() => {
    if (!groupsLayoutContainerRef.current || !storyGroupsRefs.current[activeStoryGroupIndex]) return 0;

    const storyWidth = storyGroupsRefs.current[activeStoryGroupIndex].offsetWidth;
    const containerWidth = groupsLayoutContainerRef.current.offsetWidth;
    console.log(storyWidth, containerWidth);
    let offset = containerWidth / 2 - storyWidth / 2 - activeStoryGroupIndex * storyWidth;
    return offset;
  }, [activeStoryGroupIndex]);

  const [offset, setOffset] = useState<number>(calculateOffset());
  useEffect(() => {
    // Scroll to the active element whenever the index changes
    function handleResize() {
      setOffset(calculateOffset());
    }
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateOffset]);

  useEffect(() => {
    // Update URL depending on active story group
    window.history.replaceState(null, "", storyCategory.storyGroups[activeStoryGroupIndex].getFullUrl() + window.location.hash);
    setOffset(calculateOffset());
  }, [activeStoryGroupIndex, storyCategory.storyGroups, calculateOffset]);

  useEffect(() => {
    if (groupsLayoutRef.current) {
      groupsLayoutRef.current.style.transform = ` translateX(${Math.round(offset)}px)`;
    }
  }, [offset]);

  const goToNextStoryGroup = useCallback(() => {
    if (activeStoryGroupIndex === storyGroupsRefs.current.length - 1) {
      window.location.href = "/";
      return;
    }

    setActiveStoryGroupIndex(activeStoryGroupIndex + 1);
  }, [activeStoryGroupIndex]);

  const goToPreviousStoryGroup = useCallback(() => {
    if (activeStoryGroupIndex === 0) {
      window.location.href = "/";
      return;
    }

    setActiveStoryGroupIndex(activeStoryGroupIndex - 1);
  }, [activeStoryGroupIndex]);

  return (
    <div ref={groupsLayoutContainerRef} className="flex h-dvh max-h-dvh w-full flex-col justify-center overflow-clip bg-black pt-2 sm:bg-[#1a1a1a] sm:py-8">
      <div ref={groupsLayoutRef} className="flex w-max max-h-full max-w-none h-full flex-row transition-transform duration-500 ease-in-out">
        {storyCategory.storyGroups.map((storyGroup, index) => {
          return (<motion.div
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
                setActiveStoryGroupIndex(index);
              },
              goToPreviousStoryGroup: goToPreviousStoryGroup,
              goToNextStoryGroup: goToNextStoryGroup,
            })}
          </motion.div>)
        })}
      </div>
    </div>
  );
}
