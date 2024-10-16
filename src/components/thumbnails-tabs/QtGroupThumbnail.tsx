import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import QtGroupIcon from "@/icons/QtGroupIcon";

export default function QtGroupThumbnail() {
  return (
    <TabThumbnailLayout href="/experiences/the-qt-company" padding={true}>
      <QtGroupIcon/>
    </TabThumbnailLayout>
  );
} 
