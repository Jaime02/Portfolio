interface TabThumbnailLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  href: string;
}

export default function TabThumbnailLayout({children, href}: TabThumbnailLayoutProps) {
  return (
    <a href={href} className="content-center aspect-square bg-white rounded-md p-2">
      {children}
    </a>
  );
}
