import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";

const PaintFilterManager = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>FISISTU?</h1>
      </Card>
      <Card>
        <h1>FISESTU MI KAPITAN</h1>
      </Card>
    </CardsLayout>
  );
});

PaintFilterManager.displayName = "Paint Filter Manager";
export default PaintFilterManager;
