import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const nunito = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Happy Voyager | Digital Nomad Visa Consulting",
  description:
    "Expert visa consulting services for digital nomads. Navigate global visa requirements with ease and start your remote work adventure today.",
  keywords: [
    "digital nomad visa",
    "remote work visa",
    "visa consulting",
    "work abroad",
    "nomad lifestyle",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
