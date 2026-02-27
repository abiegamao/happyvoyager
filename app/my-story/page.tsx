
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Plane } from "lucide-react";
import Link from "next/link";

export default function MyStoryPage() {
    return (
        <main className="min-h-screen bg-[#f9f5f2] font-sans text-[#3a3a3a]">
            <Header />

            {/* Hero / Title Section */}
            <div className="pt-40 pb-12 px-6 lg:px-8 max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/30 border border-[#f2d6c9] mb-8 animate-fade-in">
                    <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                        Origin Story
                    </span>
                </div>
                <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
                    How I Engineered My <br />
                    <span className="text-[#e3a99c] font-script relative inline-block transform -rotate-2 mt-2">
                        Way Into Europe
                    </span>
                </h1>
            </div>

            {/* Content Section */}
            <div className="px-6 lg:px-8 pb-24 max-w-3xl mx-auto">
                <div className="prose prose-lg prose-headings:font-bold prose-headings:text-[#3a3a3a] prose-p:text-[#6b6b6b] prose-p:leading-relaxed prose-strong:text-[#e3a99c]">

                    <p className="lead text-xl md:text-2xl font-medium text-[#3a3a3a]/80 mb-12 border-l-4 border-[#e3a99c] pl-6 italic">
                        &quot;Freedom wasn&apos;t about having a better passport. It was about building a better system.&quot;
                    </p>

                    <h3 className="text-3xl mb-6">The Beginning</h3>
                    <p className="mb-8">
                        It started with a simple frustration. I held a passport that felt more like a cage than a key.
                        Every trip required endless paperwork, embassy visits, and the constant fear of rejection.
                        I watched friends travel freely while I gathered documents just to cross a border.
                        I knew there had to be a better way. This frustration became my fuel.
                    </p>

                    <h3 className="text-3xl mb-6">The Turning Point</h3>
                    <p className="mb-8">
                        I spent years researching immigration laws, visa loopholes, and residency programs.
                        I discovered that the world wasn't closed—it was just gated, and I needed the right keys.
                        I successfully navigated the complexities of obtaining a <strong>Digital Nomad Visa</strong> in Spain,
                        opening the door to the entire Schengen Area and beyond.
                    </p>

                    <div className="my-12 p-8 rounded-3xl bg-white border border-[#e7ddd3] shadow-lg flex flex-col md:flex-row gap-8 items-center cursor-card-hover transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="w-full md:w-1/2 h-64 rounded-2xl overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80"
                                alt="Venice"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <h4 className="text-xl font-bold mb-3">The Current Setup</h4>
                            <p className="text-sm text-[#6b6b6b]">
                                Now I&apos;m based in Spain, with Schengen access across 27 countries.
                                I run my business from my laptop — anywhere with wifi and good coffee.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-3xl mb-6">Why I Help Others</h3>
                    <p className="mb-12">
                        I realized that my struggle wasn't unique. Thousands of talented professionals are held back
                        not by their skills, but by their borders. I founded Happy Voyager to share the playbooks
                        strategy, and support systems I built for myself. My mission is to help you design your own
                        global freedom, skipping the years of trial and error.
                    </p>

                </div>

                {/* CTA Block */}
                <div className="mt-16 pt-12 border-t border-[#e7ddd3] text-center">
                    <h3 className="text-3xl font-bold mb-4">Ready to build your own system?</h3>
                    <p className="text-[#6b6b6b] mb-8 max-w-lg mx-auto">
                        Let&apos;s figure out if Spain&apos;s Digital Nomad Visa — or another route — is the right play for you.
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
