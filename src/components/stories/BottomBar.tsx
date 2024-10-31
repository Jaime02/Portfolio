import HeartIcon from "@/icons/HeartIcon";
import ShareIcon from "@/icons/ShareIcon";

export default function BottomBar({ floatingHeader }: { floatingHeader: boolean }) {
  return (
    <div className={`${floatingHeader ? "absolute bottom-0 z-20" : ""} flex w-full flex-row items-center gap-4 py-2 px-4`}>
      <input
        className="min-w-0 flex-1 rounded-full border-[1px] border-ig-gray bg-transparent px-4 py-2 text-left placeholder:text-ellipsis placeholder:text-ig-gray hover:border-white placeholder:hover:text-white focus:border-white focus:placeholder:text-white"
        placeholder="Reply to Jaime Resano..."
      />
      <HeartIcon />
      <ShareIcon extraClasses="text-white hover:cursor-pointer hover:text-[#8e8e8e]" />
    </div>
  );
}
