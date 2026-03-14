"use client";

import { Check, Star, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "The Playbook Pro",
    description:
      "The complete self-guided blueprint for independent applicants",
    price: "79",
    originalPrice: "149",
    currency: "€",
    period: "one-time",
    slug: "spain-dnv",
    features: [
      "Complete step-by-step system",
      "Document templates",
      "Working UGE links & screenshots",
      "Apostille & translation guide",
      "Self-paced, instant access",
      "1 yr Playbook Pro Library Subscription",
    ],
    cta: "Get the Playbook Pro",
    popular: false,
    color: "#bbcccd",
    playbookAccess: true,
  },
  {
    name: "The Guided Navigator",
    description:
      "Expert strategy and review to ensure your application is bulletproof",
    price: "199",
    originalPrice: "350",
    currency: "€",
    period: "one-time",
    slug: "guided-navigator",
    features: [
      "Everything in The Playbook Pro",
      "1-hour video consultation",
      "Review your files before submission",
      "Priority email support",
    ],
    cta: "Get the Guided Navigator",
    popular: true,
    color: "#e3a99c",
  },
  {
    name: "The VIP Concierge",
    description:
      "Full done-for-you service from start to finish. Lawyers charge €2,000–€3,500 for this.",
    price: "599",
    originalPrice: "900",
    currency: "€",
    period: "one-time",
    slug: "vip-concierge",
    features: [
      "Everything in The Guided Navigator",
      "1on1 Strategy Calls & Chat Support",
      "Appointments Booked (NIE, DigiCert, TIE)",
      "Apostille & Translation Coordination",
      "Submission to UGE & Appeals",
      "Post-Approval Guide and Settling in Spain Survival Kit",
      "Bonus: Lifetime access to The Playbook Pro Library",
      "+ €149 / additional dependent",
    ],
    cta: "Apply for VIP Service",
    roiNote: "Most applicants spend 40–60 hrs figuring this out alone.",
    foundingNote: "Founding client spots available",
    popular: false,
    color: "#8fa38d",
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden bg-[#f9f5f2]">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f2d6c9]/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#bbcccd]/20 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#e7ddd3] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
              🇪🇸 Spain DNV Packages
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            Pick how you want{" "}<br />
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl relative inline-block transform -rotate-2 mt-2">
              to get to Spain
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
            DIY with the right system, get expert guidance, or have us handle everything.
            All paths lead to the same result ~ a life in Spain.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e3a99c]/10 border border-[#e3a99c]/30">
            <span className="w-2 h-2 rounded-full bg-[#e3a99c] animate-pulse" />
            <span className="font-[family-name:var(--font-body)] text-sm text-[#e3a99c] font-semibold">
              Launch pricing ~ limited time offer
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 items-start max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-[2.5rem] p-8 lg:p-10 transition-all duration-500 ${plan.popular
                ? "bg-white shadow-2xl scale-105 border border-[#e3a99c] z-10"
                : "bg-white/60 backdrop-blur-sm border border-[#e7ddd3] hover:shadow-xl hover:-translate-y-2 hover:bg-white"
                }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#3a3a3a] text-white text-sm font-bold shadow-lg">
                    <Star className="w-4 h-4 fill-[#e3a99c] text-[#e3a99c]" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-sm bg-[#f9f5f2]"
                >
                  <Zap className="w-8 h-8" style={{ color: plan.color }} />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#3a3a3a] mb-2">
                  {plan.name}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-8 pb-8 border-b border-[#e7ddd3]">
                {/* Original price + discount badge */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="font-[family-name:var(--font-body)] text-base text-[#aaaaaa] line-through">
                    {plan.currency}{plan.originalPrice}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#e3a99c]/15 text-[#e3a99c]">
                    SAVE {plan.currency}{Number(plan.originalPrice) - Number(plan.price)}
                  </span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-[family-name:var(--font-body)] text-2xl text-[#6b6b6b] font-medium">
                    {plan.currency}
                  </span>
                  <span className="font-[family-name:var(--font-heading)] text-6xl font-bold text-[#3a3a3a]">
                    {plan.price}
                  </span>
                </div>
                <span className="font-[family-name:var(--font-body)] text-sm text-[#e3a99c] font-medium uppercase tracking-wider">
                  {plan.period}
                </span>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-10">
                {plan.features.map((feature, i) => {
                  const isAddon = feature.startsWith("+ €");
                  return isAddon ? (
                    <div key={i} className="mt-2 pt-3 border-t border-dashed border-[#e7ddd3]">
                      <span className="font-[family-name:var(--font-body)] text-xs text-[#aaaaaa] italic">
                        {feature}
                      </span>
                    </div>
                  ) : (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f9f5f2] flex items-center justify-center mt-0.5">
                        <Check className="w-3.5 h-3.5" style={{ color: plan.color }} />
                      </div>
                      <span className="font-[family-name:var(--font-body)] text-sm text-[#6b6b6b] leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ROI note for VIP */}
              {"roiNote" in plan && (
                <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b] text-center italic mb-4 px-2">
                  {(plan as typeof plan & { roiNote: string }).roiNote}
                </p>
              )}

              {/* Founding client note */}
              {"foundingNote" in plan && (
                <div className="flex items-center justify-center gap-2 mb-4 px-3 py-2 rounded-xl bg-[#8fa38d]/10 border border-[#8fa38d]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8fa38d] animate-pulse flex-shrink-0" />
                  <span className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b]">
                    {(plan as typeof plan & { foundingNote: string }).foundingNote}
                  </span>
                </div>
              )}

              {/* CTA Button */}
              <Link
                href={`/playbook?intent=purchase&slug=${plan.slug}`}
                className={`block w-full py-4 rounded-xl text-center font-[family-name:var(--font-body)] font-bold transition-all duration-300 ${plan.popular
                  ? "bg-[#3a3a3a] text-white hover:bg-[#e3a99c] shadow-lg hover:shadow-[#e3a99c]/30"
                  : "bg-white border-2 border-[#e7ddd3] text-[#3a3a3a] hover:border-[#3a3a3a] hover:bg-[#3a3a3a] hover:text-white"
                  }`}
              >
                {plan.cta}
              </Link>

              {/* Already purchased link — Playbook Pro only */}
              {"playbookAccess" in plan && (
                <div className="mt-3 text-center">
                  <a
                    href="/playbook"
                    className="font-[family-name:var(--font-body)] text-xs text-[#aaaaaa] hover:text-[#e3a99c] transition-colors"
                  >
                    Already purchased? Access your Playbook →
                  </a>
                </div>
              )}


            </div>
          ))}
        </div>

        {/* Enterprise note
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-[#6b6b6b]">
            <span>Need a custom solution?</span>
            <a href="#contact" className="text-[#3a3a3a] font-bold border-b border-[#3a3a3a] hover:text-[#e3a99c] hover:border-[#e3a99c] transition-colors">
              Contact for enterprise pricing
            </a>
          </div>
        </div> */}
      </div>
    </section>
  );
}
