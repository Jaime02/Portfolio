"use client";

import React, { useMemo, useState } from "react";

interface PollProps {
  title: string;
  options: (string | React.ReactNode)[];
  correctAnswerIndex: number;
  messagesOnAnswerChosen: string[];
}

export default function Poll({ title, options, correctAnswerIndex, messagesOnAnswerChosen }: PollProps) {
  const [answerChosenIndex, setAnswerChosen] = useState(-1);
  const message = useMemo(() => messagesOnAnswerChosen[answerChosenIndex], [answerChosenIndex, messagesOnAnswerChosen]);

  function handleAnswerChosen(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) {
    // Accept left clicks only
    if (event.button !== 0) {
      return;
    }

    setAnswerChosen(index);
  }

  return (
    <div
      className="mx-auto flex flex-col items-center gap-2 overflow-clip rounded-lg border-[1px] border-black bg-gray-100 shadow-xl sm:my-2"
      onMouseUp={(event) => {
        event.stopPropagation();
      }}
    >
      <h2 className="w-full bg-black p-2 text-center text-lg font-bold text-white">{title}</h2>
      <div className="flex flex-col items-stretch gap-2 p-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`clickable h-8 w-full rounded-lg px-4 text-black ${index === answerChosenIndex ? (index === correctAnswerIndex ? "bg-green-400" : "bg-red-500") : "bg-gray-200"}`}
            onMouseUp={(event) => {
              handleAnswerChosen(event, index);
            }}
          >
            {option}
          </button>
        ))}
        <p className={`overflow-y-clip font-bold text-black transition-all duration-1000 ${message ? "h-max" : "h-0"}`}>
          {message}
        </p>
      </div>
    </div>
  );
}
