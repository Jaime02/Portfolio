import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import FiverrLogo from "@/icons/FiverrLogo";
import UpworkLogo from "@/icons/UpworkLogo";

export default function FreelancingLogo({ href }: { href: string }) {
  return (
    <TabThumbnailLayout href={href} title="Freelancing" padding={true}>
      <div className="flex size-full flex-col items-center justify-around">
        <FiverrLogo />
        <UpworkLogo />
      </div>
    </TabThumbnailLayout>
  );
}
