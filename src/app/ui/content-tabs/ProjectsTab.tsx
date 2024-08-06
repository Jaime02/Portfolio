import Image from "next/image";
import ThreeColumnsGrid from "../history-components/ThreeColumnsGrid";

export default function ProjectsTab({ id }: { id: string }) {
  const items = [
    {
      link: "/projects/this-website",
      thumbnail: "/images/thisWebsiteThumbnail.svg",
      title: "This website",
    },
    {
      link: "/projects/technical-drawing-app",
      thumbnail: "/images/technicalDrawingAppThumbnail.png",
      title: "Technical drawing app",
    },
  ];

  return (
    <div id={id} className="min-w-full snap-center">
      <ThreeColumnsGrid>
        {items.map((item) => (
          <a href={item.link} key={item.title}>
            <Image src={item.thumbnail} alt={item.title} className="select-none" draggable="false" width="200" height="200" />  
          </a>
        ))}
      </ThreeColumnsGrid>
    </div>
  );
}
