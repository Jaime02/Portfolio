import { QtFont } from "@/misc/fonts";
import Image from "next/image";

export default function QtProjectsIcon() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Image src="/images/QtProjectsIcon.svg" alt="Qt projects icon" />
      <span className={`text-sm text-white ${QtFont.className}`}>Qt projects</span>
    </div>
  );
}
