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
    icons: {
      icon: "/favicon/favicon.svg",
      shortcut: "/favicon/favicon.svg",
      apple: "/favicon/apple-touch-icon.png",
      other: {
        rel: "apple-touch-icon-precomposed",
        url: "/favicon/apple-touch-icon.png",
      }
    },
    openGraph: {
      title: "Jaime Resano | Portfolio",
      description: "Jaime Resano Aisa's portfolio",
      site_name: "Jaime Resano Aisa Portfolio",
      url: "https://jaime02.vercel.app/",
      images: [
        {
          "url": "/images/ThisWebsitePreview.webp",
          "width": 1145,
          "height": 865,
        }
      ]
    },
    type: 'website'
  };
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
