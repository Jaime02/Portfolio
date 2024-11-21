import StoryTabThumbnails from "@/components/thumbnails-tabs/StoryTabThumbnails";
import React from "react";

export const SMALL_BREAKPOINT_WIDTH = 640;
export const MOUSE_PRESS_DURATION_THRESHOLD = 100;
export const DEFAULT_STORY_DURATION = 10000;
export const TIMER_RESOLUTION = 50;

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
}

export abstract class StoryGroup {
  title: string;
  component: React.ReactElement;
  tabThumbnail: React.ReactElement;
  headerThumbnail: React.ReactElement;
  storyGroupUrl: string;
  categoryPrefixUrl?: string = "";
  isCloseFriends: boolean;

  constructor({ title, component, tabThumbnail, headerThumbnail, storyGroupUrl, categoryPrefixUrl, isCloseFriends = false }: StoryGroupProps) {
    this.title = title;
    this.component = React.cloneElement(component, { storyGroup: this });
    this.tabThumbnail = tabThumbnail;
    this.headerThumbnail = headerThumbnail;
    this.storyGroupUrl = storyGroupUrl;
    this.categoryPrefixUrl = categoryPrefixUrl;
    this.isCloseFriends = isCloseFriends;
  }

  getFullUrl() {
    return `/${this.categoryPrefixUrl}/${this.storyGroupUrl}`;
  }
}

export class ProjectsStoryGroup extends StoryGroup {
  constructor({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, storyGroupUrl }: StoryGroupProps) {
    super({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, storyGroupUrl, categoryPrefixUrl: "projects" });
  }
}

export class ExperiencesStoryGroup extends StoryGroup {
  constructor({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, storyGroupUrl }: StoryGroupProps) {
    super({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, storyGroupUrl, categoryPrefixUrl: "experiences" });
  }
}

export class OthersStoryGroup extends StoryGroup {
  constructor({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, storyGroupUrl }: StoryGroupProps) {
    super({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, storyGroupUrl, categoryPrefixUrl: "others" });
  }
}

export class StoryVideo {
  constructor(
    public url: string,
    public extraComponents?: React.JSX.Element,
  ) {}
}
