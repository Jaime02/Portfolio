import { Label } from "@/components/ui/label";
import FullScreenSwitch from "@/components/misc/FullScreenSwitch";
import LanguageSwitch from "@/components/misc/LanguageSwitch";
import PauseStoriesCheckbox from "@/components/misc/PauseStoriesCheckbox";
import SoundCheckbox from "@/components/misc/SoundCheckbox";
import ThemeSwitch from "@/components/misc/ThemeSwitch";
import { useTranslations } from "next-intl";

export default function Settings() {
  const t = useTranslations("Settings");
  return (
    <div className="flex flex-col items-center gap-3">
      <ThemeSwitch />
      <LanguageSwitch />
      <FullScreenSwitch />
      <div className="flex items-center gap-2">
        <Label htmlFor="sound-checkbox" className="hover:cursor-pointer">
          {t("Sound") + ": "}
        </Label>
        <SoundCheckbox extraClasses="size-6" showToastOnChange={true} />
      </div>
      <div className="flex items-center gap-2">
      <Label htmlFor="pause-stories-checkbox" className="hover:cursor-pointer">
        {t("Pause stories") + ": "} 
        </Label>
        <PauseStoriesCheckbox extraClasses="size-6 text-black dark:text-white" showToastOnChange={true} />
      </div>
    </div>
  );
}
