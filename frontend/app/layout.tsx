import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display serif for headings / big numbers
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

// Clean humanist sans for body text
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

// Mono for data labels
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "CONTENT INTELLIGENCE | TERMINAL",
  description: "Distribution & Demand Intelligence Visualization",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0a14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${jetBrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">{children}</body>
    </html>
  );
}