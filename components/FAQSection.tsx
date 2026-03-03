"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is the Spain Digital Nomad Visa?",
    answer:
      "The Spain Digital Nomad Visa (officially called the Visa para teletrabajo de carácter internacional) is a residence visa that allows remote workers and freelancers to live and work legally in Spain. It's designed for people who work remotely for companies or clients outside of Spain. The visa is initially granted for up to 3 years and can be renewed.",
  },
  {
    question: "How long does the whole process take?",
    answer:
      "The online application through the UGE portal typically takes 20–45 business days for a decision. Factor in time for gathering documents, apostilles, and translations, that can add 2–4 weeks. Start to approval: expect 2–3 months total.",
  },
  {
    question: "What are the income requirements?",
    answer:
      "You need to prove a minimum monthly income of approximately €2,849 (200% of Spain's minimum wage). This can come from employment, freelance work, or business ownership. The key requirement is that your income must come from clients or employers outside of Spain.",
  },
  {
    question: "Do I need a lawyer to apply?",
    answer:
      "No, that's exactly why this playbook exists. The process is straightforward with the right guidance. I applied without a lawyer and saved €2,000+. The playbook gives you everything you need. If you want hands-on support, the Strategy Call or full package is there for that.",
  },
  {
    question: "Can I bring my family?",
    answer:
      "Yes. Spain allows you to include family members in your application or they can apply for family reunification after you receive your visa. This includes your spouse/partner and dependent children. Each family member needs their own documents, and income requirements increase slightly per person.",
  },
  {
    question: "Do I need to speak Spanish?",
    answer:
      "No Spanish language requirement for the visa. That said, basic Spanish helps a lot with daily life and bureaucratic steps. The UGE portal is in Spanish, but the documents just need certified translations, no language test required.",
  },
  {
    question: "What about taxes? Do I pay in Spain?",
    answer:
      "Yes, once you're a tax resident you'll be subject to Spanish taxes. However, Spain offers the Beckham Law (Régimen Especial para Trabajadores Desplazados), a flat 24% tax rate on Spanish-sourced income for your first 6 years, instead of progressive rates up to 47%. Foreign-sourced income is generally exempt. Consult a tax advisor for your specific situation.",
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
              className={`rounded-2xl transition-all duration-300 ${
                openIndex === index
                  ? "bg-[#f9f5f2] border border-[#e3a99c]/30 shadow-sm"
                  : "bg-white border border-[#e7ddd3] hover:border-[#bbcccd]"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-7 text-left"
              >
                <span
                  className={`font-[family-name:var(--font-heading)] text-base md:text-lg font-bold leading-snug transition-colors flex-1 min-w-0 ${
                    openIndex === index ? "text-[#3a3a3a]" : "text-[#6b6b6b]"
                  }`}
                >
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
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
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
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
          <a
            href="https://calendly.com/abie-gamao/spain-dnv"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span>Book a Strategy Call</span>
          </a>
        </div>
      </div>
    </section>
  );
}
