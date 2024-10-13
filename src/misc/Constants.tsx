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

export class StoryCategory {
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
    this.component = component;
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
    component: <ThisWebsite storyGroup={this} />,
    tabThumbnail: <TabThumbnail alt="This website thumbnail" src="/images/InstagramLogo.svg" href="/projects/this-website" />,
    headerThumbnail: <HeaderThumbnail src="/images/InstagramLogo.svg" />,
  }),
  new ProjectsStoryGroup({
    title: "Qt projects",
    component: <QtProjects storyGroup={this} />,
    tabThumbnail: <TabThumbnail alt="Qt projects tumbnail" src="/images/QtLogo.svg" href="/projects/qt-projects" />,
    headerThumbnail: <HeaderThumbnail src="/images/QtSquareLogo.svg" />,
  }),
  new ProjectsStoryGroup({
    title: "Paint filter manager",
    component: <PaintFilterManager storyGroup={this} />,
    tabThumbnail: <TabThumbnail alt="Paint filter manager thumbnail" src="/images/PaintFilterManagerLogo.webp" href="/projects/paint-filter-manager" />,
    headerThumbnail: <HeaderThumbnail src="/images/PaintFilterManagerLogo.webp" />,
  }),
];

export const ExperiencesStoryGroups: StoryGroup[] = [
  new ExperiencesStoryGroup({
    title: "The Qt Company",
    component: <TheQtCompany storyGroup={this} />,
    tabThumbnail: <QtGroupThumbnail />,
    headerThumbnail: <HeaderThumbnail src="/images/QtSquareLogo.svg" />,
  }),
  new ExperiencesStoryGroup({
    title: "OPmobility",
    component: <OPmobility />,
    tabThumbnail: <TabThumbnail alt="OPmobility thumbnail" src="/images/OPmobilityLogo.webp" href="/experiences/opmobility" />,
    headerThumbnail: <HeaderThumbnail src="/images/PlasticOmniumLogo.svg" />,
  }),
  new ExperiencesStoryGroup({
    title: "Hiberus",
    component: <Hiberus />,
    tabThumbnail: <TabThumbnail alt="Hiberus thumbnail" src="/images/HiberusLogo.webp" href="/experiences/hiberus" />,
    headerThumbnail: <HeaderThumbnail src="/images/HiberusLogo.webp" />,
  }),
  new ExperiencesStoryGroup({
    title: "Freelancing",
    component: <Freelancing />,
    tabThumbnail: <FreelancingLogo href="/experiences/freelancing"/>,
    headerThumbnail: <HeaderThumbnail src="/images/Laptop.svg" />,
  }),
  new ExperiencesStoryGroup({
    title: "Upna",
    component: <Upna />,
    tabThumbnail: <TabThumbnail alt="Upna thumbnail" src="/images/UpnaLogo.webp" href="/experiences/upna" />, 
    headerThumbnail: <HeaderThumbnail src="/images/AcademicLogo.svg" />,
  }),
];

export const OthersStoryGroups: StoryGroup[] = [
  new OthersStoryGroup({
    title: "Download CV",
    component: <DownloadCV />,
    tabThumbnail: <TabThumbnail alt="Download CV thumbnail" src="/images/CVIcon.svg" href="/others/download-cv" />,
    headerThumbnail: <HeaderThumbnail src="/images/CVIcon.svg" />,
  }),
  new OthersStoryGroup({
    title: "My links",
    component: <MyLinks />,
    tabThumbnail: <TabThumbnail alt="My links thumbnail" src="/images/LinkIcon.svg" href="/others/my-links" />,
    headerThumbnail: <HeaderThumbnail src="/images/LinkIcon.svg" />,
  }),
  new OthersStoryGroup({
    title: "Cool pictures",
    component: <CoolPictures />,
    tabThumbnail: <TabThumbnail alt="Cool pictures thumbnail" src="/images/WIP.svg" href="/others/cool-pictures" />,
    headerThumbnail: <HeaderThumbnail src="/images/WIP.svg" />,
  }),
];

export const projectsStoryCategory = new StoryCategory({
  name: "Projects",
  index: 0,
  storyGroups: ProjectsStoryGroups,
  icon: <ProjectsIcon />,
});

export const experiencesStoryCategory = new StoryCategory({
  name: "Experiences",
  index: 1,
  storyGroups: ExperiencesStoryGroups,
  icon: <ExperienceIcon />,
});

export const othersStoryCategory = new StoryCategory({
  name: "Others",
  index: 2,
  storyGroups: OthersStoryGroups,
  icon: <ThreeDotsIcon />,
});

export const storyCategories: StoryCategory[] = [projectsStoryCategory, experiencesStoryCategory, othersStoryCategory];

export const SMALL_BREAKPOINT_WIDTH = 640;
