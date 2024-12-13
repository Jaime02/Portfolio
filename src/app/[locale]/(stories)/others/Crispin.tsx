import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef, useContext } from "react";
import SpanishFlagIcon from "@/icons/SpanishFlagIcon";
import { SettingsContext } from "@/app/lib/SettingsContext";
import { useTranslations } from "next-intl";
import { StoryVideo } from "@/components/stories/StoryVideo";

const Crispin = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const t = useTranslations("Crispin");
  const tc = useTranslations("Commons");
  const { mutedStories } = useContext(SettingsContext);
  
  let presentationSign = (
    <div className="absolute left-[50%] top-[16%] z-10 flex w-[90%] translate-x-[-50%] translate-y-[-50%] flex-col justify-center rounded-md p-1">
      <p className="text-pretty font-bold text-black sm:text-xl">
        {t("1.1")} <span className="font-extrabold">Crispín</span>{t("1.2") + " "}
        <SpanishFlagIcon extraClasses="size-6 inline" />
      </p>
    </div>
  );

  let videos = [
    new StoryVideo("/videos/CrispinHandsome.mp4", presentationSign),
    new StoryVideo("/videos/CrispinSofa.mp4"),
    new StoryVideo("/videos/CrispinStaring.mp4"),
    new StoryVideo("/videos/CrispinSad.mp4"),
    new StoryVideo("/videos/CrispinField.mp4"),
    new StoryVideo("/videos/CrispinJumping.mp4"),
  ];

  return (
    <CardsLayout {...props} ref={ref} floatingHeader={true}>
      {videos.map((video, index) => (
        <Card key={index}>
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

Crispin.displayName = "Crispin";
export default Crispin;
