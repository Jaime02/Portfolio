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
      <div className="flex items-center gap-2">
        {t("Sound") + ": "} <SoundCheckbox extraClasses="size-6" showToastOnChange={true} />
      </div>
      <div className="flex items-center gap-2">
        {t("Pause stories") + ": "} <PauseStoriesCheckbox extraClasses="size-6 text-black dark:text-white" showToastOnChange={true} />
      </div>
    </div>
  );
}
