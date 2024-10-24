import { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Jaime Resano | Personal website",
  description: "Jaime Resano Aisa personal website",
};

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </head>
      <body className={`flex min-h-screen flex-col transition-colors duration-300 ease-linear`}>
        <ThemeProvider attribute="class">
        <TooltipProvider delayDuration={100}>{children}</TooltipProvider></ThemeProvider>
      </body>
    </html>
  );
}
