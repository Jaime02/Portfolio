import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import Image from "next/image";
import { forwardRef } from "react";

const ThisWebsite = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout title="This website" thumbnail="/images/thisWebsiteThumbnail.svg" {...props} ref={ref}>
      <Card>
        <h1>This Website</h1>
        <Image src="/images/thisWebsiteThumbnail.svg" width="200" height="200" alt="Project 1" className="select-none" draggable="false" priority={true}/>  
      </Card>
      <Card>
        <h1>Pitote</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1g8a8raNDCdxU-A_cM-BevhF7tcDQKCjZxQ&s" />
      </Card>
      <Card>
        <h1>k miras neng ???</h1>
        <img src="https://content.imageresizer.com/images/memes/Suspicious-Dog-meme-1.jpg" />
      </Card>
    </CardsLayout>
  );
});

ThisWebsite.displayName = "This Website";
export default ThisWebsite;