import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import LanguageSync from '@/components/LanguageSync';

const inter = Inter({
  variable: "--font-sans-cyber",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono-cyber",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ደህንነት | Cybersecurity Awareness",
  description: "Real-time Link Checker, Awareness Hub, and Compromise Simulator.",
};

// Simplified the types to standard Next.js layout properties to avoid compiler bugs
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="h-full w-full overflow-hidden bg-background text-foreground transition-colors duration-200">
        <LanguageSync />
        {children}
      </body>
    </html>
  );
}