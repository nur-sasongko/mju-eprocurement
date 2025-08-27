import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import MainProvider from "@/shared/providers";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unit Pengelola Zakat (UPZ) KPAD",
  description: "Aplikasi untuk memudahkan pengelolaan zakat di KPAD RW 02 Bandung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} antialiased`}
      >
        <MainProvider>
          {children}
        </MainProvider>
      </body>
    </html>
  );
}
