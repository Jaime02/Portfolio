import ThreeColumnsGrid from "../history-components/ThreeColumnsGrid";
import Image from 'next/image';

export default function ExperienceTab({id}: {id: string}) {
  return (
    <div id={id} className="min-w-full snap-center"> 
      <ThreeColumnsGrid>
        <Image src="/images/2.svg" alt="Project 2" className="select-none" draggable="false" width="300" height="300"/>
        <Image src="/images/3.svg" alt="Project 3" className="select-none" draggable="false" width="300" height="300"/>
        <Image src="/images/4.svg" alt="Project 4" className="select-none" draggable="false" width="300" height="300"/>
      </ThreeColumnsGrid>
    </div>
  );
}
