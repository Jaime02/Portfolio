export default function ThreeColumnsGrid({children}: {children: React.ReactNode}) {
  return (
    <div className="grid grid-cols-3 gap-2 p-2 bg-gray-100 rounded-md">
      {children}
    </div>
  );
}
