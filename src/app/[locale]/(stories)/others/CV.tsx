import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";
import Image from "next/image";
import DownloadIcon from "@/icons/DownloadIcon";

const CV = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <p>Here you can see a preview of my CV. Click on the download button in order to download it as a PDF. Use it wisely!</p>
        <Image src={"/images/CVPreview.webp"} width="800" height="800" alt="CV preview" className="w-full select-none max-h-[70%] object-contain" draggable="false" priority={true} />
        <a className="btn-primary text-white mx-auto text-lg" target="_blank" href="/CVJaimeResano.pdf">
          <DownloadIcon extraClasses="size-6"/> Download CV
        </a>
      </Card>
    </CardsLayout>
  );
});

CV.displayName = "Curriculum Vitae";
export default CV;
