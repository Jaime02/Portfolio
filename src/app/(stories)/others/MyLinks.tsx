import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";

const MyLinks = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>Only flans: coming soon</h1>
      </Card>
      <Card>
        <p>Me gustan los trenes</p>
      </Card>
    </CardsLayout>
  );
});

MyLinks.displayName = "My links";
export default MyLinks;
