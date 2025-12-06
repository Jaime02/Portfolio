import { cn } from "@/misc/utils";

interface RainboxBackgroundContainerProps {
  children?: React.ReactNode;
  extraClasses?: string;
  repetitions?: number;
}

export default function RainboxBackgroundContainer({
  children,
  extraClasses,
  repetitions = 6,
}: RainboxBackgroundContainerProps) {
  // Rainbow colors
  const colors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#9400D3", // Violet
  ];

  const anglePerColor = 360 / (colors.length * repetitions);
  let currentAngle = 0;

  const repeatingConicGradient = colors
    .map((color) => {
      if (color === "black") {
        if (repetitions > 2) {
          currentAngle += anglePerColor / 5;
        }
      } else {
        currentAngle += anglePerColor;
      }
      return `${color} ${currentAngle}deg ${currentAngle + anglePerColor}deg`;
    })
    .join(", ");
  return (
    <div className={cn("relative h-full w-full overflow-hidden text-black", extraClasses)}>
      <div
        className="rainbow-spin blur-[1px] absolute top-1/2 left-1/2 size-[260%] origin-center"
        style={{
          background: `repeating-conic-gradient(${repeatingConicGradient})`,
        }}
      />
      <div
        className={`absolute top-1/2 left-1/2 flex w-[80%] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-center gap-2 rounded-md bg-white ${children ? "p-4" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
