import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import Image from "next/image";

interface TabThumbnailProps {
  href: string;
  src: string;
  title: string; 
  padding?: boolean;
}

export default function TabThumbnail({href, src, title, padding = false}: TabThumbnailProps) {
  return (
    <TabThumbnailLayout href={href} title={title} padding={padding}>
      <Image src={src} alt={title} className="select-none" draggable="false" width="300" height="300" priority={true}/>
    </TabThumbnailLayout>
  );
}
