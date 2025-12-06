import LocationIcon from "@/icons/LocationIcon";
import { text } from "stream/consumers";

interface Props {
  extraContainerClasses: string;
  locationUrl: string;
  text: string;
}

export default function StoryLocation({ extraContainerClasses, locationUrl, text }: Props) {
  return (
    <div
      className={`clickable absolute z-10 flex translate-x-[-50%] translate-y-[-50%] flex-row items-center justify-center gap-1 rounded-md bg-white p-2 ${extraContainerClasses}`}
    >
      <LocationIcon extraClasses="size-5" />
      <a href={locationUrl} className="sm:text-md font-instagram font-bold text-nowrap text-black" target="_blank">
        {text}
      </a>
    </div>
  );
}
