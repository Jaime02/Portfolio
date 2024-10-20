interface TabThumbnailLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  href: string;
  padding?: boolean;
}

export default function TabThumbnailLayout({ children, href, padding = false }: TabThumbnailLayoutProps) {
  return (
    <a aria-label="Select tab" href={href} className={`aspect-square content-center overflow-hidden rounded-md bg-gray-50 active:ring-2 dark:bg-gray-300 ${padding ? "p-2" : ""}`}>
      {children}
    </a>
  );
}
