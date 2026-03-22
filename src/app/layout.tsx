import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DexHome — Platform Furnitur Premium",
  description: "Platform marketplace furnitur premium Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)" }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
