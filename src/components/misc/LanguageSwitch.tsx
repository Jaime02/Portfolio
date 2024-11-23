import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import EnglishFlagIcon from "@/icons/EnglishFlagIcon";
import SpanishFlagIcon from "@/icons/SpanishFlagIcon";
import { useNextIntlRouter, usePathname } from "@/translations/routing";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function LanguageSwitch() {
  const [isMounted, setIsMounted] = useState(false);
  const locale = useLocale();
  const router = useNextIntlRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading languages...</div>;
  }

  function onLanguageChange(checked: boolean) {
    let nextLocale = checked ? "es" : "en";
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale},
      )
    });
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="language-switch" aria-labelledby="language-switch" className="hover:cursor-pointer">
        <EnglishFlagIcon extraClasses="h-6 aspect-ratio-[5/3]" />
      </Label>
      <Switch id="language-switch" checked={locale == "es"} onCheckedChange={onLanguageChange} />
      <Label htmlFor="language-switch" aria-labelledby="language-switch" className="hover:cursor-pointer">
        <SpanishFlagIcon extraClasses="size-8" />
      </Label>
    </div>
  );
}
