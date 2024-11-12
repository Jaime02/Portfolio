import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";
import Image from "next/image";
import LocalLink from "@/components/stories/LocalLink";

const OPmobility = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <p>
          OPmobility, formerly known as Plastic Omnium, is a global company specialized in the development, production and sale of mobility solutions. It is focused in the automotive industry, but is
          exploring emerging sectors such as hydrogen or energy storage.
        </p>
        <Image src="/images/OPmobilityCover.jpg" width="800" height="800" alt="OPmobility cover" className="w-full select-none" draggable="false" priority={true} />
        <p>
          It employs more than 40000 people in 40 research and development centers and 152 plants distributed in 28 countries. In fact, 1 in every 5 vehicles manufactured worlwide is equipped by the
          company!
        </p>
      </Card>
      <Card>
        <p>
          I worked as a software engineer intern in a plant of the group located in Bavaria, in the village of{" "}
          <a href="https://maps.app.goo.gl/yBuLXer4L76MqEeU9" target="_blank" className="styled-a">
            Pappenheim
          </a>
          . This plant mainly produces car bumpers for costumers such as Audi and BMW.
        </p>
        <Image src="/images/OPmobilityPappenheim.png" width="800" height="800" alt="OPmobility pappenheim plant" className="w-full select-none" draggable="false" priority={true} />
        <Image src="/images/OPmobilityBumper.jpg" width="800" height="800" alt="Car bumper" className="w-full select-none" draggable="false" priority={true} />
      </Card>
      <Card>
        <p>
          During the internship, I developed the <q>Paint Filter Manager</q> project. It was a wonderful experience to be working in that environment full of motivaded people.
        </p>
        <Image src="/images/PFM.webp" width="800" height="800" alt="Paint filter manager web" className="w-full select-none" draggable="false" priority={true} />
        <LocalLink href="/projects/paint-filter-manager">
          Go to Paint Filter Manager project
        </LocalLink>
      </Card>
    </CardsLayout>
  );
});

OPmobility.displayName = "OPmobility";
export default OPmobility;
