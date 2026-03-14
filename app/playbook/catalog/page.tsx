import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PLAYBOOKS, WAITLIST_PLAYBOOKS, COMING_SOON } from "@/data/playbooks/index";
import { Lock, ArrowLeft } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import WaitlistCardButton from "@/components/playbook/WaitlistCardButton";
import BookCallButton from "@/components/BookCallButton";

export const metadata = {
  title: "Playbook Library ~ Happy Voyager",
  description:
    "Step-by-step systems for every stage of your Spain journey. From your Digital Nomad Visa application to Spanish citizenship.",
};

export default function PlaybookCatalogPage() {
  const totalLessons = [...PLAYBOOKS, ...WAITLIST_PLAYBOOKS].reduce(
    (acc, p) => acc + p.phases.reduce((a, ph) => a + ph.lessons.length, 0),
    0
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f9f5f2] text-[#3a3a3a]">
        <Header darkBg />

        {/* Hero */}
        <div className="bg-[#3a3a3a] text-white pt-28 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-[#e3a99c]/20 text-[#e3a99c] border border-[#e3a99c]/30 px-3 py-1.5 rounded-full mb-6">
              📖 Playbook Library
            </span>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold mb-4 leading-tight">
              The Happy Voyager Playbooks
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Step-by-step systems for every stage of your Spain journey ~ from visa application to EU passport.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { value: "1,420+", label: "Nomads Waiting" },
                { value: `${PLAYBOOKS.length + WAITLIST_PLAYBOOKS.length + COMING_SOON.length}`, label: "Playbooks" },
                { value: `${totalLessons}+`, label: "Lessons" },
                { value: `${PLAYBOOKS.length}`, label: "Available now" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="max-w-5xl mx-auto px-6 py-16">

          {/* Back to portal */}
          <Link
            href="/playbook"
            className="inline-flex items-center gap-1.5 text-[13px] text-[#787774] hover:text-[#3a3a3a] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to portal
          </Link>

          {/* Available */}
          <div className="mb-12">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#8fa38d] mb-6">
              ✓ Available Now
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {PLAYBOOKS.map((playbook) => {
                const lessonCount = playbook.phases.reduce((acc, p) => acc + p.lessons.length, 0);
                const phaseCount = playbook.phases.length;

                return (
                  <Link
                    key={playbook.slug}
                    href={`/playbook/${playbook.slug}`}
                    className="group bg-white border border-[#e7ddd3] rounded-3xl overflow-hidden hover:border-[#e3a99c] hover:shadow-lg transition-all duration-300"
                  >
                    {/* Card header — cover image or colored bg */}
                    {playbook.catalog.coverImage ? (
                      <div className="relative">
                        <img
                          src={playbook.catalog.coverImage}
                          alt={playbook.heroTitle}
                          className="w-full h-44 object-cover"
                        />
                        <div className="absolute top-3 right-3 flex gap-1.5">
                          {playbook.catalog.hasAiGuide && (
                            <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#3a3a3a]/80 text-white backdrop-blur-sm">
                              ✦ AI Guide
                            </span>
                          )}
                          <span
                            className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white"
                            style={{ backgroundColor: playbook.catalog.accent }}
                          >
                            Available
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="px-6 pt-6 pb-4" style={{ backgroundColor: playbook.catalog.bg }}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className="text-4xl">{playbook.catalog.emoji}</span>
                          <div className="flex gap-1.5">
                            {playbook.catalog.hasAiGuide && (
                              <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#3a3a3a] text-white">
                                ✦ AI Guide
                              </span>
                            )}
                            <span
                              className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white"
                              style={{ backgroundColor: playbook.catalog.accent }}
                            >
                              Available
                            </span>
                          </div>
                        </div>
                        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-1">
                          {playbook.heroTitle}
                        </h2>
                        <p className="text-sm text-[#6b6b6b]">{playbook.catalog.tagline}</p>
                      </div>
                    )}

                    <div className="px-6 py-5">
                      {/* Title + tagline shown below image (only when coverImage is set) */}
                      {playbook.catalog.coverImage && (
                        <div className="mb-3">
                          <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-0.5">
                            {playbook.heroTitle}
                          </h2>
                          <p className="text-sm text-[#6b6b6b]">{playbook.catalog.tagline}</p>
                        </div>
                      )}
                      <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">
                        {playbook.catalog.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <div>
                            <p className="text-lg font-bold text-[#3a3a3a]">{lessonCount}</p>
                            <p className="text-[10px] text-[#aaaaaa] uppercase tracking-widest">Lessons</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-[#3a3a3a]">{phaseCount}</p>
                            <p className="text-[10px] text-[#aaaaaa] uppercase tracking-widest">Phases</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-[#3a3a3a]">{playbook.totalTime}</p>
                            <p className="text-[10px] text-[#aaaaaa] uppercase tracking-widest">Read time</p>
                          </div>
                        </div>
                        <span
                          className="text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                          style={{ color: playbook.catalog.accent }}
                        >
                          Open →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Early Access (Waitlist) */}
          {WAITLIST_PLAYBOOKS.length > 0 && (
            <div className="mb-12">
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#6b8cba] mb-6">
                🚀 Early Access
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {WAITLIST_PLAYBOOKS.map((playbook) => {
                  const lessonCount = playbook.phases.reduce((acc, p) => acc + p.lessons.length, 0);
                  const phaseCount = playbook.phases.length;

                  return (
                    <div
                      key={playbook.slug}
                      className="bg-white border border-[#e7ddd3] rounded-3xl overflow-hidden"
                    >
                      <div className="px-6 pt-6 pb-4 relative" style={{ backgroundColor: playbook.catalog.bg }}>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className="text-4xl">{playbook.catalog.emoji}</span>
                          <span
                            className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border"
                            style={{ color: playbook.catalog.accent, borderColor: `${playbook.catalog.accent}50`, backgroundColor: `${playbook.catalog.accent}15` }}
                          >
                            Early Access
                          </span>
                        </div>
                        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#3a3a3a] mb-1">
                          {playbook.heroTitle}
                        </h2>
                        <p className="text-sm text-[#6b6b6b]">{playbook.catalog.tagline}</p>
                      </div>
                      <div className="px-6 py-5">
                        <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">
                          {playbook.catalog.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <div>
                              <p className="text-lg font-bold text-[#3a3a3a]">{lessonCount}</p>
                              <p className="text-[10px] text-[#aaaaaa] uppercase tracking-widest">Lessons</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-[#3a3a3a]">{phaseCount}</p>
                              <p className="text-[10px] text-[#aaaaaa] uppercase tracking-widest">Phases</p>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-[#3a3a3a]">{playbook.totalTime}</p>
                              <p className="text-[10px] text-[#aaaaaa] uppercase tracking-widest">Read time</p>
                            </div>
                          </div>
                          <WaitlistCardButton playbook={playbook} />
                        </div>
                        <Link
                          href={`/playbook/${playbook.slug}`}
                          className="mt-3 flex items-center gap-1.5 text-[11px] text-[#aaaaaa] hover:text-[#6b6b6b] transition-colors"
                        >
                          Preview what&apos;s inside →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Coming soon */}
          <div className="mt-4">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#aaaaaa] mb-6">
              🔒 Coming Soon
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {COMING_SOON.map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-[#e7ddd3] rounded-3xl overflow-hidden opacity-70"
                >
                  <div className="px-5 pt-5 pb-3" style={{ backgroundColor: item.bg }}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#3a3a3a]/10 text-[#6b6b6b]">
                        Soon
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-heading)] text-base font-bold text-[#3a3a3a] mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6b6b6b]">{item.tagline}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs text-[#aaaaaa] leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#aaaaaa]">
                      <Lock className="w-3 h-3" />
                      In development
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-[#3a3a3a] rounded-3xl p-8 text-center">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#e3a99c] mb-3">
              Not sure where to start?
            </p>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white mb-3">
              Book a Strategy Call
            </h3>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              Abie will help you find the right visa path, understand your timeline, and put together a plan tailored to your situation.
            </p>
            <BookCallButton className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#e3a99c] text-white font-bold hover:bg-[#d38b7b] transition-colors">
              Book a Call →
            </BookCallButton>
          </div>
        </div>

        <Footer />
      </div>
    </PageTransition>
  );
}
