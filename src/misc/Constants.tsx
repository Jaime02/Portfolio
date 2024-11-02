import Freelancing from "@/app/(stories)/experiences/Freelancing";
import Hiberus from "@/app/(stories)/experiences/Hiberus";
import OPmobility from "@/app/(stories)/experiences/OPmobility";
import TheQtCompany from "@/app/(stories)/experiences/TheQtCompany";
import Upna from "@/app/(stories)/experiences/Upna";
import CoolPictures from "@/app/(stories)/others/CoolPictures";
import MyLinks from "@/app/(stories)/others/MyLinks";
import DownloadCV from "@/app/(stories)/others/DownloadCV";
import PaintFilterManager from "@/app/(stories)/projects/PaintFilterManager";
import QtProjects from "@/app/(stories)/projects/QtProjects";
import ThisWebsite from "@/app/(stories)/projects/ThisWebsite";
import HeaderThumbnail from "@/components/stories/HeaderThumbnail";
import FreelancingLogo from "@/components/thumbnails-tabs/FreelancingLogo";
import QtGroupThumbnail from "@/components/thumbnails-tabs/QtGroupThumbnail";
import StoryTabThumbnails from "@/components/thumbnails-tabs/StoryTabThumbnails";
import TabThumbnail from "@/components/thumbnails-tabs/TabThumbnailI";
import ExperienceIcon from "@/icons/ExperienceIcon";
import ProjectsIcon from "@/icons/ProjectsIcon";
import ThreeDotsIcon from "@/icons/ThreeDotsIcon";
import React from "react";
import LiveGL from "@/app/(stories)/projects/LiveGL";
import QtThumbnail from "@/components/thumbnails-tabs/QtThumbnail";
import Crispin from "@/app/(stories)/others/Crispin";
import CoolPicturesThumbnail from "@/components/thumbnails-tabs/CoolPicturesThumbnail";
import MyLinksThumbnail from "@/components/thumbnails-tabs/MyLinksThumbnail";

export const SMALL_BREAKPOINT_WIDTH = 640;
export const MOUSE_PRESS_DURATION_THRESHOLD = 100;
export const DEFAULT_STORY_DURATION = 10000;
export const TIMER_RESOLUTION = 50;

export class StoryGroupCategory {
  name: string;
  index: number;
  storyGroups: StoryGroup[];
  icon: React.ReactNode;
  storyTabThumbnails: React.ReactElement;
  constructor({ name, index, storyGroups, icon }: { name: string; index: number; storyGroups: StoryGroup[]; icon: React.ReactNode }) {
    this.name = name;
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
  urlCategoryPrefix?: string;
}

export abstract class StoryGroup {
  title: string;
  component: React.ReactElement;
  tabThumbnail: React.ReactElement;
  headerThumbnail: React.ReactElement;
  urlCategoryPrefix?: string = "";
  constructor({ title, component, tabThumbnail, headerThumbnail, urlCategoryPrefix }: StoryGroupProps) {
    this.title = title;
    this.component = React.cloneElement(component, { storyGroup: this });
    this.tabThumbnail = tabThumbnail;
    this.headerThumbnail = headerThumbnail;
    this.urlCategoryPrefix = urlCategoryPrefix;
  }

  getGroupUrl() {
    return this.title.split(" ").join("-").toLowerCase();
  }

  getFullUrl() {
    return `/${this.urlCategoryPrefix}/${this.getGroupUrl()}`;
  }
}

class ProjectsStoryGroup extends StoryGroup {
  constructor({ title, component, tabThumbnail, headerThumbnail }: StoryGroupProps) {
    super({ title, component, tabThumbnail, headerThumbnail, urlCategoryPrefix: "projects" });
  }
}

class ExperiencesStoryGroup extends StoryGroup {
  constructor({ title, component, tabThumbnail, headerThumbnail }: StoryGroupProps) {
    super({ title, component, tabThumbnail, headerThumbnail, urlCategoryPrefix: "experiences" });
  }
}

class OthersStoryGroup extends StoryGroup {
  constructor({ title, component, tabThumbnail, headerThumbnail }: StoryGroupProps) {
    super({ title, component, tabThumbnail, headerThumbnail, urlCategoryPrefix: "others" });
  }
}

export const ProjectsStoryGroups: StoryGroup[] = [
  new ProjectsStoryGroup({
    title: "This website",
    component: <ThisWebsite />,
    tabThumbnail: <TabThumbnail title="This website" src="/images/InstagramLogo.svg" href="/projects/this-website" padding={true} />,
    headerThumbnail: <HeaderThumbnail src="/images/InstagramLogo.svg" />,
  }),
  new ProjectsStoryGroup({
    title: "Qt projects",
    component: <QtProjects />,
    tabThumbnail: <QtThumbnail />,
    headerThumbnail: <HeaderThumbnail src="/images/QtSquareLogo.svg" />,
  }),
  new ProjectsStoryGroup({
    title: "Paint filter manager",
    component: <PaintFilterManager />,
    tabThumbnail: <TabThumbnail title="Paint filter manager" src="/images/PaintFilterManagerLogo.webp" href="/projects/paint-filter-manager" />,
    headerThumbnail: <HeaderThumbnail src="/images/PaintFilterManagerLogo.webp" />,
  }),
  new ProjectsStoryGroup({
    title: "LiveGL",
    component: <LiveGL />,
    tabThumbnail: <TabThumbnail title="LiveGL" src="/images/LiveGLThumbnail.webp" href="/projects/livegl" padding={true} />,
    headerThumbnail: <HeaderThumbnail src="/images/LiveGLThumbnail.webp" />,
  }),
];

export const ExperiencesStoryGroups: StoryGroup[] = [
  new ExperiencesStoryGroup({
    title: "The Qt Company",
    component: <TheQtCompany />,
    tabThumbnail: <QtGroupThumbnail />,
    headerThumbnail: <HeaderThumbnail src="/images/QtSquareLogo.svg" />,
  }),
  new ExperiencesStoryGroup({
    title: "OPmobility",
    component: <OPmobility />,
    tabThumbnail: <TabThumbnail title="OPmobility" src="/images/OPmobilityLogo.webp" href="/experiences/opmobility" />,
    headerThumbnail: <HeaderThumbnail src="/images/PlasticOmniumLogo.svg" />,
  }),
  new ExperiencesStoryGroup({
    title: "Hiberus",
    component: <Hiberus />,
    tabThumbnail: <TabThumbnail title="Hiberus" src="/images/HiberusLogo.webp" href="/experiences/hiberus" />,
    headerThumbnail: <HeaderThumbnail src="/images/HiberusThumbnail.jpeg" />,
  }),
  new ExperiencesStoryGroup({
    title: "Freelancing",
    component: <Freelancing />,
    tabThumbnail: <FreelancingLogo href="/experiences/freelancing" />,
    headerThumbnail: <HeaderThumbnail src="/images/Laptop.svg" />,
  }),
  new ExperiencesStoryGroup({
    title: "Upna",
    component: <Upna />,
    tabThumbnail: <TabThumbnail title="Universidad Publica de Navarra" src="/images/UpnaLogo.webp" href="/experiences/upna" padding={true} />,
    headerThumbnail: <HeaderThumbnail src="/images/AcademicIcon.svg" />,
  }),
];

export const OthersStoryGroups: StoryGroup[] = [
  new OthersStoryGroup({
    title: "Download CV",
    component: <DownloadCV />,
    tabThumbnail: <TabThumbnail title="Download CV" src="/images/CVIcon.svg" href="/others/download-cv" padding={true} />,
    headerThumbnail: <HeaderThumbnail src="/images/CVIcon.svg" />,
  }),
  new OthersStoryGroup({
    title: "My links",
    component: <MyLinks />,
    tabThumbnail: <MyLinksThumbnail href="/others/my-links" />,
    headerThumbnail: <HeaderThumbnail src="/images/LinkIcon.svg" />,
  }),
  new OthersStoryGroup({
    title: "Crispin",
    component: <Crispin />,
    tabThumbnail: <TabThumbnail title="Crispin" src="/images/CrispinThumbnail.jpg" href="/others/crispin" />,
    headerThumbnail: <HeaderThumbnail src="/images/CrispinSquareThumbnail.jpg" />,
  }),
  new OthersStoryGroup({
    title: "Cool pictures",
    component: <CoolPictures />,
    tabThumbnail: <CoolPicturesThumbnail />,
    headerThumbnail: <HeaderThumbnail src="/images/icons/CameraIcon.svg" />,
  }),
];

export const projectsStoryCategory = new StoryGroupCategory({
  name: "Projects",
  index: 0,
  storyGroups: ProjectsStoryGroups,
  icon: <ProjectsIcon />,
});

export const experiencesStoryCategory = new StoryGroupCategory({
  name: "Experiences",
  index: 1,
  storyGroups: ExperiencesStoryGroups,
  icon: <ExperienceIcon />,
});

export const othersStoryCategory = new StoryGroupCategory({
  name: "Others",
  index: 2,
  storyGroups: OthersStoryGroups,
  icon: <ThreeDotsIcon />,
});

export const storyCategories: StoryGroupCategory[] = [projectsStoryCategory, experiencesStoryCategory, othersStoryCategory];

export class StoryVideo {
  constructor(
    public url: string,
    public extraComponents?: React.JSX.Element,
  ) {}
}

export function getStoryCategoryByUrl(url: string): [number, StoryGroupCategory] {
  let index = storyCategories.findIndex((storyCategory) => storyCategory.name.toLowerCase() === url.toLowerCase());
  if (index === -1) {
    console.error("Invalid story category url:", url);
  }
  return [index, storyCategories[index]];
}

export function getStoryGroupByUrl(category: StoryGroupCategory, url: string): [number, StoryGroup] { 
  let index = category.storyGroups.findIndex((storyGroup) => storyGroup.getGroupUrl().toLowerCase() === url.toLowerCase());
  if (index === -1) {
    console.error("Invalid story group url:", url);
  }

  return [index, category.storyGroups[index]];
}

export function getStoryGroupByIndex(category: StoryGroupCategory, index: number): StoryGroup {
  return category.storyGroups[index];
}
