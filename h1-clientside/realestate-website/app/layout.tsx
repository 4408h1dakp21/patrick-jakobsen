import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Houes´s Real Estate",
  description: "Houes´s Real Estate - Din partner i boligmarkedet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
         <body className={inter.className}>{children}</body>
        </html>
  );
}
