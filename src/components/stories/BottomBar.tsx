"use client";

import { useToast } from "@/hooks/use-toast";
import HeartIcon from "@/icons/HeartIcon";
import ShareIcon from "@/icons/ShareIcon";
import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function BottomBar({ floatingHeader }: { floatingHeader: boolean }) {
  const replyInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const t = useTranslations("Bottom bar");
  
  function sendMessage() {
    replyInputRef.current!.value = "";
    toast({title: t("1") + " 👌🏻"});
  }

  function inputEnterPressed(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    sendMessage();
  }

  function shareButtonPressed(event: React.MouseEvent<HTMLButtonElement>) {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    sendMessage();
  }

  return (
    <div className={`${floatingHeader ? "absolute bottom-0 z-20" : ""} flex w-full flex-row items-center gap-4 px-4 py-2`}>
      <input
        ref={replyInputRef}
        className="min-w-0 text-white flex-1 rounded-full border-[1px] border-ig-gray bg-transparent px-4 py-2 placeholder:text-ellipsis placeholder:text-ig-gray hover:border-white placeholder:hover:text-white focus:border-white focus:placeholder:text-white"
        placeholder="Reply to Jaime Resano..."
        onKeyUp={inputEnterPressed}
      />
      <HeartIcon />
      <button onClick={shareButtonPressed}>
        <ShareIcon extraClasses="text-white hover:cursor-pointer hover:text-[#8e8e8e]" />
      </button>
    </div>
  );
}
