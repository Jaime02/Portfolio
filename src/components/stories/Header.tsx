import CloseIcon from "@/icons/CloseIcon";
import PlayIcon from "@/icons/PlayIcon";
import PauseIcon from "@/icons/PauseIcon";
import { StoryGroup } from "@/misc/Constants";
import { useContext } from "react";
import { StoryGroupsContext } from "@/lib/StoryGroupsContext";
import { StoryGroupContext } from "@/lib/StoryGroupContext";
import Link from "next/link";
import { SettingsContext } from "@/lib/SettingsContext";
import SoundCheckbox from "@/components/misc/SoundCheckbox";
import BestFriends from "@/components/story-widgets/BestFriends";

interface Props {
  floatingHeader: boolean;
}

export default function Header({ floatingHeader }: Props) {
  const { pausedStories, setPausedStories } = useContext(SettingsContext);
  const { isBestFriends, title, headerThumbnail, active } = useContext(StoryGroupContext);

  return (
    <div className={`flex w-full flex-row items-center gap-2 ${!floatingHeader ? "bg-ig-gray dark:bg-black" : ""}`}>
      {headerThumbnail}
      <h1 className="h-fit flex-1 leading-none text-white">{title}</h1>
      {active && (
        <>
          {isBestFriends && <BestFriends />}
          <SoundCheckbox />
          {pausedStories ? (
            <button aria-label="Resume" onClick={() => setPausedStories(false)}>
              <PlayIcon />
            </button>
          ) : (
            <button aria-label="Pause" onClick={() => setPausedStories(true)}>
              <PauseIcon />
            </button>
          )}
          <Link href="/" aria-label="Close" className="text-white transition-all active:opacity-50">
            <CloseIcon />
          </Link>
        </>
      )}
    </div>
  );
}
