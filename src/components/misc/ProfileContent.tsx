import Image from "next/image";
import ArrowIcon from "@/icons/ArrowIcon";
import ThreeDotsIcon from "@/icons/ThreeDotsIcon";
import UserPlusIcon from "@/icons/UserPlusIcon";
import { useEffect, useState } from "react";
import UserCheckIcon from "@/icons/UserCheckIcon";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Settings from "@/components/misc/Settings";

export default function ProfileContent() {
  const [followingPopoverOpen, setFollowingPopoverOpen] = useState(false);
  const [sendMessagePopoverOpen, setSendMessagePopoverOpen] = useState(false);
  const [isFollowingMe, setIsFollowingMe] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setSendMessagePopoverOpen(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [sendMessagePopoverOpen]);

  return (
    <section className="flex flex-col items-start justify-center">
      <header className="flex h-11 w-full flex-row items-center justify-center border-b-[1px] border-ig-gray sm:hidden">
        <h1 className="font-system font-semibold">Jaime Resano</h1>
      </header>
      <div className="mt-4 grid auto-cols-[min-content_auto] grid-flow-col sm:mb-4 sm:mt-0">
        <div className="col-start-1 row-span-2 row-start-1 mx-4 h-fit w-fit rounded-full bg-gradient-to-tr from-yellow-200 via-[#FD1D1D] to-[#FF00AA] p-[3.5px] sm:row-span-3 sm:mx-7">
          <div className="rounded-full bg-background p-1">
            <Image src="/images/Me.webp" alt="Jaime Resano face" className="size-20 min-h-20 min-w-20 rounded-full object-cover sm:size-44 sm:min-h-44 sm:min-w-44" width="300" height="300" />
          </div>
        </div>
        <div className="col-start-2 row-start-1 flex flex-row flex-wrap items-center justify-start gap-2 sm:mb-4">
          <h1 className="text-nowrap text-xl">Jaime Resano</h1>
          <div className="flex flex-row flex-wrap items-start justify-start gap-2">
            <Popover onOpenChange={setFollowingPopoverOpen} open={followingPopoverOpen}>
              <PopoverTrigger className="btn-secondary">
                <p>Following</p>
                <ArrowIcon extraClasses="size-3 stroke-black dark:stroke-white transition-transform duration-300 ease-in-out" direction={followingPopoverOpen ? "down" : "up"} />
              </PopoverTrigger>
              <PopoverContent>This is fake lol</PopoverContent>
            </Popover>
            <Popover open={sendMessagePopoverOpen} onOpenChange={setSendMessagePopoverOpen}>
              <PopoverTrigger className="btn-secondary">Send message</PopoverTrigger>
              <PopoverContent>Sorry, this is fake too</PopoverContent>
            </Popover>
            <div className={`btn-secondary select-none transition-all ${isFollowingMe ? "bg-green-400 dark:bg-green-600" : ""}`} onClick={() => setIsFollowingMe(!isFollowingMe)}>
              {isFollowingMe ? <UserCheckIcon /> : <UserPlusIcon />}
            </div>
            <Popover>
              <PopoverTrigger className="btn-outline p-2" aria-label="Settings">
                <ThreeDotsIcon />
              </PopoverTrigger>
              <PopoverContent>
                <Settings/> 
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="col-span-2 row-start-4 border-t-[1px] border-ig-gray py-3 sm:col-start-2 sm:row-start-2 sm:mb-2 sm:border-t-0 sm:p-0">
          <div className="flex flex-1 flex-row flex-nowrap justify-around sm:justify-start sm:gap-10">
            <div className="flex flex-col items-center gap-0 font-system text-base sm:flex-row sm:gap-1 sm:font-normal">
              <span className="font-semibold">12</span> projects
            </div>
            <div className="flex flex-col items-center gap-0 font-system text-base sm:flex-row sm:gap-1 sm:font-normal">
              <span className="font-semibold">{new Date().getFullYear() - 2002}</span> years old
            </div>
            <div className="flex flex-col items-center gap-0 font-system text-base sm:flex-row sm:gap-1 sm:font-normal">
              <span className="font-semibold">69</span> followers
            </div>
          </div>
        </div>
        <div className="col-span-2 col-start-1 p-4 font-system text-base sm:col-span-1 sm:col-start-2 sm:row-start-3 sm:p-0">
          <h2 className="font-lg font-bold">Welcome to my personal website</h2>
          <p>
            I am a software engineer with a strong passion for programming and anything related to computers.
            <br />
            In this website you can find my portfolio with the format of an Instagram profile.
          </p>
        </div>
      </div>
    </section>
  );
}
