import FloatingActions from "@/components/common/FloatingActions";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import ThemeProvider from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "영민하다",
  description: "생각나면 기록을 하세요 :) ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`relative mx-auto max-w-[1200px] bg-[var(--background)] text-[var(--foreground)] ${inter.className} `}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
