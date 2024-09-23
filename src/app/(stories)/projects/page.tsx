"use client";

import GroupsLayout from "@/components/stories/GroupsLayout";
import {ProjectsHistoryGroups} from "@/app/misc/Constants";

export default function Page() {
  return (
    <GroupsLayout historyCardsLayouts={ProjectsHistoryGroups} />
  );
}