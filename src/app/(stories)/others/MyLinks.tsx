import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import GithubIcon from "@/icons/GithubIcon";
import LinkedinIcon from "@/icons/LinkedinIcon";
import YoutubeIcon from "@/icons/YoutubeIcon";
import React, { useState } from "react";
import { forwardRef } from "react";
import Image from "next/image";

class TitledIcon {
  constructor(
    public title: string,
    public icon: React.ReactNode,
    public link: string,
    public hidden?: boolean,
  ) {}
}

const MyLinks = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const [onlyfansHidden, setOnlyfansHidden] = useState(true);

  let titledIcons = [
    new TitledIcon("GitHub", <GithubIcon extraClasses="h-full w-full"/>, "https://github.com/Jaime02"),
    new TitledIcon("LinkedIn", <LinkedinIcon extraClasses="h-full w-full"/>, "https://www.linkedin.com/in/jaime-resano/"),
    new TitledIcon("YouTube", <YoutubeIcon extraClasses="h-full w-full"/>, "https://www.youtube.com/@jaimer02"),
    new TitledIcon(
      "???",
      <Image src="/images/OnlyfansLogo.svg" width="300" height="300" className="h-full w-full" alt="Onlyfans link" draggable="false" priority={true} />,
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",  // DO NOT OPEN THE LINK
    ),
  ];

  function showOnlyfans(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    setOnlyfansHidden(false);
    event.preventDefault();
  }

  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <div className="grid w-full grid-cols-2 justify-center gap-2 p-2">
          {titledIcons.map((titledIcon, index) => (
            <a
              key={index}
              className={`flex aspect-square w-full flex-col items-center gap-1 text-center rounded-md overflow-hidden border-2 hover:ring transition-opacity duration-1000 ${onlyfansHidden && index == 3 ? "opacity-0" : ""}`}
              href={onlyfansHidden && index == 3 ? "" : titledIcon.link}
              target="_blank"
              onClick={onlyfansHidden && index == 3 ? showOnlyfans : () => {}}
            >
              {titledIcon.icon}
              <h1 className="text-lg bg-black text-white w-full">{titledIcon.title}</h1>
            </a>
          ))}
        </div>
      </Card>
    </CardsLayout>
  );
});

MyLinks.displayName = "My links";
export default MyLinks;
