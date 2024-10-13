import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";

const OPmobility = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>OPmobility, formerly known as Plastic Omnium</h1>
      </Card>
      <Card>
        <p>Me gustan los trenes</p>
      </Card>
    </CardsLayout>
  );
});

OPmobility.displayName = "OPmobility";
export default OPmobility;
