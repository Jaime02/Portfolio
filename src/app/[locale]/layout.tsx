import "@/app/globals.css";
import { routing } from "@/translations/routing";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BaseLayout from "@/components/layouts/BaseLayout";
import { StoriesContextProvider } from "@/app/lib/StoriesContext";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });
  return {
    title: t("title"),
    description: t("description"),
  };
  // TO DO
  /*
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
  <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
  <link rel="manifest" href="/site.webmanifest" />*/
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (locale && !routing.locales.includes(locale as any)) {
    return notFound();
  }
  setRequestLocale(locale);

  return (
    <BaseLayout locale={locale}>
      <StoriesContextProvider locale={locale}>{children}</StoriesContextProvider>
    </BaseLayout>
  );
}
