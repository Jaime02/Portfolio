import { Metadata } from "next";
import { InstagramSans } from "@/misc/fonts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Jaime Resano | Personal website",
  description: "Jaime Resano Aisa personal website",
};
// scroll-smooth motion-reduce:scroll-auto
export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${InstagramSans.className} flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white`}>{children}</body>
    </html>
  );
}
