import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono } from "next/font/google";

import { Header } from "@/components/layout/Header";
import { SettingsProvider } from "@/components/providers/inteview-settings";
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
  title: "AI Interview Coach",
  description: "Practice frontend interviews with instant AI feedback",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="flex h-dvh flex-col overflow-x-hidden overflow-y-hidden bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-white">
        <NextTopLoader
          color="#22d3ee"
          showSpinner={false}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <SettingsProvider>
            <Header />
            {children}
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
