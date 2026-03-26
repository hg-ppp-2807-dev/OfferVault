import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import Script from "next/script";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlaceCoach — AI Placement Coach",
  description: "Analyze your resume, ace mock interviews, and build your placement roadmap with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-zinc-50 text-zinc-800 antialiased font-body dark:bg-coal-950 dark:text-zinc-200">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var k='placecoach-theme';var s=localStorage.getItem(k);var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s||(d?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`}
        </Script>
        <div className="flex min-h-screen bg-zinc-50 dark:bg-coal-950">
          <Sidebar />
          <main className="ml-60 flex-1 overflow-auto">
            <div className="mx-auto max-w-4xl px-8 py-10">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
