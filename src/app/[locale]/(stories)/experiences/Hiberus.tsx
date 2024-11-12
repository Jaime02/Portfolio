import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import {Link} from "@/translations/routing";
import { forwardRef } from "react";
import Image from "next/image";

const Hiberus = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <div className="rounded-lg bg-[#19245A] p-2">
          <h1 className="text-center text-xl font-bold text-white">Hiberus</h1>
        </div>
        <p>
          Hiberus is a Spanish consulting company specialized in software development and digitalization. Since its founding in 2011, it has experienced a remarkable exponential growth. As of 2024, it
          employs more than 3300 employees in 32 countries.
        </p>
        <p>
          I worked in fall 2023 as a software developer intern thanks to my university, the{" "}
          <Link href="/experiences/upna" className="styled-a">
            UPNA
          </Link>
          .
        </p>
        <figure>
          <Image src="/images/HiberusFacade.jpg" alt="Hiberus office" width={800} height={800} />
          <figcaption className="text-center italic">Hiberus headquarters in Zaragoza</figcaption>
        </figure>
      </Card>
      <Card>
        <p>
          During the internship, I developed a internal tool for the company. It was a web app intended to be used by the HR department in order to manage candidates and job offers.
        </p>
        <p>
          It was a{" "}
          <a href="https://dotnet.microsoft.com/en-us/apps/aspnet/mvc" target="_blank" className="styled-a">
            ASP.NET MVC
          </a>{" "}
          application which used{" "}
          <a href="https://dotnet.microsoft.com/es-es/languages/csharp" target="_blank" className="styled-a">
            C#
          </a>{" "}
          and{" "}
          <a href="https://www.microsoft.com/en-us/sql-server/" target="_blank" className="styled-a">
            SQL Server
          </a>
          . However, I have no pictures or code of the project 😅.
        </p>
        <div className="flex h-fit flex-row gap-2 py-2 p-2 bg-ig-gray rounded-md">
          <div className="relative aspect-square grow">
            <Image src="/images/icons/dotNetIcon.svg" fill alt=".NET logo" className="w-full select-none" draggable="false" priority={true} />
          </div>
          <div className="relative aspect-square grow">
            <Image src="/images/icons/CSharpIcon.svg" fill alt="C sharp logo" className="w-full select-none" draggable="false" priority={true} />
          </div>
          <div className="relative aspect-square grow">
            <Image src="/images/icons/SQLServerIcon.svg" fill alt="C sharp logo" className="w-full select-none" draggable="false" priority={true} />
          </div>
        </div>
      </Card>
    </CardsLayout>
  );
});

Hiberus.displayName = "Hiberus";
export default Hiberus;
