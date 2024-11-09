import { StoryGroupsContext } from "@/lib/StoryGroupsContext";
import { StoryGroup } from "@/misc/Constants";
import React from "react";
import { createContext, useContext, useMemo } from "react";

const StoryGroupContext = createContext<any>({
  storyGroup: null,
  storyGroupIndex: null,
  active: false,
  title: null,
  headerThumbnail: null,
  selectMyself: () => {},
  isBestFriends: false,
});

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
  const isBestFriends = useMemo(() => storyGroup.isBestFriends, [storyGroup]);

  return (
    <StoryGroupContext.Provider
      value={{
        storyGroup,
        storyGroupIndex,
        active,
        title,
        headerThumbnail,
        isBestFriends
      }}
    >
      {children}
    </StoryGroupContext.Provider>
  );
};

export { StoryGroupContext, StoryGroupContextProvider };