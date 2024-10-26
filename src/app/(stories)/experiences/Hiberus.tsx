import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import Link from "next/link";
import { forwardRef } from "react";

const Hiberus = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <div className="rounded-lg bg-[#19245A] p-2">
          <h1 className="text-center text-xl font-bold text-white">Hiberus</h1>
        </div>
        <p>
          Hiberus is a Spanish consulting company specialized in software development and digitalization. Founded in 2011, it has grown at an exponential rate. As of 2024, it employs more than 3300
          employees in 32 countries.
        </p>
        <p>
          I worked in fall 2023 as a software developer intern thanks to my university, the{" "} 
          <Link href="/experiences/upna" className="styled-a">
            UPNA
          </Link>
          . 
        </p>
        <p>
          During the internship, I developed a internal tool for the company. It was a web app intended to be used by the HR department in order to manage candidates and job offers. It was a{" "}
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
      </Card>
    </CardsLayout>
  );
});

Hiberus.displayName = "Hiberus";
export default Hiberus;
