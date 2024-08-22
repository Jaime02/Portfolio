"use client";
import React, { act, useEffect, useRef, useState } from "react";
import CardsLayout from "@/components/histories/CardsLayout";
import InvisibleCards from "@/components/histories/InvisibleCards";

interface Props {
  historyCardsLayouts: React.ReactNode[];
}

export default function GroupsLayout({ historyCardsLayouts }: Props) {
  const historyGroupsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeHistoryGroupIndex, setActiveHistoryGroupIndex] = useState(0);

  useEffect(() => {
    historyGroupsRefs.current[activeHistoryGroupIndex]?.scrollIntoView({
      behavior: "instant",
      inline: "center",
    });
  }, [activeHistoryGroupIndex]);

  return (
    <div className="flex h-screen max-h-screen w-full snap-x flex-row overflow-hidden bg-black sm:w-full sm:gap-10 sm:bg-[#1a1a1a] sm:py-14">
      <InvisibleCards amount={2} keys={[0, 1]} />
      {historyCardsLayouts.map((historyCardsLayout, index) => {
        let active = index === activeHistoryGroupIndex;
        let onClickFunction = () => {};
        if (!active) {
          onClickFunction = () => {
            setActiveHistoryGroupIndex(index);
          };
        }

        return React.cloneElement(historyCardsLayout as React.ReactElement<any>, {
          ref: (el: HTMLDivElement) => {
            historyGroupsRefs.current[index] = el;
          },
          key: index,
          active: active,
          onClick: onClickFunction,
        });
      })}
      <InvisibleCards amount={2} keys={[2, 3]} />
    </div>
  );
}
