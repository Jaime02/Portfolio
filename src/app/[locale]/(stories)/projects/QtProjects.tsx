import Card from "@/components/stories/Card";
import CardsLayout, { CardsLayoutProps } from "@/components/stories/CardsLayout";
import GithubRepoLink from "@/components/story-widgets/GithubRepoLink";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { QtFont } from "@/misc/fonts";
import Image from "next/image";
import {Link} from "@/translations/routing";
import { forwardRef } from "react";
import { useTranslations } from "next-intl";
import QtLogo from "@/icons/QtLogo";

const QtProjects = forwardRef<HTMLDivElement, CardsLayoutProps>((props, ref) => {
  const tc = useTranslations('Commons');
  const t = useTranslations('Qt projects');
  return (
    <CardsLayout {...props} font={QtFont.className} ref={ref}>
      <Card>
        <div className="rounded-lg bg-qt-green p-2">
          <h1 className="text-center text-xl font-bold text-white">{t("Qt projects")}</h1>
        </div>
        <p>
          <a href="https://www.qt.io/" target="_blank">
            Qt
          </a>{" "}
          {t("1.1") + " "}
          <Tooltip>
            <TooltipTrigger>GUI</TooltipTrigger>
            <TooltipContent>Graphical User Interface<br/>{t("1.2")}</TooltipContent>
          </Tooltip>{" "}
          {t("1.3") + " "}
          <Link href="https://www.qt.io/" className="styled-a" target="_blank">
            The Qt Company
          </Link>{" "}
          {t("1.4") + " "}
          <Tooltip>
            <TooltipTrigger>bindings</TooltipTrigger>
            <TooltipContent>{t("1.5")}</TooltipContent>
          </Tooltip>
          {t("1.6") + " "}
          <q>
            <a className="styled-a" target="_blank" href="https://wiki.qt.io/Qt_for_Python">
              PySide
            </a>
          </q>
          . {t("1.7")}
        </p>
        <p>
          {t("1.8") + " "}
          <a className="styled-a" href="https://doc.qt.io/qt-6/qtqml-index.html" target="_blank">
            QML
          </a>{" "}
          {t("1.9")}
        </p>
        <QtLogo extraClasses="mx-auto"/>
        <p>{t("1.10")} ➡️</p>
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 text-xl font-bold dark:bg-slate-900">
          <h1 className="text-center">{t("Technical drawing app")}</h1> 
        </div>
        <p>
          {t("2.1") + " "}
          <Tooltip>
            <TooltipTrigger>{t("2.2")}</TooltipTrigger>
            <TooltipContent>{t("2.3")}</TooltipContent>
          </Tooltip>
          , {t("2.4")}.
        </p>
        <p>
          {t("2.5") + " "}
          <a className="styled-a" href="https://www.opengl.org/" target="_blank">
            OpenGL
          </a>{" "}
          {t("2.6")}
        </p>
        <Image src="/images/TechnicalDrawingAppScreenshot.webp" width="700" height="700" alt={t("Technical drawing app")} className="w-full select-none" draggable="false" priority={true} />
        <GithubRepoLink href="https://github.com/Jaime02/Proyecto-de-investigacion-2020-Dibujo-tecnico" />
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 text-xl font-bold dark:bg-slate-900">
          <h1 className="text-center">QQuickSort</h1>
        </div>
        <p>
          {t("3.1")}
        </p>
        <video autoPlay muted loop>
          <source src="/videos/QQuickSortDemo.mp4" type="video/mp4" />
          {tc("No video tag support")}
        </video>
        <GithubRepoLink href="https://github.com/Jaime02/QQuickSort" />
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 text-xl font-bold dark:bg-slate-900">
          <h1 className="text-center">{t("Genetic algorithms")}</h1>
        </div>
        <p>
          {t("4.1") + " "}
          <a className="styled-a" target="_blank" href="https://en.wikipedia.org/wiki/Genetic_algorithm">
            {t("Genetic algorithms")}
          </a>{" "}
          {t("4.2")}
        </p>
        <p>{t("4.3")}</p>
        <Image src="/images/GeneticAlgorithms.webp" width="800" height="800" alt={t("Genetic algorithms")} className="w-full select-none" draggable="false" priority={true} />
        <GithubRepoLink href="https://github.com/Jaime02/Genetic-Algorithm" />
      </Card>
      <Card>
        <div className="rounded-lg bg-gray-300 p-2 text-xl font-bold dark:bg-slate-900">
          <h1 className="text-center">QKNNPainter</h1>
        </div>
        <p>
          {t("5.1") + " "}
          <a className="styled-a" target="_blank" href="https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm">
            K-nearest neighbors
          </a>{" "}
          {t("5.2")}
        </p>
        <p>{t("5.3")}</p>
        <Image src="/images/KNN.webp" width="800" height="800" alt="QKNNPainter" className="mx-auto w-[60%] select-none" draggable="false" priority={true} />
        <GithubRepoLink href="https://github.com/Jaime02/QKNNPainter" />
      </Card>
    </CardsLayout>
  );
});

QtProjects.displayName = "Qt projects";
export default QtProjects;
