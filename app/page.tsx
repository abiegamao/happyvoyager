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
import OtherServicesSection from "@/components/OtherServicesSection";
import DNVTeaser from "@/components/DNVTeaser";
import FreePlaybookButton from "@/components/FreePlaybookButton";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f5f2] overflow-hidden">
      <Header />
      <HeroSection />
      <MyStorySection />
      <WhyChooseUsSection />
      <DNVTeaser />
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

      <OtherServicesSection />

      <CTASection />
      {/* <ServicesSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <DestinationsSection /> */}
      <FAQSection />

      {/* Free Playbook fallback */}
      <div id="free-playbook" className="bg-[#f9f5f2] border-t border-[#e7ddd3] py-14 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-bold tracking-widest text-[#7a8f90] uppercase mb-3">Not ready to commit?</p>
          <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-[#3a3a3a] mb-3">
            Get the FREE Playbook{" "}
            <span className="font-script text-[#e3a99c] text-3xl md:text-4xl relative inline-block transform -rotate-1">(Lite Version)</span>
          </h3>
          <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] mb-7">
            Instant access · Lifetime updates · Zero spam
          </p>
          <FreePlaybookButton />
        </div>
      </div>

      <Footer />
    </main>
  );
}
