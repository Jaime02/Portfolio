export default function ArrowIcon({ extraClasses, direction = "up" }: { extraClasses: string, direction?: "left" | "right" | "up" | "down" }) {
  let transform = "";
  if (direction === "down") {
    transform = "matrix(-1 0 0 -1 0 0)";
  } else if (direction === "left") {
    transform = "matrix(-1 0 0 1 0 0)";
  } else if (direction === "right") {
    transform = "matrix(1 0 0 -1 0 0)";
  }
    
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${extraClasses}`}
      transform={transform}
    >
      <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
    </svg>
  );
}
