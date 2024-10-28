import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef, useRef } from "react";
import { StoryVideo } from "@/misc/Constants";
import StoryLocation from "@/components/story-widgets/StoryLocation";

const CoolPictures = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  let videos = [
    new StoryVideo("/videos/Castle.mp4", <StoryLocation extraContainerClasses="left-[50%] top-[80%]" locationUrl="https://maps.app.goo.gl/4VmokxJJHsCYEdJK9" text="Neuschwanstein castle"/>),
    new StoryVideo("/videos/OPmobilityGolf.mp4"),
    new StoryVideo("/videos/WUG.mp4", <StoryLocation extraContainerClasses="left-[50%] top-[40%]" locationUrl="https://maps.app.goo.gl/H9x2NKCJj9mBMxLh8" text="Weißenburg in Bayern" />),
  ];

  return (
    <CardsLayout {...props} ref={ref} floatingHeader={true}>
      <Card>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
          <h1>Hey, are you still here? I have nothing else to show you... well... here you have, some cool pictures &#128513;</h1>
          <p className="text-lg font-bold">Keep scrolling 😉 ➡️</p>
        </div>
      </Card>
      {videos.map((video, index) => (
        <Card key={index}>
          <video
            width={0}
            height={0}
            className="max-h-full w-full"
            muted
            loop
          >
            <source src={video.url} type="video/mp4" />
            Sorry, your browser does not support the video tag
          </video>
          {video.extraComponents}
        </Card>
      ))}
    </CardsLayout>
  );
});

CoolPictures.displayName = "Cool pictures";
export default CoolPictures;
