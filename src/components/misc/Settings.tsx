import LanguageSwitch from "@/components/misc/LanguageSwitch";
import PauseStoriesCheckbox from "@/components/misc/PauseStoriesCheckbox";
import SoundCheckbox from "@/components/misc/SoundCheckbox";
import ThemeSwitch from "@/components/misc/ThemeSwitch";

export default function Settings() {
  return (
    <div className="flex flex-col gap-3 items-center">
      <ThemeSwitch />
      <LanguageSwitch />
      <div className="flex gap-2 items-center">Sound: <SoundCheckbox extraClasses="size-6" /></div>
      <div className="flex gap-2 items-center">Pause stories: <PauseStoriesCheckbox extraClasses="size-6 text-black dark:text-white" /></div>
    </div>
  );
}
