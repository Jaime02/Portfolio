import Image from "next/image";
import CloseIcon from "@/icons/CloseIcon";
import PlayIcon from "@/icons/PlayIcon";
import PauseIcon from "@/icons/PauseIcon";

interface Props {
  active: boolean;
  title: string;
  thumbnail: string;
  timerRunning: boolean;
  setTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StoryHeader({ active, title, thumbnail, timerRunning, setTimerRunning }: Props) {
  return (
    <div className="flex w-full flex-row items-center gap-2 p-2">
      <Image src={thumbnail} alt="story group thumbnail" width="32" height="32" className="rounded-full" />
      <h1 className="h-fit flex-1 text-left leading-none text-white">{title}</h1>
      {active && (
        <>
          {timerRunning ? (
            <button onClick={() => setTimerRunning(false)}>
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
