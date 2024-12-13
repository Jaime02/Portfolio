import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef, useContext, useRef } from "react";

import StoryLocation from "@/components/story-widgets/StoryLocation";
import { SettingsContext } from "@/app/lib/SettingsContext";
import { useTranslations } from "next-intl";
import RainbowBackgroundContainer from "@/components/stories/RainbowBackgroundContainer";
import { StoryVideo } from "@/components/stories/StoryVideo";
import PlayVideoButton from "@/components/misc/PlayVideoButton";

const CoolPictures = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const tc = useTranslations("Commons");
  const t = useTranslations("Cool pictures");
  const { mutedStories } = useContext(SettingsContext);
  
  let videos = [
    new StoryVideo("/videos/Castle.mp4", <StoryLocation extraContainerClasses="left-[50%] top-[80%]" locationUrl="https://maps.app.goo.gl/4VmokxJJHsCYEdJK9" text={t("1.3")}/>),
    new StoryVideo("/videos/OPmobilityGolf.mp4"),
    new StoryVideo("/videos/WUG.mp4", <StoryLocation extraContainerClasses="left-[50%] top-[40%]" locationUrl="https://maps.app.goo.gl/H9x2NKCJj9mBMxLh8" text="Weißenburg in Bayern" />),
  ];

  return (
    <CardsLayout {...props} ref={ref} floatingHeader={true}>
      <Card>
        <RainbowBackgroundContainer>
          <h1>{t("1.1")} 😁</h1>
          <p className="text-lg font-bold">{t("1.2")} 😉 ➡️</p>
        </RainbowBackgroundContainer>
      </Card>
      {videos.map((video, index) => (
        <Card key={index}>
          <PlayVideoButton/>
          <video
            width={0}
            height={0}
            className="max-h-full w-full my-auto"
            muted={mutedStories}
            loop
          >
            <source src={video.url} type="video/mp4" />
            {tc("No video tag support")}
          </video>
          {video.extraComponents}
        </Card>
      ))}
    </CardsLayout>
  );
});

CoolPictures.displayName = "Cool pictures";
export default CoolPictures;
