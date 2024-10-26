import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Freelancing = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <p>
          I started working as a{" "}
          <Tooltip>
            <TooltipTrigger>freelance</TooltipTrigger>
            <TooltipContent>Someone who does particular pieces of work for different organizations, rather than working all the time for a single organization</TooltipContent>
          </Tooltip>{" "}
          in 2021. It was a great way of learn by doing doing projects and getting paid at same time. I worked with different clients and even small companies. First, I joined{" "}
          <a href="https://www.fiverr.com/" target="_blank" className="styled-a">
            Fiverr
          </a>{" "}
          and then{" "}
          <a href="https://www.upwork.com/" target="_blank" className="styled-a">
            Upwork
          </a>
          .
        </p>
        <p>
          After working for <span className="font-bold italic">many, many</span> hours, I have earned about 2500 euros in total (but don&apos;t tell tax authorities 😜)
        </p>
        <Image src="/images/FreelancingMeme.webp" width="600" height="600" alt="Freelancing meme" className="w-[70%] mx-auto select-none" draggable="false" priority={true} />
      </Card>
      <Card>
        <div className="rounded-lg bg-[#1DBF73] p-2">
          <h1 className="text-center text-xl font-bold text-white">Fiverr</h1>
        </div>
        <p>It is a user-friendly freelancing platform, making it easy for freelancers and clients to connect and collaborate.</p>
        <p>I have completed more than 50 orders and received more than 30 positive reviews, achieving an average rating of 4.9 ⭐</p>
        <Image src="/images/FiverrProfile.png" width="600" height="600" alt="Fiverr logo" className="w-full select-none" draggable="false" priority={true} />
        <a className="btn-primary mx-auto bg-[#1DBF73] text-lg" href="https://www.fiverr.com/jaime_02" target="_blank">
          Hire me on Fiverr
        </a>
      </Card>
      <Card>
        <div className="rounded-lg bg-[#14a800] p-2">
          <h1 className="text-center text-xl font-bold text-white">Upwork</h1>
        </div>
        <p>Upwork is a freelancing platform that connects businesses with freelancers. It offers more control over the contract and payment process than Fiverr.</p>
        <p>
          I worked there from 2022 to 2024. However, <span className="font-bold">a client scammed me 700 euros</span>. I had a terrible experience with the upwork costumer support, they finally did
          not belive me and even blocked my account!
        </p>
        <p>Due to the scam, I no longer recommend the platform 😡</p>
      </Card>
    </CardsLayout>
  );
});

Freelancing.displayName = "Freelancing";
export default Freelancing;
