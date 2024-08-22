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

export const SMALL_BREAKPOINT_WIDTH = 640;