import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

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
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-coal-950 text-zinc-200 antialiased font-body">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="ml-60 flex-1 overflow-auto">
            <div className="mx-auto max-w-4xl px-8 py-10">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
