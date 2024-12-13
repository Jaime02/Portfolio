import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import QtLogo from "@/icons/QtLogo";
import { useTranslations } from "next-intl";

export default function QtThumbnail() {
  const t = useTranslations('Thumbnails');
  return (
    <TabThumbnailLayout href="/projects/qt-projects" title={t("Qt projects")} padding={true}>
      <QtLogo/>
    </TabThumbnailLayout>
  );
} 
