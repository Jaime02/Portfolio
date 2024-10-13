import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";

const Hiberus = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>Hiberus</h1>
      </Card>
    </CardsLayout>
  );
});

Hiberus.displayName = "Hiberus";
export default Hiberus;
