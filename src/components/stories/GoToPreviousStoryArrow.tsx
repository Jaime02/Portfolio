import { StoryGroupContext } from "@/app/lib/StoryGroupContext";
import { StoryGroupsContext } from "@/app/lib/StoryGroupsContext";
import { useContext } from "react";

export default function GoToPreviousStoryArrow({ onClick }: { onClick?: () => void }) {
  const { inFirstGroup } = useContext(StoryGroupsContext);
  const { active, hash } = useContext(StoryGroupContext);
  return (
    <button role="navigation" aria-label="Go to previous story" className={`invisible ${active && (hash !== 0 || !inFirstGroup) ? "sm:visible" : ""}`} onClick={onClick}>
      <svg
        aria-label="Go to previous story"
        className={`size-6 text-[#8e8e8e] transition-all hover:cursor-pointer hover:text-white sm:shrink-0`}
        fill="currentColor"
        role="img"
        viewBox="0 0 24 24"
      >
        <title>Go to previous story</title>
        <path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm2.207 15.294a1 1 0 1 1-1.416 1.412l-4.5-4.51a1 1 0 0 1 .002-1.415l4.5-4.489a1 1 0 0 1 1.412 1.416l-3.792 3.783Z"></path>
      </svg>
    </button>
  );
}
