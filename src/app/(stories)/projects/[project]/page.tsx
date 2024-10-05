"use client";
import {ProjectsStoryGroups} from "@/app/misc/Constants";
import dynamic from "next/dynamic";
const GroupsLayout = dynamic(() => import('@/components/stories/GroupsLayout'), {
  ssr: false,
});

interface Props {
  params: { project: string };
}

export default function Page({ params }: Props ) {
  return (
    <GroupsLayout initialStoryGroup={params.project} storyCardsLayouts={ProjectsStoryGroups}/>
  );
}