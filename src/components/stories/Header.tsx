"use client";

import CloseIcon from "@/icons/CloseIcon";
import { useContext, useEffect, useState } from "react";
import { StoryGroupContext } from "@/app/lib/StoryGroupContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SoundCheckbox from "@/components/misc/SoundCheckbox";
import CloseFriends from "@/components/story-widgets/CloseFriends";
import PauseStoriesCheckbox from "@/components/misc/PauseStoriesCheckbox";
import { StoriesContext } from "@/app/lib/StoriesContext";
import { useTranslations } from "next-intl";

interface Props {
  floatingHeader: boolean;
}

export default function Header({ floatingHeader }: Props) {
  const { isCloseFriends, title, headerThumbnail, active, hasAudio } = useContext(StoryGroupContext);
  const { router, willShowClosePopup, setWillShowClosePopup } = useContext(StoriesContext);

  const t = useTranslations("Header");

  async function onCloseButtonClicked() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
    router.back();
  }

  function onClosePopupOpenChange(open: boolean) {
    if (open) {
      console.log("Close popup open true");
      window.localStorage.setItem("showClosePopupEver", "true");
      setWillShowClosePopup(false);
      return;
    }
  }
  useEffect(() => {
    if (willShowClosePopup) {
      window.localStorage.setItem("showClosePopupEver", "true");
    }
  }, [willShowClosePopup]);

  return (
    <div className={`flex w-full flex-row items-center gap-2 ${!floatingHeader ? "bg-black" : ""}`}>
      {headerThumbnail}
      <h1 className="h-fit flex-1 leading-none text-white">{title}</h1>
      {active && (
        <>
          {isCloseFriends && <CloseFriends />}
          {hasAudio && <SoundCheckbox extraClasses="size-4 text-white" />}
          <PauseStoriesCheckbox extraClasses="size-4 text-white" />
          <Popover defaultOpen={willShowClosePopup && document.fullscreenEnabled} onOpenChange={onClosePopupOpenChange}>
            <PopoverTrigger onClick={(event) => event.preventDefault()}>
              <div role="button" aria-label="Close" className="clickable rounded-md p-1" onClick={onCloseButtonClicked}>
                <CloseIcon extraClasses="text-white" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              {t("Do not panic!")} 😉
                <br/>
              {t("Go back button")} ⬆️
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  );
}
