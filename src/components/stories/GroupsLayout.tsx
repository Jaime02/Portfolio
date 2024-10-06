"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StoryGroup } from "@/app/misc/Constants";
import { motion } from "framer-motion";

interface Props {
  initialStoryGroup?: string;
  storyCardsLayouts: StoryGroup[];
}

export default function GroupsLayout({ initialStoryGroup, storyCardsLayouts }: Props) {
  const storyGroupsRefs = useRef<HTMLDivElement[]>([]);
  const groupsLayoutRef = useRef<HTMLDivElement | null>(null);

  const initialGroupIndex: number = initialStoryGroup ? storyCardsLayouts.findIndex((storyCardLayout) => storyCardLayout.groupName === initialStoryGroup) : 0;
  const [activeStoryGroupIndex, setActiveStoryGroupIndex] = useState(initialGroupIndex);
  
  const initialStoryCardIndex = Number(window.location.hash.substring(1));
  const [activeStoryCardIndex, setActiveStoryCardIndex] = useState(initialStoryCardIndex);

  const calculateOffset = useCallback(() => {
    if (!groupsLayoutRef.current || !storyGroupsRefs.current[activeStoryGroupIndex]) return 0;

    const storyWidth = storyGroupsRefs.current[0].offsetWidth;
    return -activeStoryGroupIndex * storyWidth;
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
    window.history.replaceState(null, "", storyCardsLayouts[activeStoryGroupIndex].url + window.location.hash);

    setOffset(calculateOffset());
  }, [activeStoryGroupIndex, storyCardsLayouts, calculateOffset]);

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
    <div ref={groupsLayoutRef} className="flex h-dvh max-h-dvh w-full max-w-full flex-row overflow-hidden bg-black sm:w-full sm:bg-[#1a1a1a] sm:py-14 pt-2 px-2">
      {storyCardsLayouts.map((storyCardsLayout, index) => {
        return (
          <motion.div
            key={index}
            animate={{
              x: offset,
              scale: activeStoryGroupIndex === index ? 1 : 0.5,
            }}
            className="max-w-full"
            initial={false}
            transition={{ type: "tween", ease: "easeInOut" }}
          >
            {React.cloneElement(storyCardsLayout.component, {
              ref: (el: HTMLDivElement) => (storyGroupsRefs.current[index] = el),
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
          </motion.div>
        );
      })}
    </div>
  );
}
