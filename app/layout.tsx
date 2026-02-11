import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "아린워시(Alinwash) | 출장 세차 No.1",
  description: "3050 오너드라이버가 선택한 No.1 디테일링 출장 세차",
  openGraph: {
    images: [
      {
        url: "/logo-larger.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo-larger.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <div className="min-h-screen overflow-hidden">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
