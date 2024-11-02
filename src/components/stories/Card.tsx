import { forwardRef } from "react";

interface CardProps {
  children: React.ReactNode;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
  padding?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ children, onMouseDown, onMouseUp, padding }, ref) => {
  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUpCapture={onMouseUp}
      className={`relative flex h-full min-w-full max-w-full flex-col gap-2 overflow-y-auto text-pretty rounded-md bg-white dark:bg-[#343434] ${padding ? "p-2" : ""}`}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";
export default Card;
