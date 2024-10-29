import { StoryCategory } from "@/misc/Constants";
import { createContext, useCallback, useMemo, useState } from "react";

const StoryGroupsContext = createContext<any>({
  storyCategory: null,
  storyGroups: [],
  storyGroupsCount: 0,
  storyGroupUrl: null,
  activeStoryGroup: null,
  activeStoryGroupIndex: 0,
  paused: true,
  setPaused: (paused: boolean) => {},
  setActiveStoryGroupIndex: (index: number) => {},
  goToNextStoryGroup: () => {},
  goToPreviousStoryGroup: () => {},
});

interface StoryGroupsContextProviderProps {
  children: React.ReactNode;
  storyCategory: StoryCategory;
  initialStoryGroupUrl?: string;
}

const StoryGroupsContextProvider = ({ children, storyCategory, initialStoryGroupUrl }: StoryGroupsContextProviderProps) => {
  let initialGroupIndex: number = 0;
  if (initialStoryGroupUrl) {
    initialGroupIndex = Math.max(
      storyCategory.storyGroups.findIndex((storyGroup) => storyGroup.getGroupUrl() === initialStoryGroupUrl),
      0,
    );
  }

  const [activeStoryGroupIndex, setActiveStoryGroupIndex] = useState(initialGroupIndex);
  const [paused, setPaused] = useState(true);

  const inLastGroup = useMemo(() => activeStoryGroupIndex === storyCategory.storyGroups.length - 1, [activeStoryGroupIndex, storyCategory.storyGroups.length]);
  const inFirstGroup = useMemo(() => activeStoryGroupIndex === 0, [activeStoryGroupIndex]);
  const activeStoryGroup = useMemo(() => {
    return storyCategory.storyGroups[activeStoryGroupIndex];
  }, [storyCategory.storyGroups, activeStoryGroupIndex]);
  const goToNextStoryGroup = useCallback(() => {
    if (activeStoryGroupIndex === storyCategory.storyGroups.length - 1) {
      window.location.href = "/";
      return;
    }

    setActiveStoryGroupIndex(activeStoryGroupIndex + 1);
  }, [activeStoryGroupIndex, storyCategory.storyGroups.length]);

  const goToPreviousStoryGroup = useCallback(() => {
    if (activeStoryGroupIndex === 0) {
      window.location.href = "/";
      return;
    }

    setActiveStoryGroupIndex(activeStoryGroupIndex - 1);
  }, [activeStoryGroupIndex]);

  return (
    <StoryGroupsContext.Provider
      value={{
        storyCategory,
        storyGroups: useMemo(() => storyCategory.storyGroups, [storyCategory]),
        storyGroupsCount: useMemo(() => storyCategory.storyGroups.length, [storyCategory]),
        activeStoryGroup,
        activeStoryGroupIndex,
        setActiveStoryGroupIndex,
        inLastGroup,
        inFirstGroup,
        paused,
        setPaused,
        goToPreviousStoryGroup,
        goToNextStoryGroup,
      }}
    >
      {children}
    </StoryGroupsContext.Provider>
  );
};

export { StoryGroupsContext, StoryGroupsContextProvider };
