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
  title: "아린워시(Alinwash) | 출장 세차 No.1",
  description: "3050 오너드라이버가 선택한 No.1 대림일 출장 세차",
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
