import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import LinkIcon from "@/icons/LinkIcon";

export default function MyLinksThumbnail({href}: {href: string}) {
  return (
    <TabThumbnailLayout href={href} title="My links" padding={true}>
      <LinkIcon extraClasses="text-black"/>
    </TabThumbnailLayout>
  );
}
