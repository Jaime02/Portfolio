import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import {Link} from "@/translations/routing";
import { forwardRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Hiberus = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const t = useTranslations("Hiberus");
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <div className="rounded-lg bg-[#19245A] p-2">
          <h1 className="text-center text-xl font-bold text-white">Hiberus</h1>
        </div>
        <p>
          {t("1.1")}
        </p>
        <p>
          {t("1.2") + " "}
          <Link href="/experiences/upna" className="styled-a">
            UPNA
          </Link>
          .
        </p>
        <figure>
          <Image src="/images/HiberusFacade.jpg" alt={t("1.3")} width={800} height={800} />
          <figcaption className="text-center italic">{t("1.4")}</figcaption>
        </figure>
      </Card>
      <Card>
        <p>
          {t("2.1")}
        </p>
        <p>
          {t("2.2") + " "}
          <a href="https://dotnet.microsoft.com/en-us/apps/aspnet/mvc" target="_blank" className="styled-a">
            ASP.NET MVC
          </a>{" "}
          {t("2.3") + " "}
          <a href="https://dotnet.microsoft.com/es-es/languages/csharp" target="_blank" className="styled-a">
            C#
          </a>{" "}
          {t("2.4") + " "}
          <a href="https://www.microsoft.com/en-us/sql-server/" target="_blank" className="styled-a">
            SQL Server
          </a>
          . {t("2.5")} 😅.
        </p>
        <div className="flex h-fit flex-row gap-2 py-2 p-2 bg-ig-gray rounded-md">
          <div className="relative aspect-square grow">
            <Image src="/images/icons/dotNetIcon.svg" fill alt={t("2.6")} className="w-full select-none" draggable="false" priority={true} />
          </div>
          <div className="relative aspect-square grow">
            <Image src="/images/icons/CSharpIcon.svg" fill alt={t("2.7")} className="w-full select-none" draggable="false" priority={true} />
          </div>
          <div className="relative aspect-square grow">
            <Image src="/images/icons/SQLServerIcon.svg" fill alt={t("2.8")} className="w-full select-none" draggable="false" priority={true} />
          </div>
        </div>
      </Card>
    </CardsLayout>
  );
});

Hiberus.displayName = "Hiberus";
export default Hiberus;
