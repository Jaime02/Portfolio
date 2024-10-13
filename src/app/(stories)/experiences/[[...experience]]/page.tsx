"use client";
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
    <GroupsLayout initialStoryGroupUrl={params.experience ? params.experience[0] : ""} storyCategory={experiencesStoryCategory}/>
  );
}