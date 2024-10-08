export default function DarkThemeIcon({ extraClasses } : { extraClasses: string }) {
  return (
<svg
  className={`h-5 w-5 stroke-gray-900 transition-all ${extraClasses}`}
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  ></path>
</svg>
  );
}