import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Christin Koshy | Power BI Team Lead & Microsoft Fabric Developer",
  description:
    "Power BI Team Lead, Microsoft Fabric Developer, and Data Analytics Engineer specializing in enterprise dashboards, real-time pipelines, and embedded analytics.",
  keywords: [
    "Power BI",
    "Microsoft Fabric",
    "Data Analytics",
    "DAX",
    "Azure",
    "SQL Server",
    "Christin Koshy",
  ],
  authors: [{ name: "Christin Koshy" }],
  openGraph: {
    title: "Christin Koshy | Power BI Team Lead & Microsoft Fabric Developer",
    description:
      "Enterprise data visualisation, Microsoft Fabric pipelines, and Power BI embedded analytics.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christin Koshy | Power BI Team Lead",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
        style={{ fontFamily: "var(--font-geist, 'Geist', system-ui, sans-serif)" }}
      >
        {children}
      </body>
    </html>
  );
}
