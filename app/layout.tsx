import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import CustomCursor from "@/components/CustomCursor";
import PageWrapper from "@/components/PageWrapper";
import PageTransition from "@/components/PageTransition";

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
    <html lang="en">
      <body>
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
