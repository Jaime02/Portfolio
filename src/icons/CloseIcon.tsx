import { useTranslations } from "next-intl";

export default function CloseIcon({extraClasses}: {extraClasses?: string}) {
  const t = useTranslations('Icons');
  return (
    <svg aria-label={t("Close")} className={extraClasses} fill="currentColor" height="16" role="img" viewBox="0 0 24 24" width="16">
      <title>{t("Close")}</title>
      <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
      <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
    </svg>
  );
}
