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
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import AnimateIn from "@/components/ui/AnimateIn";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f5f2] overflow-hidden">
      <Header />
      <PageTransition>
        <HeroSection />
        <AnimateIn><MyStorySection /></AnimateIn>
        <AnimateIn delay={0.05}><WhyChooseUsSection /></AnimateIn>
        <AnimateIn delay={0.05}><DNVTeaser /></AnimateIn>
        <AnimateIn delay={0.05}><ProcessSection /></AnimateIn>
        <AnimateIn delay={0.05}><PlaybookPreviewSection /></AnimateIn>
        <AnimateIn delay={0.05}><PricingSection /></AnimateIn>

        {/* Not sure which package? */}
        <AnimateIn>
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
        </AnimateIn>

        <AnimateIn delay={0.05}><OtherServicesSection /></AnimateIn>
        <AnimateIn delay={0.05}><CTASection /></AnimateIn>
        {/* <ServicesSection /> */}
        {/* <TestimonialsSection /> */}
        {/* <DestinationsSection /> */}
        <AnimateIn delay={0.05}><FAQSection /></AnimateIn>

        <AnimateIn>
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
              <a
                href="/playbook/spain-dnv"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-all duration-300 group"
              >
                Start Here for Free
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </a>
            </div>
          </div>
        </AnimateIn>

        <Footer />
      </PageTransition>
    </main>
  );
}
