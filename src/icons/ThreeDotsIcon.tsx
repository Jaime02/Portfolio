export default function ThreeDotsIcon({ extraClasses }: { extraClasses: string }) {
  return (
    <svg className={`${extraClasses}`} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
      <circle cx="12" cy="12" r="1.5"></circle>
      <circle cx="6" cy="12" r="1.5"></circle>
      <circle cx="18" cy="12" r="1.5"></circle>
    </svg>
  );
}
