import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";
import Image from "next/image";

const CoolPictures = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>Hey, are you still here? I have nothing else to show you... well... here you have, some cool pictures &#128513;</h1>
        <h2>Click on the download button in order to download it as a PDF</h2>
        <a className="btn-secondary" href="/CVJaimeResano.pdf"><Image src="/images/download.svg" width="20" height="20" alt="Download PDF" className="select-none" draggable="false" priority={true}/> Download CV</a>
      </Card>
      <Card>
        <p>Me gustan los trenes</p>
      </Card>
    </CardsLayout>
  );
});

CoolPictures.displayName = "Cool pictures";
export default CoolPictures;
