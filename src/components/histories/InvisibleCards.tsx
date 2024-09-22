import InvisibleCardsLayout from "@/components/histories/InvisibleCardsLayout";

export default function InvisibleCards({ keys }: { keys: number[] }) {
  return Array(keys.length)
    .fill(0)
    .map((_, i) => {
      return <InvisibleCardsLayout key={keys[i]} />;
    });
}
