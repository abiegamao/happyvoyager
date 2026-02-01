"use client";

import { HelpCircle, FileText, Globe, Search, ShieldAlert, File, Sparkles, Link as LinkIcon } from "lucide-react";

const mainFeatures = [
    {
        icon: HelpCircle,
        title: "What's this visa about & do I qualify?",
        description: "Understand eligibility requirements, income thresholds, and who this visa is perfect for.",
    },
    {
        icon: FileText,
        title: "What documents to submit?",
        description: "Complete list of required documents with exactly what to include in each one.",
    },
    {
        icon: Globe,
        title: "Where and how to apply via UGE?",
        description: "Step-by-step walkthrough of the UGE portal, with screenshots and tips.",
    },
    {
        icon: Search,
        title: "How to track your application?",
        description: "Monitor your visa status and know exactly what to expect at each stage.",
    },
];

const bonuses = [
    {
        icon: ShieldAlert,
        text: "Avoid common rejection mistakes",
    },
    {
        icon: File,
        text: "FREE templates included",
    },
    {
        icon: Sparkles,
        text: "Which documents to apostille/translate",
    },
    {
        icon: LinkIcon,
        text: "Working UGE links (Spain is notorious for broken links!)",
    },
];

export default function PlaybookPreviewSection() {
    return (
        <section className="section-padding bg-[#f9f5f2] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-8">
                        <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                            What You'll Learn
                        </span>
                    </div>

                    <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
                        Everything You Need to Get <br />
                        Your Visa Approved
                    </h2>

                    <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] leading-relaxed">
                        The playbook covers the entire process from eligibility to approval, no guesswork, no expensive lawyers.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {mainFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#e7ddd3]/50 flex gap-6 items-start"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#f2d6c9]/30 flex items-center justify-center text-[#e3a99c]">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#3a3a3a] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="font-[family-name:var(--font-body)] text-[#6b6b6b] text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bonuses Section */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#e7ddd3]/50 text-center">
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#3a3a3a] mb-12">
                        Plus These Exclusive Bonuses
                    </h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bonuses.map((bonus, index) => (
                            <div key={index} className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#e3a99c]/20 flex items-center justify-center text-[#e3a99c]">
                                    <bonus.icon className="w-6 h-6" />
                                </div>
                                <p className="font-[family-name:var(--font-body)] text-sm font-medium text-[#3a3a3a] max-w-[200px]">
                                    {bonus.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
