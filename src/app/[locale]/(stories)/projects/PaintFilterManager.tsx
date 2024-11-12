import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { OpMobilityFont } from "@/misc/fonts";
import { forwardRef } from "react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function OPmobilityTitle({ title }: { title: string }) {
  return (
    <div className="font- rounded-lg bg-op-mobility-blue p-2 text-xl font-bold text-white">
      <h1 className="text-center">{title}</h1>
    </div>
  );
}

const PaintFilterManager = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref} font={OpMobilityFont.className}>
      <Card>
        <OPmobilityTitle title="Paint Filter Manager" />
        <p>
          During my internship in{" "}
          <a href="https://www.opmobility.com/en/" className="styled-a" target="_blank">
            OPmobility
          </a>
          , I developed a customized web and mobile application for managing the filters of the paint line.
        </p>
        <p>In the following image, you can see a screenshot of the initial page of the website application. It shows a table with information about each filter.</p>
        <Image src="/images/PFM.webp" width="800" height="800" alt="Paint filter manager web screenshot" className="w-full select-none" draggable="false" priority={true} />
      </Card>
      <Card>
        <OPmobilityTitle title="Website" />
        <p>
          I chose a web sollution because I needed to save and synchronize data between multiple devices in real time. The server acts as a web server and an{" "}
          <Tooltip>
            <TooltipTrigger>API</TooltipTrigger>
            <TooltipContent>
              Application Programming Interface
              <br />
              Software that can interact with other software sending and receiving requests
            </TooltipContent>
          </Tooltip>{" "}
          at the same time. The server code written in Python and uses the library{" "}
          <a className="styled-a" target="_blank" href="https://flask.palletsprojects.com/en/stable/">
            Flask
          </a>
          .
        </p>
        <Image src="/images/PFMTable.webp" width="800" height="800" alt="Paint filter manager web table screenshot" className="w-full select-none" draggable="false" priority={true} />
      </Card>
      <Card>
        <OPmobilityTitle title="Android app" />
        <p>
          The user can use an Android native app to interact with the system. The app is written in{" "}
          <a href="https://kotlinlang.org/" className="styled-a" target="_blank">
            Kotlin
          </a>
          , which is the standard language for Android.
        </p>
        <div className="flex h-fit flex-row">
          <div className="flex h-fit flex-col">
            <h2 className="py-2 text-center text-lg font-bold">Features:</h2>
            <ul className="ml-4 list-disc">
              <li>QR code scanner</li>
              <li>Responsive design</li>
              <li>Dark mode</li>
              <li>Translations</li>
              <li>Offline mode</li>
            </ul>
            <div className="relative my-4 self-end aspect-square w-full">
              <Image src="/images/icons/AndroidIcon.svg" alt="Android icon" fill className="mx-auto select-none" draggable="false" priority={true} />
            </div>
          </div>
          <div className="relative h-[50vh] grow">
            <Image src="/images/PFMApp.webp" fill alt="Paint filter manager Android app screenshot" className="select-none object-contain" draggable="false" priority={true} />
          </div>
        </div>
      </Card>
    </CardsLayout>
  );
});

PaintFilterManager.displayName = "Paint Filter Manager";
export default PaintFilterManager;
