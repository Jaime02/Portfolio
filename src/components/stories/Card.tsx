import { forwardRef } from "react";

const Card = forwardRef<HTMLDivElement, { children: React.ReactNode, padding?: boolean }>(({ children, padding }, ref) => {  
  return (
    <div ref={ref} className={`flex relative min-w-full max-w-full flex-col gap-2 overflow-auto rounded-md text-pretty bg-white dark:bg-[#343434] ${padding ? "p-2" : ""}`}>
      {children}
    </div>
  );
});

Card.displayName = "Card";
export default Card;
