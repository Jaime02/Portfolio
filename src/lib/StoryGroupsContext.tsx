"use client";

import { getStoryCategoryByUrl, getStoryGroupByIndex, getStoryGroupByUrl } from "@/misc/Constants";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

const StoryGroupsContext = createContext<any>({
  activeStoryCategory: null,
  activeStoryGroupIndex: 0,
  setActiveStoryGroupIndex: () => {},
  goToNextStoryGroup: () => {},
  goToPreviousStoryGroup: () => {},
  inFirstGroup: false,
  inLastGroup: false,
});

interface StoryGroupsContextProviderProps {
  children: React.ReactNode;
}

const StoryGroupsContextProvider = ({ children }: StoryGroupsContextProviderProps) => {
  const pathname = usePathname();
  
  // The url has the following format: /<storyGroupCategory>/<storyGroupTitle>#[activeStoryCardIndex]
  const [categoryUrl, groupUrl] = pathname.split('/').slice(1, 3);
  const [_, activeStoryCategory] = getStoryCategoryByUrl(categoryUrl);
  const [initialStoryGroupIndex, __] = getStoryGroupByUrl(activeStoryCategory, groupUrl);
  
  const [activeStoryGroupIndex, setActiveStoryGroupIndex] = useState(initialStoryGroupIndex);

  const inLastGroup = useMemo(() => activeStoryGroupIndex === activeStoryCategory.storyGroups.length - 1, [activeStoryCategory.storyGroups.length, activeStoryGroupIndex]);
  const inFirstGroup = useMemo(() => activeStoryGroupIndex === 0, [activeStoryGroupIndex]);

  useEffect(() => {
    const storyGroup = getStoryGroupByIndex(activeStoryCategory, activeStoryGroupIndex);
    if (storyGroup.getFullUrl() === window.location.pathname) {
      return;
    }
    
    window.history.replaceState(null, "", `${storyGroup.getFullUrl()}`);
  }, [activeStoryCategory, activeStoryGroupIndex])
  
  const goToNextStoryGroup = useCallback(() => {
    if (activeStoryGroupIndex === activeStoryCategory.storyGroups.length - 1) {
      window.location.href = "/";
      return;
    }
    
    setActiveStoryGroupIndex(activeStoryGroupIndex + 1);
  }, [activeStoryGroupIndex, activeStoryCategory.storyGroups.length]);
  
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
        activeStoryCategory,
        activeStoryGroupIndex,
        setActiveStoryGroupIndex,
        goToNextStoryGroup,
        goToPreviousStoryGroup,
        inFirstGroup,
        inLastGroup,
      }}
    >
      {children}
    </StoryGroupsContext.Provider>
  );
};

export { StoryGroupsContext, StoryGroupsContextProvider };
