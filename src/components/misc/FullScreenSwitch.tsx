import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useContext } from "react";
import { SettingsContext } from "@/app/lib/SettingsContext";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";

export default function ThemeSwitch() {
  const { fullScreenStories, setFullScreenStories } = useContext(SettingsContext);
  const t = useTranslations("Settings");
  const { toast } = useToast();

  function onFullScreenStoriesButtonClicked() {
    toast({
      title: (!fullScreenStories ? t("Full screen stories") + " 😎" : t("Full screen stories") + " ❌")
    });
    setFullScreenStories(!fullScreenStories);
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="full-screen-switch" className="hover:cursor-pointer">
        {t("Full screen stories")}
      </Label>
      <Switch id="full-screen-switch" checked={fullScreenStories} onCheckedChange={onFullScreenStoriesButtonClicked} />
    </div>
  );
}
