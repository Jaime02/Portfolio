export default function PreviousArrow({ extraClasses, onClick }: { extraClasses?: string; onClick?: () => void }) {
  return (
    <svg
      aria-label="Previous"
      className={`size-6 text-[#8e8e8e] transition-all hover:cursor-pointer hover:text-white ${extraClasses}`}
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
      onClick={onClick}
    >
      <title>Previous</title>
      <path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm2.207 15.294a1 1 0 1 1-1.416 1.412l-4.5-4.51a1 1 0 0 1 .002-1.415l4.5-4.489a1 1 0 0 1 1.412 1.416l-3.792 3.783Z"></path>
    </svg>
  );
}
