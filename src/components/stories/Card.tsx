import { forwardRef } from "react";

const Card = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {
  return (
    <div ref={ref} className="flex min-w-full max-w-full snap-center flex-col gap-2 overflow-auto text-pretty rounded-md bg-white p-2 dark:bg-[#343434]">
      {children}
    </div>
  );
});

Card.displayName = "Card";
export default Card;
