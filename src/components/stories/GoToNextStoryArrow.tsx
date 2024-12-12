import { StoryGroupContext } from "@/app/lib/StoryGroupContext";
import { useContext } from "react";

export default function GoToNextStoryArrow({ onClick }: { onClick?: () => void }) {
  const { active } = useContext(StoryGroupContext);
  return (
    <button role="navigation" aria-label="Go to next story" onClick={onClick} className={`hidden ${active ? "sm:block" : ""}`}>
      <svg
        aria-label="Go to next story"
        className={`size-6 text-[#8e8e8e] transition-all hover:cursor-pointer hover:text-white sm:shrink-0`}
        fill="currentColor"
        role="img"
        viewBox="0 0 24 24"
      >
        <title>Go to next story</title>
        <path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm3.707 12.22-4.5 4.488A1 1 0 0 1 9.8 15.795l3.792-3.783L9.798 8.21a1 1 0 1 1 1.416-1.412l4.5 4.511a1 1 0 0 1-.002 1.414Z"></path>
      </svg>
    </button>
  );
}
