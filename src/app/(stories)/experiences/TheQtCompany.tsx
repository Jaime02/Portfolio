import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import QtLogo from "@/icons/QtLogo";
import { forwardRef } from "react";

const TheQtCompany = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <div className="flex flex-col items-center gap-2 p-2 h-full justify-center">
          <h1 className="text-lg">
            <span className="italic">To be continued...</span>😉
          </h1>
          <QtLogo extraClasses="h-auto w-[50%] select-none"/>
          <p>October 2024 - ?</p>
        </div>
      </Card>
    </CardsLayout>
  );
});

TheQtCompany.displayName = "The Qt Company";
export default TheQtCompany;
