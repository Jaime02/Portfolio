interface TabThumbnailLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  href: string;
  padding?: boolean;
}

export default function TabThumbnailLayout({children, href, padding = false}: TabThumbnailLayoutProps) {
  return (
    <a href={href} className={`content-center aspect-square bg-white rounded-md overflow-hidden ${padding ? "p-2": ""}`}>
      {children}
    </a>
  );
}
