import localFont from "next/font/local";

export const InstagramSans = localFont({
  // Define a css variable to use down the line --> e.g. font-family: var(--my-custom-font)
  variable: "--instagram-sans",
  src: [
    {
      path: "./font-files/Instagram Sans Light.woff",  
      weight: "300",
      style: "normal",
    },
    {
      path: "./font-files/Instagram Sans.woff",  
      weight: "400",
      style: "normal",
    },
    {
      path: "./font-files/Instagram Sans Medium.woff",  
      weight: "500",
      style: "normal",
    },
    {
      path: "./font-files/Instagram Sans Bold.woff",  
      weight: "700",
      style: "normal",
    },
  ],
});