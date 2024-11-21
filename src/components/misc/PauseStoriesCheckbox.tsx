import PauseIcon from "@/icons/PauseIcon";
import PlayIcon from "@/icons/PlayIcon";
import { SettingsContext } from "@/app/lib/SettingsContext";
import { useContext } from "react";

export default function PauseStoriesCheckbox({extraClasses = "size-4"}: {extraClasses?: string}) {
  const { pausedStories, setPausedStories } = useContext(SettingsContext);
  return (pausedStories ? (
    <button aria-label="Resume" onClick={() => setPausedStories(false)}>
      <PlayIcon extraClasses={extraClasses} />
    </button>
  ) : (
    <button aria-label="Pause" onClick={() => setPausedStories(true)}>
      <PauseIcon extraClasses={extraClasses} />
    </button>
  ));
}
