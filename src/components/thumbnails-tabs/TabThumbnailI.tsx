import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import Image from "next/image";

interface TabThumbnailProps {
  href: string;
  alt: string;
  src: string;
}

export default function TabThumbnail({href, alt, src}: TabThumbnailProps) {
  return (
    <TabThumbnailLayout href={href}>
      <Image src={src} alt={alt} className="select-none" draggable="false" width="300" height="300" />
    </TabThumbnailLayout>
  );
}
