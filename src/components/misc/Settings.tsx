import SoundCheckbox from "@/components/misc/SoundCheckbox";
import ThemeSwitch from "@/components/misc/ThemeSwitch";

export default function Settings() {
  return (
    <div className="flex flex-col gap-3">
      <ThemeSwitch />
      <div className="flex gap-2 items-center">Sound: <SoundCheckbox extraClasses="size-6" /></div>
    </div>
  );
}
