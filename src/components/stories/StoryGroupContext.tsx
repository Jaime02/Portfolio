import { StoryGroupsContext } from "@/components/stories/StoryGroupsContext";
import { StoryGroup } from "@/misc/Constants";
import React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoryGroupContext = createContext<any>({
  storyGroup: null,
  storyGroupIndex: 0,
  activeStoryCardIndex: 0,
  setActiveStoryCardIndex: () => {},
  active: false,
  goToNextStory: () => {},
  goToPreviousStory: () => {},
  title: null,
  headerThumbnail: null,
});

interface StoryGroupContextProviderProps {
  children: React.ReactElement;
  storyGroup: StoryGroup;
  storyGroupIndex: number;
}

const StoryGroupContextProvider = ({ children, storyGroup, storyGroupIndex }: StoryGroupContextProviderProps) => {
  const { activeStoryGroupIndex } = useContext(StoryGroupsContext);

  const active = useMemo(() => activeStoryGroupIndex === storyGroupIndex, [activeStoryGroupIndex, storyGroupIndex]);

  const initialStoryCardIndex = Number(window.location.hash.substring(1));
  const [activeStoryCardIndex, setActiveStoryCardIndex] = useState(initialStoryCardIndex);
  
  const title = useMemo(() => storyGroup.title, [storyGroup]);
  const headerThumbnail = useMemo(() => storyGroup.headerThumbnail, [storyGroup]);

  useEffect(() => {
    if (activeStoryCardIndex !== 0) {
      window.history.replaceState(null, "", `#${activeStoryCardIndex}`);
    } else {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [activeStoryCardIndex]);
  
  return (
    <StoryGroupContext.Provider
      value={{
        storyGroup,
        storyGroupIndex,
        activeStoryCardIndex,
        setActiveStoryCardIndex,
        active,
        title,
        headerThumbnail,
      }}
    >
      {children}
    </StoryGroupContext.Provider>
  );
};

export {StoryGroupContext, StoryGroupContextProvider};
