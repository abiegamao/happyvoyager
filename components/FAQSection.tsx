"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import BookCallButton from "@/components/BookCallButton";

const faqs = [
  {
    question: "Can I really do this without a lawyer?",
    answer:
      "Yes. I did it myself with a non-EU passport and zero legal help. Lawyers charge €2,000~€3,500 for the same process. The Playbook gives you the exact steps, templates, screenshots, and working links I used. If you want someone to check your work, the Guided Navigator adds a full document review. If you want it fully handled, the VIP Concierge does everything for you.",
  },
  {
    question: "What if I'm not sure I qualify yet?",
    answer:
      "That's exactly why Phase 0 of the Playbook exists ~ it walks you through the eligibility check before you touch any paperwork. You need a minimum of ~€2,894/mo from foreign clients (employment, freelance, or business). The Playbook helps you figure out if this visa fits your situation before you spend time or money.",
  },
  {
    question: "What if I start the trial and it's not for me?",
    answer:
      "Cancel anytime during your 14-day trial. No questions, no hoops. The trial gives you full access so you can explore every phase and decide if it's worth it. Most people know within the first few lessons.",
  },
  {
    question: "I found free info online. Why would I pay for this?",
    answer:
      "Free info is scattered, outdated, and often wrong ~ especially for non-EU applicants. Spanish government links break constantly, and forums are full of conflicting advice. The Playbook is a tested system built from real experience: verified links, correct templates, step-by-step screenshots, and an AI assistant that answers your specific questions 24/7. It saves you weeks of research and helps avoid costly mistakes.",
  },
  {
    question: "Can I bring my family with me?",
    answer:
      "Yes. Spain allows you to include your spouse or partner and dependent children. They can apply together with you or join later through family reunification. Each person needs their own documents, and the income requirement increases slightly per dependent. The Playbook covers this in detail.",
  },
  {
    question: "How long does the whole process take?",
    answer:
      "The UGE portal decision usually takes 20~45 business days. Add 2~4 weeks for gathering documents, apostilles, and translations. From start to approval: expect about 2~3 months total. The Playbook gives you a timeline so you know exactly what to do and when.",
  },
  {
    question: "Do I need to speak Spanish to apply?",
    answer:
      "No language requirement for the visa. The UGE portal is in Spanish but the Playbook walks you through every screen with screenshots. Your documents just need certified translations ~ no test, no interview. Need a translator for your appointment? Our Translation Companion service pairs you with a live interpreter who joins you at the NIE, TIE, or empadronamiento office so nothing gets lost. Basic Spanish helps with daily life, and we have a DELE A2 Playbook coming soon for that.",
  },
  {
    question: "What about taxes once I move to Spain?",
    answer:
      "Once you're a tax resident, you'll pay Spanish taxes. The Beckham Law offers a flat 24% rate for 6 years for employed workers. Freelancers have different rules depending on where their income comes from. Phase 4 of the Playbook breaks down your tax obligations and renewal strategy. For your specific situation, always confirm with a Spanish tax advisor (gestor).",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="section-padding relative overflow-hidden bg-white"
    >
      <div className="max-w-4xl mx-auto relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/20 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#d69586] uppercase">
              Common Questions
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            Questions?{" "}
            <span className="font-script text-[#e3a99c] text-5xl md:text-7xl relative inline-block transform -rotate-2">
              I&apos;ve Got Answers
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about the Spain Digital Nomad Visa process.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 ${openIndex === index
                ? "bg-[#f9f5f2] border border-[#e3a99c]/30 shadow-sm"
                : "bg-white border border-[#e7ddd3] hover:border-[#bbcccd]"
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-7 text-left"
              >
                <span
                  className={`font-[family-name:var(--font-heading)] text-base md:text-lg font-bold leading-snug transition-colors flex-1 min-w-0 ${openIndex === index ? "text-[#3a3a3a]" : "text-[#6b6b6b]"
                    }`}
                >
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index
                    ? "bg-[#e3a99c] text-white shadow-md"
                    : "bg-[#f2f2f2] text-[#6b6b6b]"
                    }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Plus className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-5 md:px-7 pb-6">
                  <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed text-base md:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-16 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold text-[#3a3a3a] mb-4">
            Still have questions?
          </h3>
          <BookCallButton
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-colors"
            url="https://calendly.com/abie-gamao/spain-dnv"
            title="Book a Strategy Call"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Book a Strategy Call</span>
          </BookCallButton>
        </div>
      </div>
    </section>
  );
}
