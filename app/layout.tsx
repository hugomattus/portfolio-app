import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import PageTransition from "@/components/PageTransition";

const FloatingButton = dynamic(() => import("@/components/FloatingButton"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export const metadata: Metadata = {
  title: "Hugo Mello — Freelancer Product Designer",
  description: "Portfolio of Hugo Mello, Freelancer Product Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/assets/Favicon.png" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <CustomCursor />
        <Header />
        <PageTransition />
        <PageWrapper>{children}</PageWrapper>
        <footer className="site-footer">
          <div className="footer-inner">
            <Footer />
          </div>
        </footer>
        <FloatingButton />
      </body>
    </html>
  );
}
