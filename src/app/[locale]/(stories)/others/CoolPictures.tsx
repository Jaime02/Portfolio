import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef, useContext } from "react";
import Image from "next/image";
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
    new StoryVideo(
      "/videos/Castle.mp4",
      <StoryLocation
        extraContainerClasses="left-[50%] top-[80%]"
        locationUrl="https://maps.app.goo.gl/4VmokxJJHsCYEdJK9"
        text={t("1.3")}
      />,
    ),
    new StoryVideo("/videos/OPmobilityGolf.mp4"),
    new StoryVideo(
      "/videos/WUG.mp4",
      <StoryLocation
        extraContainerClasses="left-[50%] top-[95%]"
        locationUrl="https://maps.app.goo.gl/H9x2NKCJj9mBMxLh8"
        text="Weißenburg in Bayern"
      />,
    ),
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
          <PlayVideoButton />
          <video width={0} height={0} className="my-auto max-h-full w-full" muted={mutedStories} loop>
            <source src={video.url} type="video/mp4" />
            {tc("No video tag support")}
          </video>
          {video.extraComponents}
        </Card>
      ))}
      <Card>
        <Image
          src="/images/BerlinSnow.jpeg"
          width="600"
          height="400"
          alt={t("5.1")}
          className="my-auto w-full select-none"
          draggable="false"
        />
        <p className="absolute top-[95%] left-[50%] z-10 translate-x-[-50%] translate-y-[-50%] font-bold text-pretty text-white sm:text-xl">
          {t("5.1")}
        </p>
      </Card>
      <Card>
        <Image
          src="/images/PotsdamBike.jpeg"
          width="600"
          height="400"
          alt={t("6.1")}
          className="my-auto w-full select-none"
          draggable="false"
        />
        <p className="absolute top-[95%] left-[50%] z-10 w-full translate-x-[-50%] translate-y-[-50%] text-center font-bold text-pretty text-white sm:text-xl">
          {t("6.1")}😂
        </p>
      </Card>
    </CardsLayout>
  );
});

CoolPictures.displayName = "Cool pictures";
export default CoolPictures;
