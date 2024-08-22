import Card from "@/components/histories/Card";
import CardsLayout from "@/components/histories/CardsLayout";
import Image from "next/image";

export default function TechnicalDrawingApp() {
  return (
    <CardsLayout title="Technical Drawing App" thumbnail="/images/technicalDrawingAppThumbnail.png">
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
}
