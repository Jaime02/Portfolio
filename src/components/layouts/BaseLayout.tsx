import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsContextProvider } from "@/app/lib/SettingsContext";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default async function BaseLayout({ children, locale }: { children: React.ReactNode; locale: string }) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`flex min-h-dvh flex-col transition-colors duration-300 ease-linear`}>
        <ThemeProvider attribute="class">
          <TooltipProvider delayDuration={100}>
            <SettingsContextProvider>
              <NextIntlClientProvider messages={messages}>
                {children}
                <SpeedInsights/>
              </NextIntlClientProvider>
            </SettingsContextProvider>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
