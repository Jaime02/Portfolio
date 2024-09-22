interface Props {
  historyCount: number;
  activeHistoryIndex: number;
  progress: number;
}

export default function HistoriesProgressBar({ historyCount, activeHistoryIndex, progress }: Props) {
  return (
    <div className="flex h-[2px] w-full flex-row gap-2 rounded-md">
      {Array(historyCount)
        .fill(0)
        .map((_, index) => {
          return (
            <div className="h-full w-full bg-gray-400 rounded-md" key={index}>
              <div
                className="h-full bg-white"
                style={{
                  width: activeHistoryIndex > index ? '100%' : index === activeHistoryIndex ? `${progress}%` : '0%',
                }}
              />
            </div>
          );
        })}
    </div>
  );
}
