import Image from "next/image";
import CloseIcon from "@/icons/CloseIcon";

interface Props {
  title: string;
  thumbnail: string;
}

export default function HistoryHeader({ title, thumbnail }: Props) {
  return (
    <div className="flex w-full flex-row items-center gap-1 p-2">
      <Image src={thumbnail} alt="History group thumbnail" width="32" height="32" className="rounded-full" />
      <h1 className="h-fit flex-1 text-left leading-none text-white">{title}</h1>
      <a href="/">
        <CloseIcon extraClasses="text-white" />
      </a>
    </div>
  );
}
