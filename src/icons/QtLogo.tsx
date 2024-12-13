import { useTranslations } from "next-intl";

export default function QtLogo({extraClasses}: {extraClasses?: string}) {
  const t = useTranslations('Qt projects');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 462 339" className={extraClasses}>
      <title>{t("1.11")}</title>
      <path fill="#41cd52" d=" M 63.50 0.00 L 462.00 0.00 L 462.00 274.79 C 440.60 296.26 419.13 317.66 397.61 339.00 L 0.00 339.00 L 0.00 63.39 C 21.08 42.18 42.34 21.13 63.50 0.00 Z" />
      <path
        d=" M 122.37 71.33 C 137.50 61.32 156.21 58.79 174.00 58.95 C 190.94 59.16 208.72 62.13 222.76 72.24 C 232.96 79.41 239.59 90.48 244.01 101.93 C 251.16 120.73 253.26 141.03 253.50 161.01 C 253.53 181.13 252.62 201.69 245.96 220.86 C 241.50 233.90 233.01 245.48 221.81 253.52 C 229.87 266.58 238.09 279.54 246.15 292.60 C 236.02 297.27 225.92 301.97 215.78 306.62 C 207.15 292.38 198.56 278.11 189.90 263.89 C 178.19 265.81 166.21 265.66 154.44 264.36 C 140.34 262.67 125.97 258.37 115.09 248.88 C 106.73 241.64 101.48 231.51 97.89 221.21 C 92.01 203.79 90.43 185.25 90.16 166.97 C 90.02 147.21 91.28 127.14 97.24 108.18 C 101.85 93.92 109.48 79.69 122.37 71.33 Z"
        fill="white"
      />
      <path
        d=" M 294.13 70.69 C 304.73 70.68 315.33 70.68 325.93 70.69 C 325.96 84.71 325.92 98.72 325.95 112.74 C 339.50 112.76 353.05 112.74 366.60 112.75 C 366.37 121.85 366.12 130.95 365.86 140.05 C 352.32 140.08 338.79 140.04 325.25 140.07 C 325.28 163.05 325.18 186.03 325.30 209.01 C 325.56 215.30 325.42 221.94 328.19 227.75 C 330.21 232.23 335.65 233.38 340.08 233.53 C 348.43 233.50 356.77 233.01 365.12 232.86 C 365.63 241.22 366.12 249.59 366.60 257.95 C 349.99 260.74 332.56 264.08 316.06 258.86 C 309.11 256.80 302.63 252.19 299.81 245.32 C 294.76 233.63 294.35 220.62 294.13 208.07 C 294.11 185.40 294.13 162.74 294.12 140.07 C 286.73 140.05 279.34 140.08 271.95 140.05 C 271.93 130.96 271.93 121.86 271.95 112.76 C 279.34 112.73 286.72 112.77 294.11 112.74 C 294.14 98.72 294.10 84.71 294.13 70.69 Z"
        fill="white"
      />
      <path
        fill="#41cd52"
        d=" M 160.51 87.70 C 170.80 86.36 181.60 86.72 191.34 90.61 C 199.23 93.73 205.93 99.84 209.47 107.58 C 214.90 119.31 216.98 132.26 218.03 145.05 C 219.17 162.07 219.01 179.25 216.66 196.17 C 215.01 206.24 212.66 216.85 205.84 224.79 C 198.92 232.76 188.25 236.18 178.01 236.98 C 167.21 237.77 155.82 236.98 146.07 231.87 C 140.38 228.84 135.55 224.09 132.73 218.27 C 129.31 211.30 127.43 203.69 126.11 196.07 C 122.13 171.91 121.17 146.91 126.61 122.89 C 128.85 113.83 132.11 104.53 138.73 97.70 C 144.49 91.85 152.51 88.83 160.51 87.70 Z"
      />
    </svg>
  );
}
