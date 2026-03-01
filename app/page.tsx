import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import MyStorySection from "@/components/MyStorySection";
import PlaybookPreviewSection from "@/components/PlaybookPreviewSection";
import DestinationsSection from "@/components/DestinationsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f5f2] overflow-hidden">
      <Header />
      <HeroSection />
      <WhyChooseUsSection />
      {/* <ServicesSection /> */}
      <MyStorySection />
      <PlaybookPreviewSection />
      <ProcessSection />
      {/* <TestimonialsSection /> */}
      {/* <DestinationsSection /> */}
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
