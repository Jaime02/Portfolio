import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import CameraIcon from "@/icons/CameraIcon";

export default function CoolPicturesThumbnail() {
  return (
    <TabThumbnailLayout href="/others/cool-pictures" title="Cool pictures" padding={true}>
      <CameraIcon/>
    </TabThumbnailLayout>
  );
}