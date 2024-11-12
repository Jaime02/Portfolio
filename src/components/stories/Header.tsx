import CloseIcon from "@/icons/CloseIcon";
import { useContext } from "react";
import { StoryGroupContext } from "@/lib/StoryGroupContext";
import {Link} from "@/translations/routing";
import SoundCheckbox from "@/components/misc/SoundCheckbox";
import BestFriends from "@/components/story-widgets/BestFriends";
import PauseStoriesCheckbox from "@/components/misc/PauseStoriesCheckbox";

interface Props {
  floatingHeader: boolean;
}

export default function Header({ floatingHeader }: Props) {
  const { isBestFriends, title, headerThumbnail, active } = useContext(StoryGroupContext);

  return (
    <div className={`flex w-full flex-row items-center gap-2 ${!floatingHeader ? "bg-black" : ""}`}>
      {headerThumbnail}
      <h1 className="h-fit flex-1 leading-none text-white">{title}</h1>
      {active && (
        <>
          {isBestFriends && <BestFriends />}
          <SoundCheckbox />
          <PauseStoriesCheckbox />
          <Link href="/" aria-label="Close" className="text-white transition-all active:opacity-50">
            <CloseIcon />
          </Link>
        </>
      )}
    </div>
  );
}
