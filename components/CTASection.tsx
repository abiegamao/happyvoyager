"use client";

import { Plane, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CTASection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "duplicate") {
          setSubmitStatus({
            type: "error",
            message: data.message,
          });
        } else {
          setSubmitStatus({
            type: "error",
            message: "Something went wrong. Please try again.",
          });
        }
      } else {
        setSubmitStatus({
          type: "success",
          message: "Thank you! We'll be in touch soon.",
        });
        setFormData({ firstName: "", lastName: "", email: "", company: "" });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to submit. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden bg-[#3a3a3a]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#e3a99c]/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#bbcccd]/20 rounded-full blur-[80px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* TEXT SIDE */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8">
              <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                Start Your Journey
              </span>
            </div>

            <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Ready to Embrace <br />
              <span className="font-script text-[#f2d6c9] text-6xl md:text-7xl lg:text-8xl relative inline-block transform -rotate-2 mt-4 opacity-90">
                Location Freedom?
              </span>
            </h2>

            <p className="font-[family-name:var(--font-body)] text-xl text-white/60 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Take the first step towards your digital nomad lifestyle. Book a
              free 30-minute consultation and let's map out your future.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-4">
                {["SC", "JM", "YT", "MW"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-[#3a3a3a] flex items-center justify-center text-white text-xs font-bold shadow-lg"
                    style={{ background: i % 2 === 0 ? "#e3a99c" : "#bbcccd" }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">500+ Nomads</p>
                <p className="text-white/40 text-sm">Joined this month</p>
              </div>
            </div>
          </div>

          {/* FORM SIDE */}
          <div className="relative">
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/40 text-sm font-bold uppercase tracking-wider mb-2 ml-4">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-[#e3a99c] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/40 text-sm font-bold uppercase tracking-wider mb-2 ml-4">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-[#e3a99c] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/40 text-sm font-bold uppercase tracking-wider mb-2 ml-4">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="hello@example.com"
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-[#e3a99c] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-sm font-bold uppercase tracking-wider mb-2 ml-4">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company (optional)"
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:bg-white/10 focus:border-[#e3a99c] transition-all"
                  />
                </div>

                {submitStatus.type && (
                  <div
                    className={`px-6 py-4 rounded-2xl text-center font-medium ${
                      submitStatus.type === "success"
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-2xl bg-[#e3a99c] text-[#3a3a3a] font-bold text-lg shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <Plane className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>

              <p className="text-center text-white/30 text-xs mt-6">
                Message will be sent to{" "}
                <span className="text-white/60">hello@abiemaxey.com</span>
              </p>
            </div>

            {/* Floating element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#bbcccd] rounded-full flex items-center justify-center shadow-lg">
              <Mail className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
