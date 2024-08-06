import ExperienceIcon from "../icons/ExperienceIcon";
import ProjectsIcon from "../icons/ProjectsIcon";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";

class Tab {
  name: string;
  id: string;
  icon: typeof Image;

  constructor(name: string, id: string, image: typeof Image) {
    this.name = name;
    this.id = id;
    this.icon = image;
  }
}

export const tabs = [
  {
    name: "Projects",
    id: "projects",
    icon: ProjectsIcon,
  },
  {
    name: "Experience",
    id: "experience",
    icon: ExperienceIcon,
  },
  {
    name: "Others",
    id: "others",
    icon: ThreeDotsIcon,
  },
];