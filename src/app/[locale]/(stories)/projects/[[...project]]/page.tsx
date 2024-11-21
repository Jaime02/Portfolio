"use client";
import { StoryGroupsContextProvider } from "@/app/lib/StoryGroupsContext";
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