export default function RainboxBackgroundContainer({ children }: { children: React.ReactNode }) {
  // Rainbow colors
  const colors = [
    "#FF0000", // Red
    "black",
    "#FF7F00", // Orange
    "black",
    "#FFFF00", // Yellow
    "black",
    "#00FF00", // Green
    "black",
    "#0000FF", // Blue
    "black",
    "#4B0082", // Indigo
    "black",
    "#9400D3", // Violet
    "black",
  ];

  const anglePerColor = 360 / (colors.length * 6);
  let currentAngle = 0;

  const repeatingConicGradient = colors
    .map((color, index) => {
      if (color === "black") {
        currentAngle += anglePerColor / 5;
      } else {
        currentAngle += anglePerColor;
      }
      return `${color} ${currentAngle}deg ${currentAngle + anglePerColor}deg`
    })
    .join(', ');
  return (
    <div className="relative h-full w-full overflow-hidden text-black">
      <div
        className="rainbow-spin size-[260%] absolute origin-center top-1/2 left-1/2"
        style={{
          background: `repeating-conic-gradient(${repeatingConicGradient})`,
        }}
      />
      <div className="top-1/2 bg-white rounded-md w-[80%] left-1/2 absolute flex translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center gap-2 p-4">{children}</div>
    </div>
  );
}
