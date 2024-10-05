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
  const [offset, setOffset] = useState<number>(0);

  const initialGroupIndex: number = initialStoryGroup ? storyCardsLayouts.findIndex((storyCardLayout) => storyCardLayout.groupName === initialStoryGroup) : 0;
  const [activeStoryGroupIndex, setActiveStoryGroupIndex] = useState(initialGroupIndex);

  const calculateOffset = useCallback(() => {
    if (!groupsLayoutRef.current || !storyGroupsRefs.current[activeStoryGroupIndex]) return 0;

    const containerWidth = groupsLayoutRef.current.offsetWidth;
    const storyWidth = storyGroupsRefs.current[0].offsetWidth;

    // TODO
    const gap = 8;
    const offset = containerWidth / 2 - storyWidth / 2 - activeStoryGroupIndex * (storyWidth + gap);
    return offset;
  }, [activeStoryGroupIndex]);

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
    window.history.replaceState(null, "", storyCardsLayouts[activeStoryGroupIndex].url);

    setOffset(calculateOffset());
  }, [activeStoryGroupIndex, storyCardsLayouts, calculateOffset]);

  const goToNextStoryGroup = useCallback(() => {
    if (activeStoryGroupIndex === storyGroupsRefs.current.length - 1) {
      window.location.href = "/";
      return;
    }
    setActiveStoryGroupIndex((activeStoryGroupIndex) => activeStoryGroupIndex + 1);
  }, [activeStoryGroupIndex]);

  const goToPreviousStoryGroup = useCallback(() => {
    if (activeStoryGroupIndex === 0) {
      return;
    }
    setActiveStoryGroupIndex((activeStoryGroupIndex) => activeStoryGroupIndex - 1);
  }, [activeStoryGroupIndex]);

  return (
    <div ref={groupsLayoutRef} className="flex h-screen max-h-screen w-full flex-row overflow-hidden bg-black sm:w-full sm:bg-[#1a1a1a] sm:py-14">
      {storyCardsLayouts.map((storyCardsLayout, index) => {
        return (
          <motion.div
            key={index}
            animate={{
              x: offset,
              scale: activeStoryGroupIndex === index ? 1 : 0.5, // scale the selected item to 1, others to 0.5
            }}
            initial={false}
            transition={{ type: "tween", ease: "easeInOut" }}
          >
            {React.cloneElement(storyCardsLayout.component, {
              ref: (el: HTMLDivElement) => (storyGroupsRefs.current[index] = el),
              active: index === activeStoryGroupIndex,
              isFirstGroup: index === 0,
              isLastGroup: index === storyGroupsRefs.current.length - 1,
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
