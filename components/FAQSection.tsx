"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is a digital nomad visa?",
    answer:
      "A digital nomad visa is a special residence permit that allows remote workers, freelancers, and entrepreneurs to legally live and work in a foreign country while working for clients or employers outside that country.",
  },
  {
    question: "How long does the process take?",
    answer:
      "Processing times vary by country, ranging from 2 weeks to 4 months. Portugal's D7 visa typically takes 2-3 months, while Spain's digital nomad visa takes around 20 business days.",
  },
  {
    question: "What are the income requirements?",
    answer:
      "Income requirements vary significantly. Portugal requires ~€3,040/month, Spain ~€2,646/month. Some countries also accept proof of savings instead of regular income.",
  },
  {
    question: "Can I bring my family?",
    answer:
      "Yes! Most digital nomad visa programs allow you to include dependents such as spouses and children. Requirements vary, and additional income proof is usually needed.",
  },
  {
    question: "What if my application is rejected?",
    answer:
      "While my 95% success rate speaks for itself, if your application is rejected, I'll analyze the reasons and guide you through the appeal process at no additional cost.",
  },
  {
    question: "Do I need to pay local taxes?",
    answer:
      "Tax obligations vary. Some countries like Portugal offer favorable tax regimes (NHR), while others exempt nomads from local tax. I include basic tax advisory in my plans.",
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
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/20 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#d69586] uppercase">
              Common Questions
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            Questions? <br />
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl relative inline-block transform -rotate-2 mt-2">
              I&apos;ve Got Answers
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
            The questions I get asked the most — answered straight, no jargon.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-[2rem] transition-all duration-300 ${openIndex === index
                ? "bg-[#f9f5f2] border border-[#e3a99c]/30 shadow-sm"
                : "bg-white border border-[#e7ddd3] hover:border-[#bbcccd]"
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              >
                <span className={`font-[family-name:var(--font-heading)] text-xl font-bold transition-colors ${openIndex === index ? "text-[#3a3a3a]" : "text-[#6b6b6b] group-hover:text-[#3a3a3a]"
                  }`}>
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index
                    ? "bg-[#e3a99c] text-white rotate-0 shadow-md"
                    : "bg-[#f2f2f2] text-[#6b6b6b]"
                    }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-6 md:px-8 pb-8">
                  <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-20 text-center">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-4">
            Still have questions?
          </h3>
          <div className="flex justify-center gap-4">
            <a href="mailto:abie@happyvoyager.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3a3a3a] text-white font-bold hover:bg-[#e3a99c] transition-colors">
              <HelpCircle className="w-5 h-5" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
