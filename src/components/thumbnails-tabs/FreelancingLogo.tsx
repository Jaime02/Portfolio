import TabThumbnailLayout from "@/components/thumbnails-tabs/TabThumbnailLayout";
import Image from "next/image";

export default function FreelancingLogo({href}: {href: string}) {
  return (
    <TabThumbnailLayout href={href} padding={true}>
      <div className="flex flex-col items-center justify-around size-full">
        <Image src="/images/FiverrLogo.svg" alt="Fiverr logo" width="200" height="200" />
        <Image src="/images/UpworkLogo.svg" alt="Upwork logo" width="200" height="200" />
      </div>
    </TabThumbnailLayout>
  );
}
