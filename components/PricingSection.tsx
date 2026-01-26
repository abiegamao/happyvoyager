"use client";

import { Check, Star, Zap } from "lucide-react";

const pricingPlans = [
  {
    name: "Explorer",
    description:
      "Perfect for first-time nomads with straightforward visa needs",
    price: "499",
    currency: "$",
    period: "one-time",
    features: [
      "Single destination consultation",
      "Document checklist & review",
      "Application submission guidance",
      "Email support",
      "Basic compliance guide",
    ],
    cta: "Get Started",
    popular: false,
    color: "#bbcccd",
  },
  {
    name: "Voyager",
    description: "Our most popular plan for serious digital nomads",
    price: "999",
    currency: "$",
    period: "one-time",
    features: [
      "Multi-destination strategy",
      "Complete document preparation",
      "Full application management",
      "Embassy liaison services",
      "Priority email & chat support",
      "Tax planning consultation",
      "Arrival support package",
      "Extension/renewal guidance",
    ],
    cta: "Choose Voyager",
    popular: true,
    color: "#e3a99c",
  },
  {
    name: "Nomad Elite",
    description: "Premium service for complex situations & families",
    price: "1,999",
    currency: "$",
    period: "one-time",
    features: [
      "Everything in Voyager, plus:",
      "Family/dependent visas",
      "Business setup assistance",
      "Dedicated case manager",
      "24/7 WhatsApp support",
      "Full tax optimization",
      "Local banking setup",
      "Annual visa management",
      "VIP embassy appointments",
    ],
    cta: "Go Elite",
    popular: false,
    color: "#f2d6c9",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#f2d6c9]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-64 h-64 bg-[#bbcccd]/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-[family-name:var(--font-body)] text-sm tracking-[0.2em] text-[#e3a99c] uppercase mb-4">
            Pricing Plans
          </span>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-semibold text-[#3a3a3a] mb-6">
            Transparent Pricing,
            <br />
            <span className="italic text-[#e3a99c]">Exceptional Value</span>
          </h2>
          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto">
            No hidden fees. Choose the plan that fits your nomad journey. All
            plans include our satisfaction guarantee.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-500 ${
                plan.popular
                  ? "bg-white shadow-2xl scale-105 border-2 border-[#e3a99c]"
                  : "bg-white border border-[#e7ddd3] hover:shadow-xl hover:-translate-y-2"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-1 rounded-full bg-gradient-to-r from-[#e3a99c] to-[#f2d6c9] text-white text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                  style={{ backgroundColor: `${plan.color}20` }}
                >
                  <Zap className="w-7 h-7" style={{ color: plan.color }} />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-[#3a3a3a] mb-2">
                  {plan.name}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-[family-name:var(--font-body)] text-2xl text-[#6b6b6b]">
                    {plan.currency}
                  </span>
                  <span className="font-[family-name:var(--font-heading)] text-5xl font-bold text-[#3a3a3a]">
                    {plan.price}
                  </span>
                </div>
                <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{ backgroundColor: `${plan.color}20` }}
                    >
                      <Check
                        className="w-3 h-3"
                        style={{ color: plan.color }}
                      />
                    </div>
                    <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className={`block w-full py-4 rounded-full text-center font-[family-name:var(--font-body)] font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-[#e3a99c] to-[#d69586] text-white hover:shadow-lg hover:-translate-y-0.5"
                    : "border-2 border-[#e7ddd3] text-[#3a3a3a] hover:bg-[#f9f5f2]"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[#f9f5f2] border border-[#e7ddd3]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#e3a99c]/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#e3a99c]" />
              </div>
              <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                100% Money-back guarantee
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-[#e7ddd3]" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#bbcccd]/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#bbcccd]" />
              </div>
              <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                Pay in 3 installments
              </span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-[#e7ddd3]" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#f2d6c9]/30 flex items-center justify-center">
                <Check className="w-4 h-4 text-[#e3a99c]" />
              </div>
              <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
                Free consultation included
              </span>
            </div>
          </div>
        </div>

        {/* Enterprise note */}
        <div className="mt-12 text-center">
          <p className="font-[family-name:var(--font-body)] text-[#6b6b6b]">
            Need a custom solution for your company or team?{" "}
            <a
              href="#contact"
              className="text-[#e3a99c] hover:underline font-medium"
            >
              Contact us for enterprise pricing
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
