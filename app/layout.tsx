import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import RouteLoadingIndicator from "@/components/RouteLoadingIndicator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookHub - Learn Next.js",
  description: "A Next.js demo app for learning with books and authors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <Suspense fallback={null}>
          <RouteLoadingIndicator />
        </Suspense>
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
          {children}
        </main>
      </body>
    </html>
  );
}
