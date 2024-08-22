import Image from "next/image";
import ThreeColumnsGrid from "@/components/misc/ThreeColumnsGrid";
import { forwardRef } from "react";

interface Props {
  index: number;
}

const ProjectsTab = forwardRef<HTMLDivElement, Props>(({index}: Props, ref) => {
  const items = [
    {
      link: "/projects#this-website",
      thumbnail: "/images/thisWebsiteThumbnail.svg",
      title: "This website",
    },
    {
      link: "/projects#technical-drawing-app",
      thumbnail: "/images/technicalDrawingAppThumbnail.png",
      title: "Technical drawing app",
    },
  ];

  return (
    <div ref={ref} data-index={index} className="min-w-full snap-center">
      <ThreeColumnsGrid>
        {items.map((item) => (
          <a href={item.link} key={item.title}>
            <Image src={item.thumbnail} alt={item.title} className="select-none w-full h-full" draggable="false" width="400" height="0"/>  
          </a>
        ))}
      </ThreeColumnsGrid>
    </div>
  );
});

export default ProjectsTab;
