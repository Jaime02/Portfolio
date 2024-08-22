export default function NextArrow({ extraClasses, onClick }: { extraClasses?: string; onClick?: () => void }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Next" className={`text-[#8e8e8e] hover:text-white hover:cursor-pointer transition-all invisible ${extraClasses}`} fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" onClick={onClick}>
      <title>Next</title>
      <path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm3.707 12.22-4.5 4.488A1 1 0 0 1 9.8 15.795l3.792-3.783L9.798 8.21a1 1 0 1 1 1.416-1.412l4.5 4.511a1 1 0 0 1-.002 1.414Z"></path>
    </svg>
  );  
}
