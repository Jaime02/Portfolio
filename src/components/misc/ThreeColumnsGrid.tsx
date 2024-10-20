export default function ThreeColumnsGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-3 gap-2 rounded-md bg-ig-gray dark:bg-gray-800 p-2">{children}</div>;
}
