import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect, useContext } from "react";
import DarkThemeIcon from "@/icons/DarkThemeIcon";
import LightThemeIcon from "@/icons/LightThemeIcon";
import { SettingsContext } from "@/app/lib/SettingsContext";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";

export default function ThemeSwitch() {
  const { theme, setTheme } = useContext(SettingsContext);
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("Theme");
  const { toast } = useToast();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading themes...</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="theme-switch" aria-labelledby="theme-switch" className="hover:cursor-pointer">
        <LightThemeIcon extraClasses="size-8"/>
      </Label>
      <Switch id="theme-switch" checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <Label htmlFor="theme-switch" aria-labelledby="theme-switch" className="hover:cursor-pointer">
        <DarkThemeIcon extraClasses="size-8"/>
      </Label>
    </div>
  );
}
