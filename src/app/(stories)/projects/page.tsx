"use client";
import {ProjectsHistoryGroups} from "@/app/misc/Constants";
import dynamic from "next/dynamic";
const GroupsLayout = dynamic(() => import('@/components/stories/GroupsLayout'), {
  ssr: false,
});

export default function Page() {
  return (
    <GroupsLayout historyCardsLayouts={ProjectsHistoryGroups} />
  );
}