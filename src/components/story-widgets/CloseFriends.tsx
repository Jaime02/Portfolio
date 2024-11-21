import { useTranslations } from "next-intl";

export default function CloseFriends() {
  const t = useTranslations("Icons");
  return (
    <div className="bg-ig-close-friends p-2 flex gap-1 items-center justify-center rounded-md text-white">
      <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
        <title>{t("Close friends")}</title>
        <path d="M18.18 22.51a.99.99 0 0 1-.513-.142L12 18.975l-5.667 3.393a1 1 0 0 1-1.492-1.062l1.37-6.544-4.876-4.347a.999.999 0 0 1 .536-1.737l6.554-.855 2.668-5.755a1 1 0 0 1 1.814 0l2.668 5.755 6.554.855a.999.999 0 0 1 .536 1.737l-4.876 4.347 1.37 6.544a1 1 0 0 1-.978 1.205Z"></path>
      </svg>
      <p className="hidden sm:block text-xs font-semibold">{t("Close friends")}</p>
    </div>
  );
}
