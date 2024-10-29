"use client";
import { StoryGroupsContextProvider } from "@/components/stories/StoryGroupsContext";
import { othersStoryCategory } from "@/misc/Constants";
import dynamic from "next/dynamic";
const GroupsLayout = dynamic(() => import('@/components/stories/GroupsLayout'), {
  ssr: false,
});

interface Props {
  params: { other: string[] };
}

export default function Page({ params }: Props ) {
  return (
    <StoryGroupsContextProvider storyCategory={othersStoryCategory} initialStoryGroupUrl={params.other ? params.other[0] : ""}>
      <GroupsLayout/>
    </StoryGroupsContextProvider>
  );
}