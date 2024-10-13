import localFont from "next/font/local";

export const InstagramSans = localFont({
  variable: "--instagram-sans",
  src: [
    {
      path: "../font-files/instagram/Instagram Sans Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../font-files/instagram/Instagram Sans.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font-files/instagram/Instagram Sans Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../font-files/instagram/Instagram Sans Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const QtFont = localFont({
  variable: "--titillium-web",
  src: [
    {
      path: "../font-files/qt/TitilliumWeb-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../font-files/qt/TitilliumWeb-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../font-files/qt/TitilliumWeb-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font-files/qt/TitilliumWeb-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../font-files/qt/TitilliumWeb-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});
