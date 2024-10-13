import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";
import Image from "next/image";

const DownloadCV = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>Here you can see a preview of my CV</h1>
        <h2>Click on the download button in order to download it as a PDF</h2>
        <a className="btn-secondary" href="/CVJaimeResano.pdf"><Image src="/images/download.svg" width="20" height="20" alt="Download PDF" className="select-none" draggable="false" priority={true}/> Download CV</a>
      </Card>
      <Card>
        <p>Me gustan los trenes</p>
      </Card>
    </CardsLayout>
  );
});

DownloadCV.displayName = "My links";
export default DownloadCV;
