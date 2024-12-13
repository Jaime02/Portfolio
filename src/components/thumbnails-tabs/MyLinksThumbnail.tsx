import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import LinkIcon from "@/icons/LinkIcon";
import { useTranslations } from "next-intl";

export default function MyLinksThumbnail({href}: {href: string}) {
  const t = useTranslations('Thumbnails');
  return (
    <TabThumbnailLayout href={href} title={t("My links")} padding={true}>
      <LinkIcon extraClasses="text-black"/>
    </TabThumbnailLayout>
  );
}
