import type { Metadata } from "next";
import { Inter, Rochester } from "next/font/google";
import "./globals.css";
import React from "react";


const inter = Inter({ subsets: ["latin"] });

const rochester = Rochester({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rochester",
});


export const metadata: Metadata = {
  title: "Text and File Sharing",
  description: "Easy & fast text & file sharing for your friends.",
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
