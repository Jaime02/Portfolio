import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import QtGroupIcon from "@/icons/QtGroupIcon";

export default function QtGroupThumbnail() {
  return (
    <TabThumbnailLayout href="/experiences/the-qt-company" title="The Qt Company" padding={true}>
      <QtGroupIcon/>
    </TabThumbnailLayout>
  );
} 
