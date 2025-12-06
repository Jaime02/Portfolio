interface Props {
  storyCount: number;
  activeStoryIndex: number;
  progress: number;
}

export default function ProgressBar({ storyCount, activeStoryIndex, progress }: Props) {
  return (
    <div className={`flex h-[2px] w-full flex-row gap-2 rounded-md`}>
      {Array(storyCount)
        .fill(0)
        .map((_, index) => {
          return (
            <div className="h-full w-full rounded-md bg-gray-400" key={index}>
              <div
                className="h-full bg-white"
                style={{
                  width: activeStoryIndex > index ? "100%" : index === activeStoryIndex ? `${progress}%` : "0%",
                }}
              />
            </div>
          );
        })}
    </div>
  );
}
