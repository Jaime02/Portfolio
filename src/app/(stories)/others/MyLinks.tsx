import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import GithubIcon from "@/icons/GithubIcon";
import LinkedinIcon from "@/icons/LinkedInIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import React from "react";
import { forwardRef } from "react";

class TitledIcon {
  constructor(
    public title: string,
    public icon: React.ReactNode,
    public link: string,
  ) {}
}

const MyLinks = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  let titledIcons = [
    new TitledIcon("GitHub", <GithubIcon extraClasses="w-full h-full" />, "https://github.com/Jaime02"),
    new TitledIcon("LinkedIn", <LinkedinIcon extraClasses="w-full h-full"/>, "https://www.linkedin.com/in/jaime-resano/"),
    new TitledIcon("YouTube", <YoutubeIcon extraClasses="w-full h-full"/>, "https://www.youtube.com/@jaimer02"),
  ];

  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <div className="grid grid-cols-2 gap-2 p-2">
          {titledIcons.map((titledIcon, index) => (
            <a key={index} className="flex flex-col items-center gap-1 text-center" href={titledIcon.link} target="_blank">
              <div className="aspect-square content-center w-16 h-16">
                {titledIcon.icon}
              </div>
              <h1 className="text-lg">{titledIcon.title}</h1>
            </a>
          ))}
        </div>
      </Card>
    </CardsLayout>
  );
});

MyLinks.displayName = "My links";
export default MyLinks;
