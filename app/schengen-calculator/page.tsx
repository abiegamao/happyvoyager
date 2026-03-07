import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchengenCalculator from "@/components/SchengenCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schengen Trip Tracker ~ Days & Budget | Happy Voyager",
  description:
    "Track your Schengen 90/180-day compliance and calculate required travel funds by country. Add your trips, pick destinations, and instantly know your status and budget.",
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
