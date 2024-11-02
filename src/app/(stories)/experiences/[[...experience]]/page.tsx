"use client";
import { StoryGroupsContextProvider } from "@/components/stories/StoryGroupsContext";
import dynamic from "next/dynamic";
const GroupsLayout = dynamic(() => import('@/components/stories/GroupsLayout'), {
  ssr: false,
});

export default function Page() {
  return (
    <StoryGroupsContextProvider>
      <GroupsLayout/>
    </StoryGroupsContextProvider>
  );
}