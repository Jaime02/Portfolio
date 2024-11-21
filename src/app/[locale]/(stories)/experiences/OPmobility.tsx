import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";
import Image from "next/image";
import LocalLink from "@/components/stories/LocalLink";
import { useTranslations } from "next-intl";

const OPmobility = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const t = useTranslations("OPmobility");
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <p>
          {t("1.1")}
        </p>
        <Image src="/images/OPmobilityCover.jpg" width="800" height="800" alt={t("1.2")} className="w-full select-none" draggable="false" priority={true} />
        <p>
          {t("1.3")}
        </p>
      </Card>
      <Card>
        <p>
          {t("2.1") + " "}
          <a href="https://maps.app.goo.gl/yBuLXer4L76MqEeU9" target="_blank" className="styled-a">
            Pappenheim
          </a>
          . {t("2.2")}
        </p>
        <Image src="/images/OPmobilityPappenheim.png" width="800" height="800" alt={t("2.3")} className="w-full select-none" draggable="false" priority={true} />
        <Image src="/images/OPmobilityBumper.jpg" width="800" height="800" alt={t("2.4")} className="w-full select-none" draggable="false" priority={true} />
      </Card>
      <Card>
        <p>
          {t.rich("3.1", {q: (chunk) => <q>{chunk}</q>})}
        </p>
        <Image src="/images/PFM.webp" width="800" height="800" alt="Paint filter manager web" className="w-full select-none" draggable="false" priority={true} />
        <LocalLink href="/projects/paint-filter-manager">
          {t("3.2")}
        </LocalLink>
      </Card>
    </CardsLayout>
  );
});

OPmobility.displayName = "OPmobility";
export default OPmobility;
