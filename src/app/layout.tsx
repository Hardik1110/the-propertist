import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Property Listing",
  description: "Browse and search property listings",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-[1600px] items-center px-4 py-3 sm:px-6 lg:px-10">
            <Link href="/" className="text-lg font-bold tracking-tight text-gray-900">
              The <span className="text-blue-600">Propertist</span>
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
