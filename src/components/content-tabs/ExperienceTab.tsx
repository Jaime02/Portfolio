import ThreeColumnsGrid from "@/components/misc/ThreeColumnsGrid";
import Image from 'next/image';
import { forwardRef } from "react";

interface Props {
  index: number;
}

const ExperienceTab = forwardRef<HTMLDivElement, Props>(({index}: Props, ref) => {
  return (
    <div ref={ref} data-index={index} className="min-w-full snap-center"> 
      <ThreeColumnsGrid>
        <Image src="/images/2.svg" alt="Project 2" className="select-none" draggable="false" width="300" height="300"/>
        <Image src="/images/3.svg" alt="Project 3" className="select-none" draggable="false" width="300" height="300"/>
        <Image src="/images/4.svg" alt="Project 4" className="select-none" draggable="false" width="300" height="300"/>
      </ThreeColumnsGrid>
    </div>
  );
});

ExperienceTab.displayName = "Experience Tab";
export default ExperienceTab;
