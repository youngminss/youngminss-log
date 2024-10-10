import FloatingActions from "@/components/layout/FloatingActions";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Sonnar from "@/components/ui/Sonnar";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: {
    template: `%sㅣyoungminss-log`,
    default: "youngminss-log",
  },
  description: "🌟 Let the brighter shine the brighter.",
  authors: [{ name: "Youngmin Wi", url: "www.youngminss-log.com" }],
  creator: "Youngmin Wi",
  publisher: "Youngmin Wi",
  generator: "Next.js",
  applicationName: "youngminss-log",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: "youngminss-log",
    description: "🌟 Let the brighter shine the brighter.",
    type: "website",
    siteName: "youngminss-log",
    url: "www.youngminss-log.com",
    images: {
      url: "https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F1e48ae17-fbee-406f-9bca-eaae95ca4225%2F423c0680-e08e-481d-8b03-49485cbbe0ea%2Fdefault-thumbnail.webp?table=block&id=1190e255-48e7-808f-b0a4-cc7ba411ac40&spaceId=1e48ae17-fbee-406f-9bca-eaae95ca4225&width=2000&userId=90a7e981-8cb0-4578-9ca1-25c51ac47e43&cache=v2",
      width: 1200,
      height: 800,
    },
    locale: "ko_KR",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 ${pretendard.variable}`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Footer />

          <FloatingActions />
          <Sonnar
            position="top-center"
            duration={1000}
            toastOptions={{
              className: "bg-[var(--background)] text-[var(--foreground)]",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
