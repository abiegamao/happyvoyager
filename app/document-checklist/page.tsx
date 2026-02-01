"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, FileText, Info, Stamp, Languages, Circle, Plane } from "lucide-react";

interface DocumentItem {
    id: string;
    title: string;
    subtitle: string;
    needsApostille: boolean;
    needsTranslate: boolean;
}

const documents: DocumentItem[] = [
    {
        id: "passport",
        title: "Valid Passport",
        subtitle: "Must be valid for at least 1 year from application date",
        needsApostille: false,
        needsTranslate: false,
    },
    {
        id: "photo",
        title: "Passport-size Photo",
        subtitle: "Recent photo meeting biometric requirements",
        needsApostille: false,
        needsTranslate: false,
    },
    {
        id: "background_check",
        title: "Criminal Background Check",
        subtitle: "From your country of residence for the past 5 years",
        needsApostille: true,
        needsTranslate: true,
    },
    {
        id: "insurance",
        title: "Health Insurance",
        subtitle: "Full coverage valid in Spain, no co-pays or deductibles",
        needsApostille: false,
        needsTranslate: false,
    },
    {
        id: "income",
        title: "Proof of Income",
        subtitle: "Bank statements, contracts, or tax returns showing €2,520+/month",
        needsApostille: false,
        needsTranslate: true,
    },
    {
        id: "remote_work",
        title: "Remote Work Proof",
        subtitle: "Contract or letter from employer/clients outside Spain",
        needsApostille: false,
        needsTranslate: true,
    },
    {
        id: "degree",
        title: "University Degree or 3+ Years Experience",
        subtitle: "Educational certificate or work experience proof",
        needsApostille: true,
        needsTranslate: true,
    },
    {
        id: "payment",
        title: "Application Fee Payment",
        subtitle: "Modelo 790 payment receipt",
        needsApostille: false,
        needsTranslate: false,
    },
];

export default function DocumentChecklistPage() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleItem = (id: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const progress = Math.round((checkedCount / documents.length) * 100);

    return (
        <main className="min-h-screen bg-[#f9f5f2] font-sans text-[#3a3a3a]">
            <Header />

            <div className="pt-32 pb-20 px-6 lg:px-8 max-w-3xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <span className="inline-block px-3 py-1 bg-[#e3a99c]/10 text-[#e3a99c] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        Free Tool
                    </span>
                    <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-[#3a3a3a] mb-4">
                        Document Preparation <br /> Checklist
                    </h1>
                    <p className="text-[#6b6b6b] text-lg">
                        Track your visa preparation progress. Check off documents as you gather them.
                    </p>
                </div>

                {/* Progress Bar Card */}
                <div className="bg-gradient-to-br from-[#e3a99c] to-[#d69586] rounded-2xl p-6 md:p-8 mb-8 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-6 h-6" />
                            <h3 className="font-bold text-lg">Your Progress</h3>
                        </div>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-white/80 text-sm">{checkedCount} of {documents.length} documents ready</span>
                            <span className="text-3xl font-bold">{progress}%</span>
                        </div>

                        {/* Progress Track */}
                        <div className="h-3 bg-black/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-500 ease-out rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center gap-6 mb-8 text-xs font-medium text-[#6b6b6b]">
                    <div className="flex items-center gap-1.5">
                        <Stamp className="w-3.5 h-3.5 text-[#e3a99c]" />
                        <span>Needs Apostille</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Languages className="w-3.5 h-3.5 text-[#7c7c7c]" />
                        <span>Needs Sworn Translation</span>
                    </div>
                </div>

                {/* Checklist */}
                <div className="space-y-4 mb-16 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            onClick={() => toggleItem(doc.id)}
                            className={`
                                group flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-200
                                ${checkedItems[doc.id]
                                    ? 'bg-[#e3a99c]/5 border-[#e3a99c] opacity-70'
                                    : 'bg-white border-[#e7ddd3] hover:border-[#e3a99c]/50 hover:shadow-sm'
                                }
                            `}
                        >
                            <div className={`
                                mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                                ${checkedItems[doc.id]
                                    ? 'bg-[#e3a99c] border-[#e3a99c] text-white'
                                    : 'border-[#e7ddd3] group-hover:border-[#e3a99c]'
                                }
                            `}>
                                {checkedItems[doc.id] && <CheckCircle2 className="w-4 h-4" />}
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h4 className={`font-bold ${checkedItems[doc.id] ? 'text-[#3a3a3a]/70 line-through decoration-[#e3a99c]' : 'text-[#3a3a3a]'}`}>
                                        {doc.title}
                                    </h4>

                                    <div className="flex gap-2">
                                        {doc.needsApostille && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#e3a99c]/10 text-[#e3a99c] border border-[#e3a99c]/20">
                                                <Stamp className="w-3 h-3" /> Apostille
                                            </span>
                                        )}
                                        {doc.needsTranslate && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#7c7c7c]/10 text-[#7c7c7c] border border-[#7c7c7c]/20">
                                                <Languages className="w-3 h-3" /> Translate
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-sm text-[#6b6b6b]">{doc.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Block */}
                <div className="mt-16 pt-12 border-t border-[#e7ddd3] text-center">
                    <h3 className="text-3xl font-bold mb-4">Ready to write your own story?</h3>
                    <p className="text-[#6b6b6b] mb-8 max-w-lg mx-auto">
                        Let's discuss how we can get you the visa that changes everything.
                    </p>

                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#3a3a3a] text-white font-bold text-lg hover:bg-[#e3a99c] hover:shadow-xl hover:shadow-[#e3a99c]/30 transition-all duration-300 group"
                    >
                        <span>Book a Consultation</span>
                        <Plane className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
                    </Link>
                </div>

            </div>

            <Footer />
        </main>
    );
}
