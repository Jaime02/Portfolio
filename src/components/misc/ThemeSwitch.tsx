import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Image from "next/image";
import DarkThemeIcon from "@/icons/DarkThemeIcon";
import LightThemeIcon from "@/icons/LightThemeIcon";

export default function ThemeSwitch() {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading themes...</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="theme-switch" aria-labelledby="theme-switch">
        <LightThemeIcon/>
      </Label>
      <Switch id="theme-switch" checked={resolvedTheme === "dark"} onCheckedChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} />
      <Label htmlFor="theme-switch" aria-labelledby="theme-switch">
        <DarkThemeIcon/> 
      </Label>
    </div>
  );
}
