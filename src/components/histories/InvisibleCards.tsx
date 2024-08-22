import CardsLayout from "./CardsLayout";

export default function InvisibleCards({ amount, keys }: { amount: number; keys: number[] }) {
  return Array(amount)
    .fill(0)
    .map((_, i) => {
      return <CardsLayout invisible={true} key={keys[i]} />;
    });
}