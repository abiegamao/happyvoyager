"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is a digital nomad visa and who is it for?",
    answer:
      "A digital nomad visa is a special residence permit that allows remote workers, freelancers, and entrepreneurs to legally live and work in a foreign country while working for clients or employers outside that country. It's perfect for anyone with location-independent income who wants to experience life abroad legally.",
  },
  {
    question: "How long does the visa application process typically take?",
    answer:
      "Processing times vary by country, ranging from 2 weeks to 4 months. Portugal's D7 visa typically takes 2-3 months, Spain's digital nomad visa around 20 business days, and Thailand's LTR visa approximately 30 days. We'll provide accurate timelines based on your chosen destination and current processing speeds.",
  },
  {
    question:
      "What are the typical income requirements for digital nomad visas?",
    answer:
      "Income requirements vary significantly by country. Portugal requires approximately €3,040/month, Spain around €2,646/month, while Thailand's LTR visa requires $80,000/year. Some countries also accept proof of savings instead of regular income. We'll help you find destinations that match your financial situation.",
  },
  {
    question: "Can I bring my family on a digital nomad visa?",
    answer:
      "Yes! Most digital nomad visa programs allow you to include dependents such as spouses, partners, and children. Requirements vary by country, and additional income proof may be needed for each family member. Our Voyager and Elite plans include full support for family applications.",
  },
  {
    question: "What happens if my visa application is rejected?",
    answer:
      "While our 98% success rate speaks for itself, if your application is rejected, we'll analyze the reasons, help you address any issues, and guide you through the appeal process at no additional cost. Our Elite plan includes a full money-back guarantee if we can't secure your visa.",
  },
  {
    question: "Do I need to pay taxes in my destination country?",
    answer:
      "Tax obligations vary by country and your specific situation. Some countries like Portugal offer favorable tax regimes for new residents (NHR program), while others like Croatia exempt digital nomad visa holders from local income tax. We include tax advisory in our Voyager and Elite plans to help you stay compliant.",
  },
  {
    question: "How do I maintain my visa status once approved?",
    answer:
      "Requirements vary by visa type but typically include minimum stay requirements, maintaining income levels, and renewing before expiration. Our ongoing support ensures you never miss a deadline, and we handle all renewal paperwork. Elite members get proactive compliance monitoring.",
  },
  {
    question: "Can I work for local clients or start a local business?",
    answer:
      "Most digital nomad visas restrict you to working for foreign clients/employers only. However, some countries offer pathways to business registration and local work permits. Our Business Registration service helps you set up compliant structures if you want to expand locally.",
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
      className="section-padding relative overflow-hidden bg-gradient-to-b from-[#f9f5f2] to-white"
    >
      {/* Background decoration */}
      <div className="absolute top-40 left-20 w-4 h-4 rounded-full bg-[#e3a99c]/40" />
      <div className="absolute top-60 right-32 w-3 h-3 rounded-full bg-[#bbcccd]/50" />
      <div className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full bg-[#f2d6c9]/60" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-[family-name:var(--font-body)] text-sm tracking-[0.2em] text-[#e3a99c] uppercase mb-4">
            FAQ
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[#3a3a3a] mb-6">
            Questions?
            <br />
            <span className="italic text-[#e3a99c]">We Have Answers</span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto">
            Everything you need to know about our visa consulting services and
            the digital nomad lifestyle.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? "bg-white border-[#e3a99c]/30 shadow-lg"
                  : "bg-white/50 border-[#e7ddd3] hover:border-[#e3a99c]/20"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-[family-name:var(--font-heading)] text-lg font-semibold text-[#3a3a3a] pr-8">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? "bg-[#e3a99c] text-white rotate-0"
                      : "bg-[#f9f5f2] text-[#6b6b6b]"
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
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-[#f2d6c9]/30 to-[#e7ddd3]/30 border border-[#e7ddd3]">
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-semibold text-[#3a3a3a] mb-3">
              Still have questions?
            </h3>
            <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our team is
              here to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                <span>Chat With Us</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </a>
              <a
                href="mailto:hello@happyvoyager.com"
                className="font-[family-name:var(--font-body)] text-[#e3a99c] hover:underline"
              >
                hello@happyvoyager.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
