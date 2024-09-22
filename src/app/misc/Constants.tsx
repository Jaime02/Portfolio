import TechnicalDrawingApp from "@/app/(histories)/projects/TechnicalDrawingApp";
import ThisWebsite from "@/app/(histories)/projects/ThisWebsite";
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

export abstract class HistoryGroup {
  hash: string;
  component: React.ReactElement;
  url: string = "";
  constructor({hash, component}: {hash: string, component: React.ReactElement}) {
    this.hash = hash;
    this.component = component;
  }
}

class ProjectsHistoryGroup extends HistoryGroup {
  constructor({hash, component}: {hash: string, component: React.ReactElement}) {
    super({hash, component});
    this.url = `/projects#${hash}`;
  }
}

export const ProjectsHistoryGroups: HistoryGroup[] = [
  new ProjectsHistoryGroup({
    hash: "this-website",
    component: <ThisWebsite />,
  }),
  new ProjectsHistoryGroup({
    hash: "technical-drawing-app",
    component: <TechnicalDrawingApp />,
  }),
];

export const SMALL_BREAKPOINT_WIDTH = 640;