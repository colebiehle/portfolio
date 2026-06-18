import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const description =
  "AI-augmented product designer. Published human-AI research, designs the experience, and ships it in code. CMU MHCI '26, open to AI product design roles.";

export const metadata: Metadata = {
  metadataBase: new URL("https://colebiehle.com"),
  title: "Cole Biehle — AI Product Designer",
  description,
  openGraph: {
    title: "Cole Biehle — AI Product Designer",
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        {children}
      </body>
    </html>
  );
}
