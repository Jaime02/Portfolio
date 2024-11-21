import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import {Link} from "@/translations/routing";
import { forwardRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Upna = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const t = useTranslations("Upna");
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <p>{t("1.1")} <Link className="styled-a" href="/projects/paint-filter-manager">Paint filter manager</Link> {t("1.2")}</p> 
        <figure>
        <Image src="/images/UPNACampus.webp" alt={t("1.3")} width={600} height={600} />
          <figcaption className="text-center italic">{t("1.3")}</figcaption>
        </figure>
        <p>{t("1.4")}</p>
      </Card>
      <Card>
        <p>{t("1.5")} 🙈</p>
        <Image src="/images/UPNAMe.png" alt={t("1.6")} width={600} height={600} />
      </Card>
    </CardsLayout>
  );
});

Upna.displayName = "Upna";
export default Upna;
