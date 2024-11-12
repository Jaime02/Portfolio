import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import { forwardRef } from "react";
import Image from "next/image";
import GithubRepoLink from "@/components/story-widgets/GithubRepoLink";

const LiveGL = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} ref={ref}>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 text-xl font-bold dark:bg-slate-900">
          <h1 className="animate-moving-background bg-gradient-to-r from-orange-600 via-blue-500 to-green-400 bg-300% bg-clip-text text-center text-transparent">LiveGL</h1>
        </div>
        <p>
          This is a simple tool I developed for a university subject in order to test{" "}
          <a className="styled-a" target="_blank" href="https://www.opengl.org/">
            OpenGL
          </a>{" "}
          shaders in real time. The user can edit the fragment and vertex shaders source code and the program will recompile and execute them on demand. Watch out, it is written in ancient Java.
        </p>
        <Image src="/images/LiveGL.webp" width="800" height="800" alt="LiveGL screenshot" className="w-full select-none" draggable="false" priority={true} />
        <GithubRepoLink href="https://github.com/Jaime02/LiveGL" />
      </Card>
    </CardsLayout>
  );
});

LiveGL.displayName = "LiveGL";
export default LiveGL;
