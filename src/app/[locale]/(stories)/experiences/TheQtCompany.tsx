import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import QtLogo from "@/icons/QtLogo";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";
import Image from "next/image";

const TheQtCompany = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const t = useTranslations("The Qt Company");
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <div className="bg-qt-green rounded-lg p-2">
          <h1 className="text-center text-xl font-bold text-white">{t("1.1")}</h1>
        </div>
        <p>{t("1.2")}</p>
        <QtLogo extraClasses="h-auto mx-auto w-[40%] select-none" />
        <figure>
          <Image src="/images/BerlinMe.webp" alt={t("1.3")} width="600" height="600" />
          <figcaption className="text-center italic">{t("1.3")}🥰</figcaption>
        </figure>
      </Card>
      <Card>
        <div className="bg-qt-green rounded-lg p-2">
          <h1 className="text-center text-xl font-bold text-white">{t("1.1")}</h1>
        </div>
        <p>{t("2.1")}</p>
        <figure>
          <Image src="/images/QtDesignStudio.webp" alt={t("2.2")} width="600" height="600" />
          <figcaption className="text-center italic">{t("2.2")}</figcaption>
        </figure>
      </Card>
    </CardsLayout>
  );
});

TheQtCompany.displayName = "The Qt Company";
export default TheQtCompany;
