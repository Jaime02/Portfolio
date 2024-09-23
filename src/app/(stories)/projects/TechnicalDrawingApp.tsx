import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import Image from "next/image";
import { forwardRef } from "react";

const TechnicalDrawingApp = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout title="Technical Drawing App" thumbnail="/images/technicalDrawingAppThumbnail.png" {...props} ref={ref}>
      <Card>
        <h1>Technical Drawing app</h1>
        <Image src="/images/TechnicalDrawingAppScreenshot.png" width="500" height="500" alt="Technical Drawing App Screenshot" className="select-none h-auto w-auto" draggable="false" />  
      </Card>
      <Card>
        <h1>Pitote tecnicoooooooooo</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1g8a8raNDCdxU-A_cM-BevhF7tcDQKCjZxQ&s" />
      </Card>
    </CardsLayout>
  );
});

export default TechnicalDrawingApp;
