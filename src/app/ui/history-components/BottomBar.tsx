import HeartIcon from '@/app/icons/HeartIcon';
import ShareIcon from '@/app/icons/ShareIcon';

export default function BottomBar() {
  return (
    <div className="flex w-full flex-row items-center gap-4 p-2">
    <input
      className="flex-1 resize-none rounded-full border border-[#dbdbdb] px-4 py-2 text-left text-white"
      placeholder="Reply to Jaime Resano..."
    />
    <HeartIcon extraClasses="text-white hover:cursor-pointer hover:text-[#8e8e8e]" />
    <ShareIcon extraClasses="text-white hover:cursor-pointer hover:text-[#8e8e8e]" />
  </div>
  );
}