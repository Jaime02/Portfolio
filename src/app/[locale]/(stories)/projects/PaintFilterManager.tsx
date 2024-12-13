import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { OpMobilityFont } from "@/misc/fonts";
import { forwardRef } from "react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

function OPmobilityTitle({ title }: { title: string }) {
  return (
    <div className="font- rounded-lg bg-op-mobility-blue p-2 text-xl font-bold text-white">
      <h1 className="text-center">{title}</h1>
    </div>
  );
}

const PaintFilterManager = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const t = useTranslations("Paint Filter Manager");
  return (
    <CardsLayout {...props} ref={ref} font={OpMobilityFont.className}>
      <Card>
        <OPmobilityTitle title="Paint Filter Manager" />
        <p>
          {t("1.1") + " "}
          <a href="https://www.opmobility.com/en/" className="styled-a" target="_blank">
            OPmobility
          </a>
          {t("1.2")}
        </p>
        <p>{t("1.3")}</p>
        <Image src="/images/PFM.webp" width="800" height="800" alt={t("1.4")} className="w-full select-none" draggable="false" priority={true} />
      </Card>
      <Card>
        <OPmobilityTitle title={t("2.1")}/>
        <p>
          {t("2.2") + " "}
          <Tooltip>
            <TooltipTrigger>API</TooltipTrigger>
            <TooltipContent>
              {t("2.3")}
              <br />
              {t("2.4")}
            </TooltipContent>
          </Tooltip>{" "}
          {t("2.5") + " "}
          <a className="styled-a" target="_blank" href="https://flask.palletsprojects.com/en/stable/">
            Flask
          </a>
          .
        </p>
        <Image src="/images/PFMTable.webp" width="800" height="800" alt="Paint filter manager web table screenshot" className="w-full select-none" draggable="false" priority={true} />
      </Card>
      <Card>
        <OPmobilityTitle title={t("3.1")}/>
        <p>
          {t("3.2") + " "}
          <a href="https://kotlinlang.org/" className="styled-a" target="_blank">
            Kotlin
          </a>
          , {t("3.3")}
        </p>
        <div className="flex h-fit flex-row">
          <div className="flex h-fit flex-col">
            <h2 className="py-2 text-center text-lg font-bold">{t("3.4")}</h2>
            <ul className="ml-4 list-disc">
              <li>{t("3.5")}</li>
              <li>{t("3.6")}</li>
              <li>{t("3.7")}</li>
              <li>{t("3.8")}</li>
              <li>{t("3.9")}</li>
            </ul>
            <div className="relative my-4 self-end aspect-square w-full">
              <Image src="/images/icons/AndroidIcon.svg" alt={t("3.10")} fill className="mx-auto select-none" draggable="false" priority={true} />
            </div>
          </div>
          <div className="relative h-[50vh] grow">
            <Image src="/images/PFMApp.webp" fill sizes="50vw" alt={t("3.11")} className="select-none object-contain" draggable="false" priority={true} />
          </div>
        </div>
      </Card>
    </CardsLayout>
  );
});

PaintFilterManager.displayName = "Paint Filter Manager";
export default PaintFilterManager;
