"use client";
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
    <GroupsLayout initialStoryGroupUrl={params.project ? params.project[0] : ""} storyCategory={projectsStoryCategory}/>
  );
}