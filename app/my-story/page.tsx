"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function MyStoryPage() {
    return (
        <main className="min-h-screen bg-[#f9f5f2] font-sans">
            <Header />
            <div className="pt-32 pb-20 px-6 lg:px-8 max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold text-[#3a3a3a] mb-8">My Story</h1>
                <div className="prose prose-lg text-[#6b6b6b]">
                    <p>
                        This is the full story page. Content to be added.
                    </p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
