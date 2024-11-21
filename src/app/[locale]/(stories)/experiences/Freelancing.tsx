import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";

const Freelancing = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const t = useTranslations("Freelancing");
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <p>
          {t("1.1") + " "}
          <Tooltip>
            <TooltipTrigger>freelance</TooltipTrigger>
            <TooltipContent>{t("1.2")}</TooltipContent>
          </Tooltip>{" "}
          {t("1.3") + " "}
          <a href="https://www.fiverr.com/" target="_blank" className="styled-a">
            Fiverr
          </a>{" "}
          {t("1.4") + " "}
          <a href="https://www.upwork.com/" target="_blank" className="styled-a">
            Upwork
          </a>
          .
        </p>
        <p>
          {t("2.1")} <span className="font-bold italic">{t("2.2")}</span> {t("2.3")} 😜)
        </p>
        <Image src="/images/FreelancingMeme.webp" width="600" height="600" alt={t("2.4")} className="w-[70%] mx-auto select-none" draggable="false" priority={true} />
      </Card>
      <Card>
        <div className="rounded-lg bg-[#1DBF73] p-2">
          <h1 className="text-center text-xl font-bold text-white">Fiverr</h1>
        </div>
        <p>{t("3.1")}</p>
        <p>{t("3.2")} ⭐</p>
        <Image src="/images/FiverrProfile.png" width="600" height="600" alt={t("3.3")} className="w-full select-none" draggable="false" priority={true} />
        <a className="btn-primary mx-auto bg-[#1DBF73] text-lg" href="https://www.fiverr.com/jaime_02" target="_blank">
          {t("3.4")}
        </a>
      </Card>
      <Card>
        <div className="rounded-lg bg-[#14a800] p-2">
          <h1 className="text-center text-xl font-bold text-white">Upwork</h1>
        </div>
        <p>{t("4.1")}</p>
        <p>
          {t("4.2")} <span className="font-bold">{t("4.3")}</span>. {t("4.4")} 😡
        </p>
        <p>{t("4.5")} 👎🏻</p>
      </Card>
    </CardsLayout>
  );
});

Freelancing.displayName = "Freelancing";
export default Freelancing;
