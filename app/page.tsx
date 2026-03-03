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
      <MyStorySection />
      <WhyChooseUsSection />
      <ProcessSection />
      <PlaybookPreviewSection />
      <PricingSection />

      {/* Not sure which package? */}
      <div className="bg-white border-y border-[#e7ddd3] py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a]">
              Not sure which package is right for you?
            </p>
            <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] mt-0.5">
              Book a free 15-min call and we&apos;ll point you in the right direction.
            </p>
          </div>
          <a
            href="https://calendly.com/abie-gamao/spain-dnv"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#3a3a3a] text-[#3a3a3a] font-bold text-sm hover:bg-[#3a3a3a] hover:text-white transition-all duration-300 whitespace-nowrap"
          >
            Book a Free 15-min Call
          </a>
        </div>
      </div>

      <CTASection />
      {/* <ServicesSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <DestinationsSection /> */}
      <FAQSection />
      <Footer />
    </main>
  );
}
