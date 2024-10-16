import { useState } from "react";

interface PollProps {
  title: string
  options: (string | React.ReactNode)[]
  correctAnswerIndex: number 
  messagesOnAnswerChosen: string[]
}

export default function Poll({ title, options, correctAnswerIndex, messagesOnAnswerChosen }: PollProps) {
  const [answerChosen, setAnswerChosen] = useState(-1);

  function handleAnswerChosen(index: number) {
    setAnswerChosen(index);
  }

  return (
    <div className="sm:my-2 flex flex-col items-center gap-2 bg-[#efefef] mx-auto rounded-lg overflow-clip">
      <h2 className="w-full p-2 text-center text-lg font-bold bg-lack text-white bg-black dark:bg-slate-400 dark:text-black">{title}</h2>
      <div className="flex p-2 flex-col items-stretch gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full h-8 rounded-lg px-4 ${index === answerChosen ? (index === correctAnswerIndex ? "bg-green-500" : "bg-red-500") : "bg-white hover:bg-gray-200 active:bg-gray-400"}`}
            onMouseUp={(event) => {event.stopPropagation(); handleAnswerChosen(index)}}
          >
            {option}
          </button>
        ))}
        <p className="font-bold">{messagesOnAnswerChosen[answerChosen]}</p>
      </div>
      
    </div>
  );
}
