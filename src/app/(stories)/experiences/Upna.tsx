import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";

const Upna = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>La puta Upna, tremendo mierdon</h1>
      </Card>
      <Card>
        <p>Me gustan los trenes</p>
      </Card>
    </CardsLayout>
  );
});

Upna.displayName = "Upna";
export default Upna;
