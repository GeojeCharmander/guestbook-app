import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "나의 방명록",
  description: "다녀가신 분들의 마음을 남기는 방명록",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
