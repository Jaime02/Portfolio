import HeartIcon from '@/icons/HeartIcon';
import ShareIcon from '@/icons/ShareIcon';

export default function BottomBar() {
  return (
    <div className="flex w-full flex-row items-center gap-4 p-2">
    <input
      className="flex-1 min-w-0 placeholder:text-ellipsis rounded-full border border-ig-gray px-4 py-2 text-left text-white"
      placeholder="Reply to Jaime Resano..."
    />
    <HeartIcon/>
    <ShareIcon extraClasses="text-white hover:cursor-pointer hover:text-[#8e8e8e]" />
  </div>
  );
}