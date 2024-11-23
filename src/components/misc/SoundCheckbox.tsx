import MutedIcon from "@/icons/MutedIcon";
import SoundIcon from "@/icons/SoundIcon";
import { SettingsContext } from "@/app/lib/SettingsContext";
import { useContext, useState } from "react";
import { cn } from "@/misc/utils";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export default function SoundCheckbox({extraClasses, showToastOnChange = false}: {extraClasses?: string, showToastOnChange?: boolean}) {
  const { mutedStories, setMutedStories } = useContext(SettingsContext);
  const [hasEverActivatedSound, setHasEverActivatedSound] = useState(!mutedStories);
  const t = useTranslations("Sound");
  const { toast } = useToast();

  function onSoundButtonClicked() {
    if (showToastOnChange) {
      toast({
        title: (!mutedStories ? t("Sound muted") + " 🤫" : t("Sound activated") + " 🔊✅😎")
      });
    }
    
    if (mutedStories) {
      setHasEverActivatedSound(mutedStories);
    }
    setMutedStories(!mutedStories);
  }

  return (
    <button className={`clickable p-2 rounded-md ${!hasEverActivatedSound ? "btn-shiny rounded-full text-black" : ""}`} onClick={() => onSoundButtonClicked()} aria-label="Toggle sound"> 
      {mutedStories ? <MutedIcon extraClasses={cn(extraClasses, !hasEverActivatedSound ? "text-black" : "")}/> : <SoundIcon extraClasses={extraClasses}/>}
    </button>
  );
}
