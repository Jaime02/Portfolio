import { StoryGroup } from "@/components/stories/StoryGroup";
import StoryTabThumbnails from "@/components/thumbnails-tabs/StoryTabThumbnails";
import React from "react";

export interface StoryGroupCategoryProps {
  name: string;
  storyGroupCategoryUrl: string;
  index: number;
  storyGroups: StoryGroup[];
  icon: React.ReactNode;
}

export class StoryGroupCategory {
  name: string;
  storyGroupCategoryUrl: string;
  index: number;
  storyGroups: StoryGroup[];
  icon: React.ReactNode;
  storyTabThumbnails: React.ReactElement;
  constructor({ name, storyGroupCategoryUrl, index, storyGroups, icon }: StoryGroupCategoryProps) {
    this.name = name;
    this.storyGroupCategoryUrl = storyGroupCategoryUrl;
    this.index = index;
    this.storyGroups = storyGroups;
    this.icon = icon;
    this.storyTabThumbnails = <StoryTabThumbnails index={index} thumbnails={this.getTabThumbnails()} />;
  }

  getTabThumbnails() {
    return this.storyGroups.map((storyGroup, index) => React.cloneElement(storyGroup.tabThumbnail, { key: index }));
  }

  getId() {
    return this.name.split(" ").join("-").toLowerCase();
  }
}

interface StoryGroupProps {
  title: string;
  component: React.ReactElement;
  tabThumbnail: React.ReactElement;
  headerThumbnail: React.ReactElement;
  storyGroupUrl: string;
  categoryPrefixUrl?: string;
  isCloseFriends?: boolean;
  hasAudio?: boolean;
}