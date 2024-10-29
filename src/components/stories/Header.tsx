import CloseIcon from "@/icons/CloseIcon";
import PlayIcon from "@/icons/PlayIcon";
import PauseIcon from "@/icons/PauseIcon";
import { StoryGroup } from "@/misc/Constants";
import { useContext } from "react";
import { StoryGroupsContext } from "@/components/stories/StoryGroupsContext";
import { StoryGroupContext } from "@/components/stories/StoryGroupContext";

interface Props {
  floatingHeader: boolean;
}

export default function Header({ floatingHeader }: Props) {
  const { paused, setPaused, active } = useContext(StoryGroupsContext);
  const { title, headerThumbnail } = useContext(StoryGroupContext);
  
  return (
    <div className={`flex w-full flex-row items-center gap-2 p-2 ${!floatingHeader ? "bg-ig-gray dark:bg-black" : ""}`}>
      {headerThumbnail}
      <h1 className="h-fit flex-1 text-left leading-none text-white">{title}</h1>
      {active && (
        <>
          {paused ? (
            <button aria-label="Resume" onClick={() => setPaused(false)} className="hidden sm:block">
              <PlayIcon />
            </button>
          ) : (
            <button aria-label="Pause" onClick={() => setPaused(true)} className="hidden sm:block">
              <PauseIcon />
            </button>
          )}
          <a href="/" aria-label="Close">
            <CloseIcon />
          </a>
        </>
      )}
    </div>
  );
}
