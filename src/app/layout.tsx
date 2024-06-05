import FloatingActions from "@/components/layout/FloatingActions";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ThemeProvider from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

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
        className={`relative mx-auto max-w-[120rem] bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 ${pretendard.variable} `}
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
