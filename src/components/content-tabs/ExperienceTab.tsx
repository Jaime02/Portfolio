import ThreeColumnsGrid from "@/components/misc/ThreeColumnsGrid";
import Image from 'next/image';
import { forwardRef } from "react";

interface Props {}

const ExperienceTab = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  return (
    <div className="min-w-full snap-center"> 
      <ThreeColumnsGrid>
        <Image src="/images/2.svg" alt="Project 2" className="select-none" draggable="false" width="300" height="300"/>
        <Image src="/images/3.svg" alt="Project 3" className="select-none" draggable="false" width="300" height="300"/>
        <Image src="/images/4.svg" alt="Project 4" className="select-none" draggable="false" width="300" height="300"/>
      </ThreeColumnsGrid>
    </div>
  );
});

export default ExperienceTab;
