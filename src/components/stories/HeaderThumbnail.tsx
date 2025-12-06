import Image from "next/image";

export default function HeaderThumbnail({ src }: { src: string }) {
  return (
    <Image src={src} alt="Story group thumbnail" width="32" height="32" className="size-8 rounded-full bg-white" />
  );
}
