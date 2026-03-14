import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TaxCalculator from "@/components/TaxCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spain Tax & Autónomo Calculator ~ Estimate Your Take-Home | Happy Voyager",
  description:
    "Calculate your Spanish income tax (IRPF), autónomo social security fees, and net take-home pay. Compare Beckham Law vs standard rates and tarifa plana savings.",
};

export default function TaxCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#f9f5f2] font-sans">
      <Header />
      <TaxCalculator />
      <Footer />
    </div>
  );
}
