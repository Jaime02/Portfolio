import { forwardRef } from "react";

interface CardProps {
  children: React.ReactNode;
  active?: boolean;
  padding?: boolean;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ children, active, padding, onMouseDown, onMouseUp }, ref) => {
  return (
    <div
      inert={!active ? true : undefined}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={`relative flex h-full max-h-full max-w-full min-w-full flex-col gap-3 overflow-y-auto rounded-md bg-white text-pretty dark:bg-[#343434] ${padding ? "p-2" : ""}`}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";
export default Card;
