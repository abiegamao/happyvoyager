import type { Metadata } from "next";
import { Allura } from "next/font/google";
import "./globals.css";

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Happy Voyager | Digital Nomad Visa Consulting",
  description:
    "I help digital nomads navigate global visa requirements. From weak passport to global freedom - let me guide you through your visa journey.",
  keywords: [
    "digital nomad visa",
    "remote work visa",
    "visa consulting",
    "Happy Voyager",
    "nomad lifestyle",
    "weak passport solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${allura.variable}`} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
