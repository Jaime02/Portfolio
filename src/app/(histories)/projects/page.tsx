"use client";

import GroupsLayout from "@/components/histories/GroupsLayout";
import {ProjectsHistoryGroups} from "@/app/misc/Constants";

export default function Page() {
  return (
    <GroupsLayout historyCardsLayouts={ProjectsHistoryGroups} />
  );
}