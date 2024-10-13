import CloseIcon from "@/icons/CloseIcon";
import PlayIcon from "@/icons/PlayIcon";
import PauseIcon from "@/icons/PauseIcon";
import { StoryGroup } from "@/misc/Constants";

interface Props {
  active: boolean;
  storyGroup: StoryGroup;
  timerRunning: boolean;
  setTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ active, storyGroup, timerRunning, setTimerRunning }: Props) {
  return (
    <div className="flex w-full flex-row items-center gap-2 p-2">
      {storyGroup.headerThumbnail}
      <h1 className="h-fit flex-1 text-left leading-none text-white">{storyGroup.title}</h1>
      {active && (
        <>
          {timerRunning ? (
            <button onClick={() => setTimerRunning(false)} className="hidden sm:block">
             <PauseIcon />
            </button>
          ) : (
            <button onClick={() => setTimerRunning(true)} className="hidden sm:block">
              <PlayIcon />
            </button>
          )}
          <a href="/">
            <CloseIcon/>
          </a>
        </>
      )}
    </div>
  );
}
