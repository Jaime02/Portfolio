import HistoryCard from "@/app/ui/history-components/HistoryCard";
import HistoryGroupLayout from "@/app/ui/history-components/HistoryGroupLayout";
import Image from "next/image";

export default function Page() {
  return (
    <HistoryGroupLayout title="This website" thumbnail="/images/thisWebsiteThumbnail.svg">
      <HistoryCard>
        <h1>This Website</h1>
        <Image src="/images/thisWebsiteThumbnail.svg" width="200" height="200" alt="Project 1" className="select-none" draggable="false" />  
      </HistoryCard>
      <HistoryCard>
        <h1>Pitote</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1g8a8raNDCdxU-A_cM-BevhF7tcDQKCjZxQ&s" />
      </HistoryCard>
      <HistoryCard>
        <h1>k miras neng ???</h1>
        <img src="https://content.imageresizer.com/images/memes/Suspicious-Dog-meme-1.jpg" />
      </HistoryCard>
    </HistoryGroupLayout>
  );
}
