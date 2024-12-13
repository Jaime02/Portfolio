import { useTranslations } from "next-intl";

export default function SpanishFlagIcon({ extraClasses }: { extraClasses?: string }) {
  const t = useTranslations('Icons');
  return (
    <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className={`${extraClasses}`}>
      <title>{t("Spanish flag")}</title>
      <path fill="#C60A1D" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"></path>
      <path fill="#FFC400" d="M0 12h36v12H0z"></path>
    </svg>
  );
}
