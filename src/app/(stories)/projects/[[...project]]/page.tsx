"use client";
import { StoryGroupsContextProvider } from "@/components/stories/StoryGroupsContext";
import { projectsStoryCategory } from "@/misc/Constants";
import dynamic from "next/dynamic";
const GroupsLayout = dynamic(() => import('@/components/stories/GroupsLayout'), {
  ssr: false,
});

interface Props {
  params: { project: string[] };
}

export default function Page({ params }: Props ) {
  return (
    <StoryGroupsContextProvider storyCategory={projectsStoryCategory} initialStoryGroupUrl={params.project ? params.project[0] : ""}>
      <GroupsLayout/>
    </StoryGroupsContextProvider>
  );
}