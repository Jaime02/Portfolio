export default function ShareIcon({ extraClasses }: { extraClasses: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Share" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24" className={`${extraClasses}`}>
      <title>Share</title>
      <line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
      <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon>
    </svg>
  );
}