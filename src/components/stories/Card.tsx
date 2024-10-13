import { forwardRef } from "react";

const Card  = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {  
  return <div ref={ref} className="flex min-w-full flex-col rounded-md bg-white dark:bg-[#343434] snap-center p-2">{children}</div>; 
});

Card.displayName = "Card";
export default Card;