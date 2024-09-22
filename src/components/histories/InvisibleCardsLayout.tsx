export default function InvisibleCardsLayout() { 
  return (
    <div className={`mx-auto flex h-full w-fit snap-center flex-row items-center gap-4 scale-50 invisible`}>
      <div className="flex aspect-[9/16] h-full flex-col rounded-md bg-black text-center">
      </div>
    </div>
  );
};