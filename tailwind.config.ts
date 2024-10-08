import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/icons/**/*.{js,ts,jsx,tsx,mdx}",
  ],
	darkMode: "class",
	theme: {
		extend: {},
		fontFamily: {
			'system': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'] ,
		},
	},
	plugins: [],
};
export default config;
