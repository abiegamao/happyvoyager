
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <main className="bg-[#f9f5f2] min-h-screen text-[#3a3a3a] font-[family-name:var(--font-body)]">
            <Header />

            <div className="pt-32 pb-20 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#e3a99c]">Privacy Policy</h1>

                    <div className="glass p-8 md:p-12 rounded-3xl space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">1. Introduction</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80">
                                Welcome to Happy Voyager. We respect your privacy and are committed to protecting your personal data.
                                This privacy policy will inform you as to how we look after your personal data when you visit our website
                                and tell you about your privacy rights and how the law protects you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">2. Data We Collect</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80 mb-4">
                                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[#3a3a3a]/80">
                                <li><strong className="text-[#3a3a3a]">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                <li><strong className="text-[#3a3a3a]">Contact Data:</strong> includes email address and telephone numbers.</li>
                                <li><strong className="text-[#3a3a3a]">Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
                                <li><strong className="text-[#3a3a3a]">Usage Data:</strong> includes information about how you use our website and services.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">3. How We Use Your Data</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80 mb-4">
                                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-[#3a3a3a]/80">
                                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                                <li>Where we need to comply with a legal or regulatory obligation.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">4. Data Security</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80">
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">5. Your Legal Rights</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80">
                                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-[#3a3a3a]">6. Contact Us</h2>
                            <p className="leading-relaxed text-[#3a3a3a]/80">
                                If you have any questions about this privacy policy or our privacy practices, please contact us at:
                                <br /><br />
                                <span className="font-semibold">Email:</span> privacy@happyvoyager.com
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
