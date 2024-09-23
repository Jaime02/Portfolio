import { forwardRef } from "react";

const Card  = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => {  
  return <div ref={ref} className="flex min-w-full flex-col bg-white dark:bg-[#343434] snap-center">{children}</div>; 
});

export default Card;