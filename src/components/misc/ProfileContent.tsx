import Image from "next/image";
import DownArrowIcon from "@/icons/DownArrowIcon";
import ThreeDotsIcon from "@/icons/ThreeDotsIcon";
import UserPlusIcon from "@/icons/UserPlusIcon";

export default function ProfileContent() {
  return (
    <section className="flex flex-col items-start justify-center">
    <header className="flex h-11 w-full flex-row items-center justify-center border-b-[1px] border-[#dbdbdb] sm:hidden">
      <h1 className="font-system font-semibold">Jaime Resano</h1>
    </header>
    <div className="mt-4 grid grid-flow-col sm:mb-4 sm:mt-0">
      <div className="col-start-1 row-span-2 row-start-1 mx-4 h-fit w-fit rounded-full bg-gradient-to-tr from-yellow-200 via-[#FD1D1D] to-[#FF00AA] p-[3.5px] sm:row-span-3 sm:ml-0 sm:mr-7">
        <div className="rounded-full bg-white p-1">
          <Image src="/images/Me.webp" alt="Jaime Resano face" className="size-20 min-h-20 min-w-20 rounded-full sm:size-44 sm:min-h-44 sm:min-w-44" width="300" height="300" />
        </div>
      </div>

      <div className="col-start-2 row-start-1 flex flex-row flex-wrap items-center justify-start gap-2 sm:mb-5">
        <h1 className="text-nowrap text-xl">Jaime Resano</h1>
        <div className="flex flex-row flex-wrap items-start justify-start gap-2">
          <div className="btn-secondary select-none">
            <p>Following</p>
            <DownArrowIcon extraClasses="size-3 stroke-black dark:stroke-white" />
          </div>
          <div className="btn-secondary text-nowrap">Send message</div>
          <div className="btn-secondary select-none">
            <UserPlusIcon extraClasses="size-4 stroke-black dark:stroke-white" />
          </div>
          <ThreeDotsIcon/>
        </div>
      </div>
      <div className="col-span-2 row-start-4 border-t-[1px] border-[#dbdbdb] py-3 sm:col-start-2 sm:row-start-2 sm:border-t-0 sm:p-0">
        <div className="flex flex-1 flex-row flex-nowrap justify-around sm:justify-start sm:gap-10">
          <div className="flex flex-col items-center gap-0 font-system text-sm sm:flex-row sm:gap-1 sm:font-normal">
            <span className="font-lg font-semibold">12</span> projects
          </div>
          <div className="flex flex-col items-center gap-0 font-system text-sm sm:flex-row sm:gap-1 sm:font-normal">
            <span className="font-lg font-semibold">{new Date().getFullYear() - 2002}</span> years old
          </div>
          <div className="flex flex-col items-center gap-0 font-system text-sm sm:flex-row sm:gap-1 sm:font-normal">
            <span className="font-lg font-semibold">69</span> followers
          </div>
        </div>
      </div>
      <div className="col-span-2 col-start-1 p-4 font-system text-sm sm:col-span-1 sm:col-start-2 sm:row-start-3 sm:p-0">
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
