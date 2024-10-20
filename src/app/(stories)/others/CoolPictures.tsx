import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";

const CoolPictures = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>Hey, are you still here? I have nothing else to show you... well... here you have, some cool pictures &#128513;</h1>
      </Card>
      <Card>
        <h1>TO DO</h1>
      </Card>
    </CardsLayout>
  );
});

CoolPictures.displayName = "Cool pictures";
export default CoolPictures;
