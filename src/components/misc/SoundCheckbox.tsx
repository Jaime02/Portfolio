import MutedIcon from "@/icons/MutedIcon";
import SoundIcon from "@/icons/SoundIcon";
import { SettingsContext } from "@/app/lib/SettingsContext";
import { useContext } from "react";

export default function SoundCheckbox({extraClasses}: {extraClasses?: string}) {
  const { mutedStories, setMutedStories } = useContext(SettingsContext);

  return (
    <button className="active:opacity-50" onClick={() => setMutedStories(!mutedStories)} aria-label="Toggle sound">
      {mutedStories ? <MutedIcon extraClasses={extraClasses}/> : <SoundIcon extraClasses={extraClasses}/>}
    </button>
  );
}
