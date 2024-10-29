"use client";
import { StoryGroupsContextProvider } from "@/components/stories/StoryGroupsContext";
import { experiencesStoryCategory } from "@/misc/Constants";
import dynamic from "next/dynamic";
const GroupsLayout = dynamic(() => import('@/components/stories/GroupsLayout'), {
  ssr: false,
});

interface Props {
  params: { experience: string[] };
}

export default function Page({ params }: Props ) {
  return (
    <StoryGroupsContextProvider storyCategory={experiencesStoryCategory} initialStoryGroupUrl={params.experience ? params.experience[0] : ""}>
      <GroupsLayout/>
    </StoryGroupsContextProvider>
  );
}