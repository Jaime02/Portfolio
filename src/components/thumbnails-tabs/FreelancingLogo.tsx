import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import FiverrLogo from "@/icons/FiverrLogo";
import UpworkLogo from "@/icons/UpworkLogo";

export default function FreelancingLogo({href}: {href: string}) {
  return (
    <TabThumbnailLayout href={href} padding={true}>
      <div className="flex flex-col items-center justify-around size-full">
        <FiverrLogo/>
        <UpworkLogo/>
      </div>
    </TabThumbnailLayout>
  );
}
