import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchengenCalculator from "@/components/SchengenCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schengen 90/180 Day Calculator | Happy Voyager",
  description:
    "Track your Schengen days in real time. Add your past trips, see your rolling 180-day window, and plan future travel without guessing.",
};

export default function SchengenCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#f9f5f2] font-sans">
      <Header />
      <SchengenCalculator />
      <Footer />
    </div>
  );
}
