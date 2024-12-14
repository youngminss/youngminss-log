import FloatingActions from "@/components/layout/FloatingActions";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Sonnar from "@/components/ui/Sonnar";
import { BASE_URL } from "@/utils/const";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  authors: [{ name: "Youngmin Wi", url: BASE_URL }],
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
    url: BASE_URL,
    images: {
      url: "https://img.notionusercontent.com/s3/prod-files-secure%2F1e48ae17-fbee-406f-9bca-eaae95ca4225%2Fcd3aabb2-241e-4409-bef9-3cbf3bc1f5a3%2Fthumbnail-default.webp/size/w=2000?exp=1730394410&sig=7HLE-bBjWrZSeJzSfzbZW-Oe7ZNOf0iCcqVNu1MX0G4",
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

        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
