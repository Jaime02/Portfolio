import { cn } from "@/misc/utils";

export default function PauseIcon({extraClasses}: {extraClasses?: string}) {
  return (
    <svg aria-label="Pause" className={extraClasses} fill="currentColor" viewBox="0 0 48 48">
      <title>Pause</title>
      <path d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z"></path>
    </svg>
  );
}
