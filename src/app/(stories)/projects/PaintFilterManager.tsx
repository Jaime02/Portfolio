import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";

const PaintFilterManager = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 text-xl font-bold dark:bg-slate-900">
          <h1 className="text-center">LiveGL</h1>
        </div>
      </Card>
      <Card>
        <h1>FISESTU MI KAPITAN</h1>
      </Card>
    </CardsLayout>
  );
});

PaintFilterManager.displayName = "Paint Filter Manager";
export default PaintFilterManager;
