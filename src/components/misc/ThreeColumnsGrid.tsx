export default function ThreeColumnsGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-3 gap-2 rounded-md bg-[#efefef] p-2">{children}</div>;
}
