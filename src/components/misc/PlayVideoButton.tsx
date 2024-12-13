import { SettingsContext } from "@/app/lib/SettingsContext";
import PlayIcon from "@/icons/PlayIcon";
import { useContext } from "react";

export default function PlayVideoButton() {
  const { hasEverPlayedStories, setPausedStories } = useContext(SettingsContext);
  
  function playButtonClick() {
    setPausedStories(false);
  }

  return (
    <button className={`z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${hasEverPlayedStories ? "hidden" : "block"} rounded-full p-2 transition-opacity duration-300 hover:scale-110`} aria-label="Play video" onClick={playButtonClick}> 
      <PlayIcon extraClasses="size-24"/>
    </button>
  ); 
}