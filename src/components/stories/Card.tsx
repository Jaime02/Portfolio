import { forwardRef } from "react";

const Card = forwardRef<HTMLDivElement, { onMouseDown: React.MouseEventHandler<HTMLDivElement>, onMouseUp: React.MouseEventHandler<HTMLDivElement>, children: React.ReactNode, padding?: boolean }>(({ children, onMouseDown, onMouseUp, padding }, ref) => {  
  return (
    <div ref={ref} onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={`flex relative min-w-full max-w-full h-full flex-col gap-2 rounded-md text-pretty bg-white dark:bg-[#343434] ${padding ? "p-2" : ""}`}>
      {children}
    </div>
  );
});

Card.displayName = "Card";
export default Card;
