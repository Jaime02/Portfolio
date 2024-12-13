import React from "react";

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

export abstract class StoryGroup {
  title: string;
  component: React.ReactElement;
  tabThumbnail: React.ReactElement;
  headerThumbnail: React.ReactElement;
  storyGroupUrl: string;
  categoryPrefixUrl?: string = "";
  isCloseFriends: boolean;
  hasAudio: boolean;

  constructor({ title, component, tabThumbnail, headerThumbnail, storyGroupUrl, categoryPrefixUrl, isCloseFriends = false, hasAudio = false }: StoryGroupProps) {
    this.title = title;
    this.component = React.cloneElement(component, { storyGroup: this });
    this.tabThumbnail = tabThumbnail;
    this.headerThumbnail = headerThumbnail;
    this.storyGroupUrl = storyGroupUrl;
    this.categoryPrefixUrl = categoryPrefixUrl;
    this.isCloseFriends = isCloseFriends;
    this.hasAudio = hasAudio;
  }

  getFullUrl() {
    return `/${this.categoryPrefixUrl}/${this.storyGroupUrl}`;
  }
}

export class ProjectsStoryGroup extends StoryGroup {
  constructor({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, hasAudio, storyGroupUrl }: StoryGroupProps) {
    super({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, hasAudio, storyGroupUrl, categoryPrefixUrl: "projects" });
  }
}

export class ExperiencesStoryGroup extends StoryGroup {
  constructor({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, hasAudio, storyGroupUrl }: StoryGroupProps) {
    super({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, hasAudio, storyGroupUrl, categoryPrefixUrl: "experiences" });
  }
}

export class OthersStoryGroup extends StoryGroup {
  constructor({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, hasAudio, storyGroupUrl }: StoryGroupProps) {
    super({ title, component, tabThumbnail, headerThumbnail, isCloseFriends, hasAudio, storyGroupUrl, categoryPrefixUrl: "others" });
  }
}