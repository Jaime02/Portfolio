import PauseIcon from "@/icons/PauseIcon";
import PlayIcon from "@/icons/PlayIcon";
import { SettingsContext } from "@/app/lib/SettingsContext";
import { useContext } from "react";
import { cn } from "@/misc/utils";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";

export default function PauseStoriesCheckbox({ extraClasses, showToastOnChange = false}: { extraClasses?: string, showToastOnChange?: boolean }) {
  const { pausedStories, setPausedStories, hasEverPlayedStories, setHasEverPlayedStories } = useContext(SettingsContext);

  const t = useTranslations("Pause Stories");
  const { toast } = useToast();

  function onPauseStoriesButtonClicked() {
    if (showToastOnChange) {
      toast({
        title: (!pausedStories ? t("Stories paused") + " 🖐🏻⏸️" : t("Stories resumed") + " ✅▶️")
      });
    }
    
    if (pausedStories) {
      setHasEverPlayedStories(pausedStories);
    }
    setPausedStories(!pausedStories);
  }

  return pausedStories ? (
    <button id="pause-stories-checkbox" aria-label="Resume" className={cn("clickable p-2 rounded-md", !hasEverPlayedStories ? "btn-shiny rounded-full p-2" : "")} onClick={onPauseStoriesButtonClicked}>
      <PlayIcon extraClasses={cn(extraClasses, !hasEverPlayedStories ? "text-black dark:text-black" : "")} />
    </button>
  ) : (
    <button id="pause-stories-checkbox" aria-label="Pause" onClick={onPauseStoriesButtonClicked} className="clickable p-2 rounded-md">
      <PauseIcon extraClasses={extraClasses} />
    </button>
  );
}
