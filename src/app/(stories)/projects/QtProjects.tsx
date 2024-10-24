import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import GithubRepoLink from "@/components/story-widgets/GithubRepoLink";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { QtFont } from "@/misc/fonts";
import Image from "next/image";
import { forwardRef } from "react";

const QtProjects = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  return (
    <CardsLayout {...props} font={QtFont.className} ref={ref}>
      <Card>
        <div className="rounded-lg bg-qt-green p-2">
          <h1 className="text-center text-xl font-bold text-white">Qt projects</h1>
        </div>
        <p>
          <a href="https://www.qt.io/" target="_blank">
            Qt
          </a>{" "}
          is an extremely powerful{" "}
          <Tooltip>
            <TooltipTrigger>GUI</TooltipTrigger>
            <TooltipContent>Graphical User Interface</TooltipContent>
          </Tooltip>{" "}
          framework. I have been using it for many years in my personal and professional projects. I love the Python{" "}
          <Tooltip>
            <TooltipTrigger>bindings</TooltipTrigger>
            <TooltipContent>Allows the usage of the C++ library from Python</TooltipContent>
          </Tooltip>
          , which are called{" "}
          <q>
            <a className="styled-a" target="_blank" href="https://wiki.qt.io/Qt_for_Python">
              PySide
            </a>
          </q>
          . The combination of the capabilities of Qt and the development speed of Python is amazing.
        </p>
        <p>
          One of Qt's most notable strengths is its cross-platform compatibility. The Python, C++ or{" "}
          <a className="styled-a" href="https://doc.qt.io/qt-6/qtqml-index.html" target="_blank">
            QML
          </a>{" "}
          code you write can be executed on Windows, MacOS and Linux!
        </p>
        <p>Keep navigation in order to discover some of the projects I have done 😄</p>
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 text-xl font-bold dark:bg-slate-900">
          <h1 className="text-center">Technical drawing app</h1>
        </div>
        <p>
          This is the first big project I did while I was in high school. It is a 3D drawing app simulator that allows the student to draw{" "}
          <Tooltip>
            <TooltipTrigger>primitives</TooltipTrigger>
            <TooltipContent>Points, lines and planes</TooltipContent>
          </Tooltip>
          , visualize the space and perform operations between them.
        </p>
        <p>
          All the geometry handling is done by the program code. In order to draw the scene,{" "}
          <a className="styled-a" href="https://www.opengl.org/" target="_blank">
            OpenGL
          </a>{" "}
          is used.
        </p>
        <Image src="/images/TechnicalDrawingAppScreenshot.png" width="800" height="800" alt="Technical drawing app" className="w-full select-none" draggable="false" priority={true} />
        <GithubRepoLink href="https://github.com/Jaime02/Proyecto-de-investigacion-2020-Dibujo-tecnico" />
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 text-xl font-bold dark:bg-slate-900">
          <h1 className="text-center">QQuickSort</h1>
        </div>
        <p>
          During my second year of university, I coded a QuickSort algorithm simulation using PySide. That way I learned how QuickSort works and I helped my classmates to achieve the same goal. The
          demo shows a gorgeous animation of the sorting process.
        </p>
        <video autoPlay muted loop>
          <source src="/videos/QQuickSortDemo.mp4" type="video/mp4" />
          Sorry, your browser does not support the video tag
        </video>
        <GithubRepoLink href="https://github.com/Jaime02/QQuickSort" />
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 text-xl font-bold dark:bg-slate-900">
          <h1 className="text-center">Genetic algorithms</h1>
        </div>
        <p>
          This is a tool I built for a university subject in order to run{" "}
          <a className="styled-a" target="_blank" href="https://en.wikipedia.org/wiki/Genetic_algorithm">
            genetic algorithm
          </a>{" "}
          simulations with different parameters. Genetic algorithms are a set of techniques for solving optimization problems by using natural selection, which is the same process behind biological
          evolution.
        </p>
        <p>The program shows the results in a structured table and graphs with analytics of the results.</p>
        <Image src="/images/GeneticAlgorithms.webp" width="800" height="800" alt="Genetic algorithms" className="w-full select-none" draggable="false" priority={true} />
        <GithubRepoLink href="https://github.com/Jaime02/Genetic-Algorithm" />
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 text-xl font-bold dark:bg-slate-900">
          <h1 className="text-center">QKNNPainter</h1>
        </div>
        <p>
          This is a simple program I developed for a university subject in order to show an interactive demo of the{" "}
          <a className="styled-a" target="_blank" href="https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm">
            K-nearest neighbors
          </a>{" "}
          algorithm.
        </p>
        <p>
          The user can paint numbers in a black and white canvas using his mouse. Afterwards, the program will use the algorithm to identify the number drawn.
        </p>
        <Image src="/images/KNN.webp" width="800" height="800" alt="QKNNPainter" className="w-full select-none" draggable="false" priority={true} />
        <GithubRepoLink href="https://github.com/Jaime02/QKNNPainter" />
      </Card>
    </CardsLayout>
  );
});

QtProjects.displayName = "Qt projects";
export default QtProjects;
