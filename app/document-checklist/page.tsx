"use client";

import Link from "next/link";
import BookCallButton from "@/components/BookCallButton";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, FileText, Stamp, Languages, Plane, ArrowRight, Download, X, Mail } from "lucide-react";

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
        subtitle: "Bank statements, contracts, or tax returns showing €2,849+/month",
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
        id: "self_employment",
        title: "Self Employment Proof",
        subtitle: "Business registration, tax filings, or freelance contracts showing active self-employed status",
        needsApostille: true,
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
    const [showEmailGate, setShowEmailGate] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const toggleItem = (id: string) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const progress = Math.round((checkedCount / documents.length) * 100);

    const handleExportClick = () => {
        setEmailError("");
        setShowEmailGate(true);
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        setShowEmailGate(false);
        setTimeout(() => window.print(), 300);
    };

    return (
        <>
            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .checklist-card { break-inside: avoid; }
                }
            `}</style>

            <main className="min-h-screen bg-[#f9f5f2] font-sans text-[#3a3a3a]">
                <div className="no-print"><Header /></div>

                {/* Email Gate Modal */}
                {showEmailGate && (
                    <div className="no-print fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#e7ddd3] relative">
                            <button
                                onClick={() => setShowEmailGate(false)}
                                className="absolute top-4 right-4 text-[#aaaaaa] hover:text-[#3a3a3a] transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-12 h-12 rounded-2xl bg-[#f2d6c9] flex items-center justify-center mb-4">
                                <Download className="w-6 h-6 text-[#e3a99c]" />
                            </div>

                            <h3 className="text-xl font-bold text-[#3a3a3a] mb-1">Get your PDF checklist</h3>
                            <p className="text-sm text-[#6b6b6b] mb-6">
                                Drop your email below ~ we'll also send you helpful DNV updates.
                            </p>

                            <form onSubmit={handleEmailSubmit} className="space-y-3">
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaaaaa]" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                                        placeholder="your@email.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e7ddd3] bg-[#f9f5f2] text-sm text-[#3a3a3a] focus:outline-none focus:border-[#e3a99c] transition-colors"
                                    />
                                </div>
                                {emailError && (
                                    <p className="text-xs text-red-500">{emailError}</p>
                                )}
                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-xl bg-[#3a3a3a] text-white font-semibold text-sm hover:bg-[#e3a99c] transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </button>
                            </form>
                            <p className="text-[10px] text-[#aaaaaa] text-center mt-3">No spam. Unsubscribe anytime.</p>
                        </div>
                    </div>
                )}

                <div className="pt-32 pb-20 px-6 lg:px-8 max-w-3xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-12">
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
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-6 h-6" />
                                    <h3 className="font-bold text-lg">Your Progress</h3>
                                </div>
                                <button
                                    onClick={handleExportClick}
                                    className="no-print flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors border border-white/30"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    Export PDF
                                </button>
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
                    <div className="space-y-4 mb-16">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                onClick={() => toggleItem(doc.id)}
                                className={`checklist-card group flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-200 ${checkedItems[doc.id]
                                    ? 'bg-[#e3a99c]/5 border-[#e3a99c] opacity-70'
                                    : 'bg-white border-[#e7ddd3] hover:border-[#e3a99c]/50 hover:shadow-sm'
                                    }`}
                            >
                                <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checkedItems[doc.id]
                                    ? 'bg-[#e3a99c] border-[#e3a99c] text-white'
                                    : 'border-[#e7ddd3] group-hover:border-[#e3a99c]'
                                    }`}>
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
                    <div className="no-print mt-16 pt-12 border-t border-[#e7ddd3] text-center">
                        <h3 className="text-3xl font-bold mb-4">Want the complete guide?</h3>
                        <p className="text-[#6b6b6b] mb-8 max-w-lg mx-auto">
                            You can get our Playbook Pro or avail our guided services.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/#pricing"
                                className="btn-primary inline-flex items-center justify-center gap-2 group px-8 py-4 text-lg w-full sm:w-auto"
                            >
                                <span>Avail our Services</span>
                                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <BookCallButton
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#3a3a3a] text-white font-bold text-lg hover:bg-[#e3a99c] hover:shadow-xl hover:shadow-[#e3a99c]/30 transition-all duration-300 group w-full sm:w-auto justify-center"
                                url="https://calendly.com/abie-gamao/spain-dnv"
                                title="Book a Strategy Call"
                            >
                                <span>Book a call</span>
                                <Plane className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
                            </BookCallButton>
                        </div>
                    </div>

                </div>

                <div className="no-print"><Footer /></div>
            </main>
        </>
    );
}
