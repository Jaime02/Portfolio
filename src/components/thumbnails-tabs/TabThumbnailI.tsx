import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import Image from "next/image";

interface TabThumbnailProps {
  href: string;
  alt: string;
  src: string;
  padding: boolean;
}

export default function TabThumbnail({href, alt, src, padding = false}: TabThumbnailProps) {
  return (
    <TabThumbnailLayout href={href} padding={padding}>
      <Image src={src} alt={alt} className="select-none" draggable="false" width="300" height="300" />
    </TabThumbnailLayout>
  );
}
