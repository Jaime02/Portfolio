"use client";

import { StoriesContext } from "@/app/lib/StoriesContext";
import { usePathname } from "@/translations/routing";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

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

function StoryGroupsContextProvider({ children }: StoryGroupsContextProviderProps){
  const { useRouter } = useContext(StoriesContext);

  const router = useRouter();
  const pathname = usePathname();
  
  const { getStoryCategoryByUrl, getStoryGroupByUrl, getStoryGroupByIndex } = useContext(StoriesContext);
  // The url has the following format: /<storyGroupCategory>/<storyGroupTitle>#[activeStoryCardIndex]
  const [categoryUrl, groupUrl] = pathname.split('/').slice(1, 3);
  const [_, activeStoryCategory] = getStoryCategoryByUrl(categoryUrl);
  const [initialStoryGroupIndex, __] = getStoryGroupByUrl(activeStoryCategory, groupUrl);
  const [activeStoryGroupIndex, setActiveStoryGroupIndex] = useState(initialStoryGroupIndex);

  const inLastGroup = useMemo(() => activeStoryGroupIndex === activeStoryCategory.storyGroups.length - 1, [activeStoryCategory.storyGroups.length, activeStoryGroupIndex]);
  const inFirstGroup = useMemo(() => activeStoryGroupIndex === 0, [activeStoryGroupIndex]);

  useEffect(() => {
    const storyGroup = getStoryGroupByIndex(activeStoryCategory, activeStoryGroupIndex);
    if (storyGroup.getFullUrl() === pathname) {
      return;
    }
    
    router.replace(storyGroup.getFullUrl());
  }, [activeStoryCategory, activeStoryGroupIndex, getStoryGroupByIndex, pathname, router])
  
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
