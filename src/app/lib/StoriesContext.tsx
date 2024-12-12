"use client";

import Freelancing from "@/app/[locale]/(stories)/experiences/Freelancing";
import Hiberus from "@/app/[locale]/(stories)/experiences/Hiberus";
import OPmobility from "@/app/[locale]/(stories)/experiences/OPmobility";
import TheQtCompany from "@/app/[locale]/(stories)/experiences/TheQtCompany";
import Upna from "@/app/[locale]/(stories)/experiences/Upna";
import CoolPictures from "@/app/[locale]/(stories)/others/CoolPictures";
import MyLinks from "@/app/[locale]/(stories)/others/MyLinks";
import PaintFilterManager from "@/app/[locale]/(stories)/projects/PaintFilterManager";
import QtProjects from "@/app/[locale]/(stories)/projects/QtProjects";
import ThisWebsite from "@/app/[locale]/(stories)/projects/ThisWebsite";
import HeaderThumbnail from "@/components/stories/HeaderThumbnail";
import FreelancingLogo from "@/components/thumbnails-tabs/FreelancingLogo";
import QtGroupThumbnail from "@/components/thumbnails-tabs/QtGroupThumbnail";
import TabThumbnail from "@/components/thumbnails-tabs/TabThumbnailI";
import ExperienceIcon from "@/icons/ExperienceIcon";
import ProjectsIcon from "@/icons/ProjectsIcon";
import ThreeDotsIcon from "@/icons/ThreeDotsIcon";
import LiveGL from "@/app/[locale]/(stories)/projects/LiveGL";
import QtThumbnail from "@/components/thumbnails-tabs/QtThumbnail";
import Crispin from "@/app/[locale]/(stories)/others/Crispin";
import MyLinksThumbnail from "@/components/thumbnails-tabs/MyLinksThumbnail";
import CV from "@/app/[locale]/(stories)/others/CV";
import { useTranslations } from "next-intl";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { routing, useNextIntlRouter } from "@/translations/routing";
import { StoryGroup, ProjectsStoryGroup, ExperiencesStoryGroup, OthersStoryGroup } from "@/components/stories/StoryGroup";
import { StoryGroupCategory } from "@/components/stories/StoryGroupCategory";
import * as Constants from "@/misc/Constants";
import { SettingsContext } from "@/app/lib/SettingsContext";

const StoriesContext = createContext<any>({
  storyCategories: [],
  getStoryCategoryByUrl: () => [0, null],
  getStoryGroupByUrl: () => [0, null],
  getStoryGroupByIndex: () => null,
  router: null,
  willShowClosePopup: null,
  setWillShowClosePopup: () => null,
});

interface StoriesContextProviderProps {
  children: React.ReactNode;
  locale: string | undefined;
}

function StoriesContextProvider({ children, locale }: StoriesContextProviderProps) {
  const t = useTranslations("Constants");

  const ProjectsStoryGroups: StoryGroup[] = useMemo(
    () => [
      new ProjectsStoryGroup({
        title: t("This website"),
        storyGroupUrl: "this-website",
        component: <ThisWebsite />,
        tabThumbnail: <TabThumbnail title={t("This website")} src="/images/InstagramLogo.svg" href="/projects/this-website" padding={true} />,
        headerThumbnail: <HeaderThumbnail src="/images/InstagramLogo.svg" />,
      }),
      new ProjectsStoryGroup({
        title: t("Qt projects"),
        storyGroupUrl: "qt-projects",
        component: <QtProjects />,
        tabThumbnail: <QtThumbnail />,
        headerThumbnail: <HeaderThumbnail src="/images/QtSquareLogo.svg" />,
      }),
      new ProjectsStoryGroup({
        title: "Paint filter manager",
        storyGroupUrl: "paint-filter-manager",
        component: <PaintFilterManager />,
        tabThumbnail: <TabThumbnail title="Paint filter manager" src="/images/PaintFilterManagerLogo.webp" href="/projects/paint-filter-manager" />,
        headerThumbnail: <HeaderThumbnail src="/images/PaintFilterManagerLogo.webp" />,
      }),
      new ProjectsStoryGroup({
        title: "LiveGL",
        storyGroupUrl: "livegl",
        component: <LiveGL />,
        tabThumbnail: <TabThumbnail title="LiveGL" src="/images/LiveGLThumbnail.webp" href="/projects/livegl" padding={true} />,
        headerThumbnail: <HeaderThumbnail src="/images/LiveGLThumbnail.webp" />,
      }),
    ],
    [t],
  );

  const ExperiencesStoryGroups: StoryGroup[] = useMemo(
    () => [
      new ExperiencesStoryGroup({
        title: "The Qt Company",
        storyGroupUrl: "the-qt-company",
        component: <TheQtCompany />,
        tabThumbnail: <QtGroupThumbnail />,
        headerThumbnail: <HeaderThumbnail src="/images/QtSquareLogo.svg" />,
      }),
      new ExperiencesStoryGroup({
        title: "OPmobility",
        storyGroupUrl: "opmobility",
        component: <OPmobility />,
        tabThumbnail: <TabThumbnail title="OPmobility" src="/images/OPmobilityLogo.webp" href="/experiences/opmobility" />,
        headerThumbnail: <HeaderThumbnail src="/images/PlasticOmniumLogo.svg" />,
      }),
      new ExperiencesStoryGroup({
        title: "Hiberus",
        storyGroupUrl: "hiberus",
        component: <Hiberus />,
        tabThumbnail: <TabThumbnail title="Hiberus" src="/images/HiberusLogo.webp" href="/experiences/hiberus" />,
        headerThumbnail: <HeaderThumbnail src="/images/HiberusThumbnail.jpeg" />,
      }),
      new ExperiencesStoryGroup({
        title: "Freelancing",
        storyGroupUrl: "freelancing",
        component: <Freelancing />,
        tabThumbnail: <FreelancingLogo href="/experiences/freelancing" />,
        headerThumbnail: <HeaderThumbnail src="/images/Laptop.svg" />,
      }),
      new ExperiencesStoryGroup({
        title: "Upna",
        storyGroupUrl: "upna",
        component: <Upna />,
        tabThumbnail: <TabThumbnail title="Universidad Publica de Navarra" src="/images/UpnaLogo.webp" href="/experiences/upna" padding={true} />,
        headerThumbnail: <HeaderThumbnail src="/images/AcademicIcon.svg" />,
      }),
    ],
    [],
  );

  const OthersStoryGroups: StoryGroup[] = useMemo(
    () => [
      new OthersStoryGroup({
        title: "Curriculum Vitae",
        storyGroupUrl: "curriculum-vitae",
        component: <CV />,
        tabThumbnail: <TabThumbnail title="Curriculum Vitae" src="/images/CVPreview.webp" href="/others/curriculum-vitae" padding={true} />,
        headerThumbnail: <HeaderThumbnail src="/images/CVIcon.svg" />,
      }),
      new OthersStoryGroup({
        title: t("My links"),
        storyGroupUrl: "my-links",
        component: <MyLinks />,
        tabThumbnail: <MyLinksThumbnail href="/others/my-links" />,
        headerThumbnail: <HeaderThumbnail src="/images/LinkIcon.svg" />,
      }),
      new OthersStoryGroup({
        title: "Crispin",
        storyGroupUrl: "crispin",
        component: <Crispin />,
        tabThumbnail: <TabThumbnail title="Crispín" src="/images/CrispinThumbnail.jpg" href="/others/crispin" />,
        headerThumbnail: <HeaderThumbnail src="/images/CrispinSquareThumbnail.jpg" />,
        isCloseFriends: true,
        hasAudio: true,
      }),
      new OthersStoryGroup({
        title: t("Cool pictures"),
        storyGroupUrl: "cool-pictures",
        component: <CoolPictures />,
        tabThumbnail: <TabThumbnail title={t("Cool pictures")} src="/images/NeuschwansteinCastle.jpg" href="/others/cool-pictures" />,
        headerThumbnail: <HeaderThumbnail src="/images/icons/CameraIcon.svg" />,
        isCloseFriends: true,
        hasAudio: true,
      }),
    ],
    [t],
  );

  const projectsStoryCategory = useMemo(
    () =>
      new StoryGroupCategory({
        name: t("Projects"),
        storyGroupCategoryUrl: "projects",
        index: 0,
        storyGroups: ProjectsStoryGroups,
        icon: <ProjectsIcon />,
      }),
    [t, ProjectsStoryGroups],
  );

  const experiencesStoryCategory = useMemo(
    () =>
      new StoryGroupCategory({
        name: t("Experiences"),
        storyGroupCategoryUrl: "experiences",
        index: 1,
        storyGroups: ExperiencesStoryGroups,
        icon: <ExperienceIcon />,
      }),
    [t, ExperiencesStoryGroups],
  );

  const othersStoryCategory = useMemo(
    () =>
      new StoryGroupCategory({
        name: t("Others"),
        storyGroupCategoryUrl: "others",
        index: 2,
        storyGroups: OthersStoryGroups,
        icon: <ThreeDotsIcon />,
      }),
    [t, OthersStoryGroups],
  );

  const storyCategories: StoryGroupCategory[] = useMemo(
    () => [projectsStoryCategory, experiencesStoryCategory, othersStoryCategory],
    [projectsStoryCategory, experiencesStoryCategory, othersStoryCategory],
  );

  const getStoryCategoryByUrl = useCallback(
    (url: string): [number, StoryGroupCategory] => {
      let index = storyCategories.findIndex((storyCategory) => storyCategory.storyGroupCategoryUrl === url.toLowerCase());
      if (index === -1) {
        console.error("Invalid story category url:", url);
        index = 0;
      }
      return [index, storyCategories[index]];
    },
    [storyCategories],
  );

  const getStoryGroupByUrl = useCallback((category: StoryGroupCategory, url: string): [number, StoryGroup] => {
    let index = category.storyGroups.findIndex((storyGroup: StoryGroup) => storyGroup.storyGroupUrl.toLowerCase() === url.toLowerCase());
    if (index === -1) {
      console.error("Invalid story group url:", url);
      index = 0;
    }

    return [index, category.storyGroups[index]];
  }, []);

  function getStoryGroupByIndex(category: StoryGroupCategory, index: number): StoryGroup {
    return category.storyGroups[index];
  }

  const useRouterPush = useCallback(
    (url: string) => {
      const urlWithHash = window.location.pathname + window.location.hash;
      if (urlWithHash !== url) {
        const { defaultLocale } = routing;
        if (locale !== defaultLocale) {
          url = `/${locale}${url}`;
        }
        window.history.pushState({}, "", url);
      }
    },
    [locale],
  );

  const useRouterReplace = useCallback(
    (url: string) => {
      const { defaultLocale } = routing;
      if (locale !== defaultLocale) {
        url = `/${locale}${url}`;
      }
      const urlWithHash = window.location.pathname + window.location.hash;
      if (urlWithHash !== url) {
        window.history.replaceState({}, "", url);
      }
    },
    [locale],
  );

  const nextIntlRouter = useNextIntlRouter();

  function useRouter() {
    return {
      push: useRouterPush,
      replace: useRouterReplace,
      back: nextIntlRouter.back
    };
  }

  const router = useRouter();

  const [willShowClosePopup, setWillShowClosePopup] = useState(false);
  const { fullScreenStories } = useContext(SettingsContext);
  
  useEffect(() => {
    if (!window.localStorage.getItem("showClosePopupEver") && window.innerWidth < Constants.SMALL_BREAKPOINT_WIDTH && fullScreenStories) {
      setWillShowClosePopup(true);
    }
  }, [fullScreenStories]);
  
  return (
    <StoriesContext.Provider
      value={{
        storyCategories,
        getStoryCategoryByUrl,
        getStoryGroupByUrl,
        getStoryGroupByIndex,
        router,
        willShowClosePopup,
        setWillShowClosePopup
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
}

export { StoriesContext, StoriesContextProvider };
