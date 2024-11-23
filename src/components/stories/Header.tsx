"use client";

import CloseIcon from "@/icons/CloseIcon";
import { useContext } from "react";
import { StoryGroupContext } from "@/app/lib/StoryGroupContext";
import {useNextIntlRouter} from "@/translations/routing";
import SoundCheckbox from "@/components/misc/SoundCheckbox";
import CloseFriends from "@/components/story-widgets/CloseFriends";
import PauseStoriesCheckbox from "@/components/misc/PauseStoriesCheckbox";

interface Props {
  floatingHeader: boolean;
}

export default function Header({ floatingHeader }: Props) {
  const { isCloseFriends, title, headerThumbnail, active, hasAudio } = useContext(StoryGroupContext);
  const router = useNextIntlRouter();

  return (
    <div className={`flex w-full flex-row items-center gap-2 ${!floatingHeader ? "bg-black" : ""}`}>
      {headerThumbnail}
      <h1 className="h-fit flex-1 leading-none text-white">{title}</h1>
      {active && (
        <>
          {isCloseFriends && <CloseFriends />}
          {hasAudio && <SoundCheckbox extraClasses="size-4 text-white" />}
          <PauseStoriesCheckbox extraClasses="size-4 text-white"/>
          <button aria-label="Close" className="clickable p-2 rounded-md" onClick={() => router.back()}>
            <CloseIcon extraClasses="text-white" />
          </button>
        </>
      )}
    </div>
  );
}
