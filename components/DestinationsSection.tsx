"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Globe2
} from "lucide-react";

const destinations = [
  {
    country: "Spain",
    city: "Spain",
    image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80",
    description: "Experience the vibrant culture and mediterranean lifestyle. Home to one of the most popular Digital Nomad Visas in Europe.",
    highlights: ["Nomad Visa Available", "Schengen Access", "Tax Benefits"],
    flag: "🇪🇸",
  },
  {
    country: "Croatia",
    city: "Croatia",
    image: "https://images.unsplash.com/photo-1575540291670-8d3b26f7d327?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Stunning coastlines and historic cities. Croatia offers a specific temporary residence permit for digital nomads.",
    highlights: ["Nomad Permit", "English Widely Spoken", "Affordable Living"],
    flag: "🇭🇷",
  },
  {
    country: "The Balkans",
    city: "Serbia, Albania, Bosnia",
    image: "https://images.unsplash.com/photo-1502824420498-012d4c4f0c42?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Discover the hidden gems of Europe. Rich history, diverse cultures, and welcoming communities awaits in the Balkans.",
    highlights: ["Visa-Free Options", "Low Cost of Living", "Emerging Hubs"],
    flag: "🌍",
  },
];

const consultations = [
  { name: "United States", icon: "🇺🇸", type: "Visa Consulting" },
  { name: "Canada", icon: "🇨🇦", type: "Visa Consulting" },
  { name: "Schengen Area", icon: "🇪🇺", type: "Visa Consulting" },
];

export default function DestinationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + destinations.length) % destinations.length,
    );
  };

  return (
    <section
      id="destinations"
      className="section-padding relative overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2d6c9]/20 border border-[#f2d6c9] mb-6">
            <span className="text-xs font-bold tracking-widest text-[#d69586] uppercase">
              Global Opportunities
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold text-[#3a3a3a] mb-6 leading-tight">
            Where Will Your <br />
            <span className="font-script text-[#e3a99c] text-6xl md:text-7xl relative inline-block transform -rotate-2 mt-2">
              Adventure Begin?
            </span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-lg text-[#6b6b6b] max-w-2xl mx-auto leading-relaxed">
            Specialized guidance for top digital nomad destinations and visa consultations.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative px-4 md:px-12 mb-24">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-[#e7ddd3] shadow-lg flex items-center justify-center hover:bg-[#3a3a3a] hover:text-white transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-[#3a3a3a] group-hover:text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-[#e7ddd3] shadow-lg flex items-center justify-center hover:bg-[#3a3a3a] hover:text-white transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-[#3a3a3a] group-hover:text-white" />
          </button>

          <div className="max-w-5xl mx-auto overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#f9f5f2] border border-[#e7ddd3]">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {destinations.map((dest, index) => (
                <div key={index} className="w-full flex-shrink-0 p-6 md:p-10 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Image */}
                    <div className="relative group">
                      <div
                        className="relative aspect-[3/2] md:aspect-square lg:aspect-square rounded-[2rem] overflow-hidden shadow-xl md:shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                      >
                        <img
                          src={dest.image}
                          alt={dest.country}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Floating Flag */}
                        <div className="absolute top-4 left-4 md:top-8 md:left-8 w-12 h-12 md:w-16 md:h-16 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-lg">
                          {dest.flag}
                        </div>

                        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                          <p className="font-[family-name:var(--font-heading)] text-sm md:text-lg opacity-90 mb-1">Destination</p>
                          <h3 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold leading-tight">{dest.city}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6 md:space-y-8">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#3a3a3a] mb-2 md:mb-4">{dest.country}</h3>
                        <p className="text-base md:text-lg text-[#6b6b6b] leading-relaxed">
                          {dest.description}
                        </p>
                      </div>



                      <div className="pt-2 md:pt-4">
                        <a href="#contact" className="inline-flex items-center gap-2 md:gap-3 font-bold text-[#3a3a3a] hover:text-[#e3a99c] transition-colors group/link text-base md:text-lg">
                          <span>Start your application</span>
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transform group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                  ? "w-8 bg-[#3a3a3a]"
                  : "w-2 bg-[#e7ddd3] hover:bg-[#bbcccd]"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Consultation Services */}
        <div className="bg-[#3a3a3a] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e3a99c]/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 mb-6">
                <Globe2 className="w-4 h-4 text-[#e3a99c]" />
                <span className="text-xs font-bold tracking-widest text-[#e3a99c] uppercase">
                  Expert Consultations
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Looking for other destinations?
              </h3>
              <p className="text-white/60 text-lg mb-8 max-w-md">
                I also provide comprehensive visa consultation services for major global destinations.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#e3a99c] text-[#3a3a3a] font-bold hover:bg-white transition-all shadow-lg"
              >
                Book a Consultation
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {consultations.map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-center hover:bg-white/10 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="font-bold text-lg mb-1">{item.name}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">{item.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
