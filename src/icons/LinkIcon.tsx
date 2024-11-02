export default function LinkIcon({ extraClasses }: { extraClasses?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${extraClasses}`} viewBox="0 -960 960 960" fill="currentColor">
      <path d="M424.62-316.92H283.08q-67.68 0-115.38-47.69Q120-412.3 120-479.96t47.7-115.39q47.7-47.73 115.38-47.73h141.54v40H283.08q-50.77 0-86.93 36.16Q160-530.77 160-480t36.15 86.92q36.16 36.16 86.93 36.16h141.54v40ZM340-460v-40h280v40H340Zm195.38 143.08v-40h141.54q50.77 0 86.93-36.16Q800-429.23 800-480t-36.15-86.92q-36.16-36.16-86.93-36.16H535.38v-40h141.54q67.68 0 115.38 47.69Q840-547.7 840-480.04t-47.7 115.39q-47.7 47.73-115.38 47.73H535.38Z" />
    </svg>
  );
}
