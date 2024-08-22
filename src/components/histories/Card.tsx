export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="flex min-w-full flex-col bg-red-500 snap-center">{children}</div>;
}
