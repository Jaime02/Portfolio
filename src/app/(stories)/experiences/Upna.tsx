import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import Link from "next/link";
import { forwardRef } from "react";
import Image from "next/image";

const Upna = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <h1>Public University of Navarra. <q>UPNA</q></h1> 
        <p>I am a Computer Engineering graduate at the UPNA. I started in 2020 during the pandemic apocalypse and I finished the degee in 2024. I developed the <Link className="styled-a" href="/projects/paint-filter-manager">Paint filter manager</Link> project in my thesis.</p> 
        <Image src="/images/UPNACampus.webp" alt="UPNA campus" width={600} height={600} />
        <p>Briefly, the career was not a easy process and required some effort, sweat and tears. In the end, it has allowed me to have excellent experiences, so I guess it was worth it.</p>
      </Card>
    </CardsLayout>
  );
});

Upna.displayName = "Upna";
export default Upna;
