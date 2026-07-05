import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shudhanshu Jaiswal — Portfolio",
  description:
    "Data & Business Analytics · IPM @ IIM Jammu. Projects in simulation, strategy, and e-commerce analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--bg)] text-[var(--text)]">
        <AppProviders>
          <div className="relative z-[2] min-h-screen pl-0 md:pl-16">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
