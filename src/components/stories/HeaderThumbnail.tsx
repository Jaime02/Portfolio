import Image from "next/image";

export default function HeaderThumbnail({ src }: { src: string }) {
  return (
    <Image src={src} alt="Story group thumbnail" width="32" height="32" className="rounded-full size-8 bg-white" />
  ); 
}