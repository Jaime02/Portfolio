import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef, useRef } from "react";
import SpanishFlagIcon from "@/icons/SpanishFlagIcon";
import { StoryVideo } from "@/misc/Constants";

const Crispin = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  
  const videoRefs = useRef<(HTMLVideoElement)[]>([]);
  
  let presentationSign = (
    <div className="absolute left-[50%] top-[18%] z-10 flex h-[24%] w-[90%] translate-x-[-50%] translate-y-[-50%] flex-col justify-center rounded-md p-2 backdrop-blur-lg">
      <p className="text-pretty font-bold text-black sm:text-xl">
        This is my dog, <span className="font-extrabold">Crispin</span>. He is a handsome and loyal dog. It is a mix between an American Standford and an Alano Español{" "}
        <SpanishFlagIcon extraClasses="size-4 inline" />
      </p>
    </div>
  );

  let videos = [
    new StoryVideo("/videos/CrispinMerryChristmas.mp4", presentationSign),
    new StoryVideo("/videos/CrispinSofa.mp4"),
    new StoryVideo("/videos/CrispinStaring.mp4"),
    new StoryVideo("/videos/CrispinSad.mp4"),
    new StoryVideo("/videos/CrispinField.mp4"),
    new StoryVideo("/videos/CrispinJumping.mp4"),
  ];

  return (
    <CardsLayout {...props} ref={ref} floatingHeader={true} videoRefs={videoRefs}>
      {videos.map((video, index) => (
        <Card key={index}>
          <video
            width={0}
            height={0}
            className="max-h-full w-full"
            muted
            loop
            ref={(el: HTMLVideoElement) => {
              videoRefs.current[index] = el;
            }}
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

Crispin.displayName = "Crispin";
export default Crispin;
