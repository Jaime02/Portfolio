import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import QtLogo from "@/icons/QtLogo";

export default function QtThumbnail() {
  return (
    <TabThumbnailLayout href="/projects/qt-projects" padding={true}>
      <QtLogo/>
    </TabThumbnailLayout>
  );
} 
