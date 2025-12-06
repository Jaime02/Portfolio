"use client";

import { StoryGroupsContext } from "@/app/lib/StoryGroupsContext";
import { StoryGroup } from "@/components/stories/StoryGroup";
import React from "react";
import { createContext, useContext, useMemo } from "react";

interface TStoryGroupContext {
  storyGroup: StoryGroup | null;
  storyGroupIndex: number | null;
  active: boolean;
  title: string | null;
  headerThumbnail: React.ReactElement | null;
  isCloseFriends: boolean;
  hasAudio: boolean;
}

const StoryGroupContext = createContext<TStoryGroupContext>({} as TStoryGroupContext);

interface StoryGroupContextProviderProps {
  children: React.ReactElement;
  storyGroup: StoryGroup;
  storyGroupIndex: number;
}

const StoryGroupContextProvider = ({ children, storyGroup, storyGroupIndex }: StoryGroupContextProviderProps) => {
  const { activeStoryGroupIndex } = useContext(StoryGroupsContext);

  const active = useMemo(() => activeStoryGroupIndex === storyGroupIndex, [activeStoryGroupIndex, storyGroupIndex]);
  const title = useMemo(() => storyGroup.title, [storyGroup]);
  const headerThumbnail = useMemo(() => storyGroup.headerThumbnail, [storyGroup]);
  const isCloseFriends = useMemo(() => storyGroup.isCloseFriends, [storyGroup]);
  const hasAudio = useMemo(() => storyGroup.hasAudio, [storyGroup]);

  return (
    <StoryGroupContext.Provider
      value={{
        storyGroup,
        storyGroupIndex,
        active,
        title,
        headerThumbnail,
        isCloseFriends,
        hasAudio,
      }}
    >
      {children}
    </StoryGroupContext.Provider>
  );
};

export { StoryGroupContext, StoryGroupContextProvider };
