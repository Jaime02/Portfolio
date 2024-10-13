import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";

const Freelancing = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>Freelancing</h1>
      </Card>
      <Card>
        <h1>Upwork</h1>
      </Card>
      <Card>
        <h1>Fiverr</h1>
      </Card>
    </CardsLayout>
  );
});

Freelancing.displayName = "Freelancing";
export default Freelancing;
