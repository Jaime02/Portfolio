import TechnicalDrawingApp from "@/app/(stories)/projects/TechnicalDrawingApp";
import ThisWebsite from "@/app/(stories)/projects/ThisWebsite";
import ExperienceIcon from "@/icons/ExperienceIcon";
import ProjectsIcon from "@/icons/ProjectsIcon";
import ThreeDotsIcon from "@/icons/ThreeDotsIcon";

class Tab {
  name: string;
  id: string;
  Icon: React.ReactNode;

  constructor({name, id, Icon}: {name: string, id: string, Icon: React.ReactNode}) {
    this.name = name;
    this.id = id;
    this.Icon = Icon;
  }
}

export const tabs = [
  new Tab({
    name: "Projects",
    id: "projects",
    Icon: <ProjectsIcon extraClasses={"size-8"}/>,
  }),
  new Tab({
    name: "Experience",
    id: "experience",
    Icon: <ExperienceIcon extraClasses={"size-8"}/>,
  }),
  new Tab({
    name: "Others",
    id: "others",
    Icon: <ThreeDotsIcon extraClasses={"size-8"}/>,
  }),
];

export abstract class StoryGroup {
  groupName: string;
  component: React.ReactElement;
  url: string = "";
  constructor({groupName, component}: {groupName: string, component: React.ReactElement}) {
    this.groupName = groupName;
    this.component = component;
  }
}

class ProjectsStoryGroup extends StoryGroup {
  constructor({groupName, component}: {groupName: string, component: React.ReactElement}) {
    super({groupName, component});
    this.url = `/projects/${groupName}`;
  }
}

export const ProjectsStoryGroups: StoryGroup[] = [
  new ProjectsStoryGroup({
    groupName: "this-website",
    component: <ThisWebsite />,
  }),
  new ProjectsStoryGroup({
    groupName: "technical-drawing-app",
    component: <TechnicalDrawingApp />,
  }),
];

export const SMALL_BREAKPOINT_WIDTH = 640;