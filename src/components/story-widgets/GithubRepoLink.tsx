import GithubIcon from "@/icons/GithubIcon";
import { useTranslations } from "next-intl";

export default function GithubRepoLink({ href }: { href: string }) {
  const t = useTranslations("Commons");
  return (
    <a className="mx-auto" href={href} target="_blank">
      <button className="styled-a btn-secondary text-lg">
        <GithubIcon extraClasses="size-8" />
        {t("Source code")}
      </button>
    </a>
  );
}
