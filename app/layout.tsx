import type { Metadata } from "next";
import { Quicksand } from 'next/font/google'
import "./globals.css";
import React from "react";

const quicksand = Quicksand({
    subsets: ['latin'],
    variable: '--font-body',
    weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
    title: 'Valentine Card Generator',
    description: 'Create beautiful interactive Valentine cards',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={`${quicksand.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
