import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyAppSpace",
  description: "MyAppSpace | Marketplace for Online Stores & Pre-Built Apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font font-geist antialiased`}
      >
        {children}

        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            duration: 2000,
            classNames: { default: "toastClassName" },
          }}
        />
      </body>
    </html>
  );
}
