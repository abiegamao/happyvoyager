"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
    return (
        <main className="bg-[#f9f5f2] min-h-screen text-[#3a3a3a] font-[family-name:var(--font-body)]">
            <Header />

            <div className="pt-32 pb-20 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#e3a99c]">Terms of Service</h1>

                    <div className="glass p-8 md:p-12 rounded-3xl space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">1. Agreement to Terms</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80">
                                By accessing or using our website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">2. Use License</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80 mb-4">
                                Permission is granted to temporarily download one copy of the materials (information or software) on Happy Voyager's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[#3a3a3a]/80">
                                <li>Modify or copy the materials;</li>
                                <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                                <li>Attempt to decompile or reverse engineer any software contained on Happy Voyager's website;</li>
                                <li>Remove any copyright or other proprietary notations from the materials; or</li>
                                <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">3. Disclaimer</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80">
                                The materials on Happy Voyager's website are provided on an 'as is' basis. Happy Voyager makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">4. Limitations</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80">
                                In no event shall Happy Voyager or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Happy Voyager's website, even if Happy Voyager or a Happy Voyager authorized representative has been notified orally or in writing of the possibility of such damage.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">5. Revisions and Errata</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80">
                                The materials appearing on Happy Voyager's website could include technical, typographical, or photographic errors. Happy Voyager does not warrant that any of the materials on its website are accurate, complete, or current. Happy Voyager may make changes to the materials contained on its website at any time without notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">6. Governing Law</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80">
                                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Happy Voyager operates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                            </p>
                        </section>

                        <div className="pt-6 border-t border-[#e7ddd3]">
                            <p className="text-sm text-[#3a3a3a]/60">Last Updated: February 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
