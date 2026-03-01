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
    question: "How long does the process take?",
    answer:
      "The online application through the UGE (Unidad de Grandes Empresas) portal typically takes 20-45 business days for a decision. However, you should factor in time for gathering documents, getting apostilles and translations, which can add 2-4 weeks. The entire process from start to approval usually takes 2-3 months.",
  },
  {
    question: "What are the income requirements?",
    answer:
      "You need to prove a minimum monthly income of approximately €2,849 (200% of Spain's minimum wage). This can come from employment, freelance work, or business ownership. The key requirement is that your income must come from clients or employers outside of Spain. You'll need to show consistent income over several months.",
  },
  {
    question: "Can I bring my family?",
    answer:
      "Yes! Spain allows you to include family members in your application or they can apply for family reunification after you receive your visa. This includes your spouse/partner and dependent children. Each family member will need their own set of documents, and income requirements increase slightly for each additional person.",
  },
  {
    question: "Do I need to speak Spanish?",
    answer:
      "No, there's no Spanish language requirement for the Digital Nomad Visa. However, knowing basic Spanish will significantly improve your daily life in Spain and can help with bureaucratic processes. The online application and most official communications are available in Spanish, but you can use a sworn translator for documents.",
  },
  {
    question: "Do I need a lawyer to apply?",
    answer:
      "No! That's exactly why I created this playbook. While lawyers can be helpful, they're not required. The process is straightforward if you have clear guidance. Many people (myself included) successfully apply without legal assistance. The playbook provides everything you need to navigate the process confidently.",
  },
  {
    question: "How long does it take to get my visa?",
    answer:
      "The online application through the UGE (Unidad de Grandes Empresas) portal typically takes 20-45 business days for a decision. However, you should factor in time for gathering documents, getting apostilles and translations, which can add 2-4 weeks. The entire process from start to approval usually takes 2-3 months.",
  },
  {
    question: "Do I need to pay local taxes?",
    answer:
      "Yes, you will be subject to Spanish taxes. However, Spain offers a special tax regime for digital nomads called the Beckham Law (Régimen Especial para Trabajadores Desplazados). Under this regime, you can opt to pay a flat tax rate of 24% on your Spanish-sourced income for the first 6 years, instead of the progressive rates which can go up to 47%. Your foreign-sourced income is generally exempt. It's important to note that this is a simplified explanation, and you should consult with a tax advisor for personalized guidance.",
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
            Everything you need to know about the Spain Digital Nomad Visa process.
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
