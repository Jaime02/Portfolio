import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import HeaderThumbnail from "@/components/stories/HeaderThumbnail";
import Image from "next/image";
import { forwardRef } from "react";

const TheQtCompany = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>The Qt Company</h1>
        <Image src="/images/QtLogo.svg" width="500" height="500" alt="Qt logo" className="h-auto w-auto select-none" draggable="false" />
      </Card>
      <Card>
        <p>Ah sos reputo</p>
      </Card>
    </CardsLayout>
  );
});

TheQtCompany.displayName = "The Qt Company";
export default TheQtCompany;
