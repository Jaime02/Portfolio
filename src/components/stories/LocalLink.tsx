import LinkIcon from "@/icons/LinkIcon";
import Link from "next/link";

export default function LocalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn-primary mx-auto text-lg" onClick={(event) => event.stopPropagation()}>
      <LinkIcon extraClasses="size-8" />
      {children}
    </Link>
  );
}
