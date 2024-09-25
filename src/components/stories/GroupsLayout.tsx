"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InvisibleCards from "@/components/stories/InvisibleCards";
import { HistoryGroup } from "@/app/misc/Constants";
import { useEffectAfterMount } from "@/components/misc/useEffectAfterMount";

interface Props {
  historyCardsLayouts: HistoryGroup[];
}

export default function GroupsLayout({ historyCardsLayouts }: Props) {
  const historyGroupsRefs = useRef<(HTMLDivElement | null)[]>([]);

  let selectedCardLayout = window.location.hash.replace("#", "");
  const initialIndex = selectedCardLayout
    ? historyCardsLayouts.findIndex((historyCardLayout) => historyCardLayout.hash === selectedCardLayout)
    : 0;

  const [activeHistoryGroupIndex, setActiveHistoryGroupIndex] = useState(initialIndex);

  useEffect(() => {
    // Scroll to the initial element based on the hash
    console.log("Auto scrolling " + initialIndex);
    historyGroupsRefs.current[initialIndex]?.scrollIntoView({
      behavior: "auto",
      inline: "center",
    });
  }, [initialIndex]);

  useEffectAfterMount(() => {
    // Scroll to the active element whenever the index changes
    console.log("Smooth scrolling " + activeHistoryGroupIndex);
    historyGroupsRefs.current[activeHistoryGroupIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    // Update URL depending on active group and story
    window.history.replaceState(null, "", historyCardsLayouts[activeHistoryGroupIndex].url);
  }, [activeHistoryGroupIndex]);
    
  const goToNextHistoryGroup = useCallback(() => {
    if (activeHistoryGroupIndex === historyGroupsRefs.current.length - 1) {
      window.location.href = "/";
      return;
    }
    setActiveHistoryGroupIndex((activeHistoryGroupIndex) => activeHistoryGroupIndex + 1);
  }, [activeHistoryGroupIndex]);

  const goToPreviousHistoryGroup = useCallback(() => {
    if (activeHistoryGroupIndex === 0) {
      return;
    }
    setActiveHistoryGroupIndex((activeHistoryGroupIndex) => activeHistoryGroupIndex - 1);
  }, [activeHistoryGroupIndex]);

  return (
    <div className="flex h-screen max-h-screen w-full flex-row overflow-hidden bg-black sm:w-full sm:gap-10 sm:bg-[#1a1a1a] sm:py-14">
      <InvisibleCards keys={[-1, -2]} />
      {historyCardsLayouts.map((historyCardsLayout, index) =>
        React.cloneElement(historyCardsLayout.component, {
          ref: (el: HTMLDivElement | null) => (historyGroupsRefs.current[index] = el),
          key: index,
          active: index === activeHistoryGroupIndex,
          isFirstGroup: index === 0,
          isLastGroup: index === historyGroupsRefs.current.length - 1,
          selectMyself: () => {
            setActiveHistoryGroupIndex(index);
          },
          goToPreviousHistoryGroup: goToPreviousHistoryGroup,
          goToNextHistoryGroup: goToNextHistoryGroup,
        }),
      )}
      <InvisibleCards keys={[-3, -4]} />
    </div>
  );
}
