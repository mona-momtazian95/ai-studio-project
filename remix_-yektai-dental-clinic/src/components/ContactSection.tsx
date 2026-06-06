import React from "react";
import { MapPin, Phone, Mail, Clock, Compass, ExternalLink, CalendarDays } from "lucide-react";
import { Language } from "../types";
import { WORK_HOURS } from "../translations";
// @ts-ignore
import clinicBuildingImg from "../assets/images/clinic_building_1780744523283.png";

interface ContactSectionProps {
  lang: Language;
  t: (key: string) => string;
}

export default function ContactSection({ lang, t }: ContactSectionProps) {
  const googleMapsUrl = "https://maps.google.com/?q=Agiou+Andreou+124,+Limassol,+Cyprus";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto text-left">
      
      {/* Cards columns for details */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Contact links card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-serif font-semibold text-emerald-950 mb-5 flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-700 animate-spin-slow" />
            Clinic Contact Desk
          </h3>

          <div className="space-y-4">
            {/* Phone */}
            <div className="flex gap-4 p-3 hover:bg-stone-50 rounded-xl transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t("quickCall")}</span>
                <p className="text-sm font-semibold font-mono text-stone-800 mt-1">
                  <a href="tel:+357111111" className="hover:text-emerald-800 hover:underline">+357 111 111</a>
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 p-3 hover:bg-stone-50 rounded-xl transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t("quickEmail")}</span>
                <p className="text-sm font-semibold font-mono text-stone-800 mt-1">
                  <a href="mailto:info@yektai.ai" className="hover:text-emerald-800 hover:underline">info@yektai.ai</a>
                </p>
              </div>
            </div>

            {/* Location Address */}
            <div className="flex gap-4 p-3 hover:bg-stone-50 rounded-xl transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">{t("addressTitle")}</span>
                <p className="text-xs font-semibold text-stone-800 mt-1 leading-relaxed">
                  {t("addressText")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Working hours ledger */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-serif font-semibold text-emerald-950 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-700" />
            {t("hoursTitle")}
          </h3>
          
          <div className="divide-y divide-stone-100 text-xs">
            {WORK_HOURS.map((h, idx) => (
              <div key={idx} className="py-2.5 flex justify-between items-center font-medium">
                <span className="text-stone-700 font-sans">{t(h.day)}</span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded-md ${
                  h.time === "closed" ? "bg-red-50 text-red-700 uppercase" : "bg-stone-150 text-stone-700"
                }`}>
                  {h.time === "closed" ? t("closed") : h.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: Clinic building image & interactive map layout */}
      <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        
        {/* Storefront Building Image Display */}
        <div className="mb-6 rounded-xl overflow-hidden border border-stone-200 shadow-xs relative h-48 bg-stone-100">
          <img 
            src={clinicBuildingImg} 
            alt="Yektai Dental Clinic Building Facade in Limassol" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-3 left-3 bg-emerald-900/90 text-white text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md backdrop-blur-xs">
            Yektai Storefront Facade
          </span>
        </div>

        {/* Dynamic Vector Map Mockup container */}
        <div className="relative rounded-xl overflow-hidden bg-stone-100 flex-1 min-h-[220px] border border-stone-200 shadow-inner flex items-center justify-center p-0">
          
          {/* Simulated Cyprus Map Styling element */}
          <div className="absolute inset-0 bg-[#e4e9f0]" />
          
          {/* Ocean waves design */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[#ccd8e7] flex items-center justify-center">
            <span className="text-[11px] font-mono tracking-widest text-[#9ab3d1] font-bold uppercase select-none">Mediterranean Sea (Limassol Gulf)</span>
          </div>

          {/* Golden outline shore lines represent realistic Limassol roads */}
          <svg className="absolute inset-x-0 top-0 bottom-1/3 w-full h-full text-stone-300 opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Coastline */}
            <path d="M 0,65 Q 40,55 70,70 T 100,60" fill="none" stroke="#b1c8df" strokeWidth="2" />
            
            {/* Grid grids indicating roads */}
            <line x1="10" y1="0" x2="30" y2="70" stroke="#fefefe" strokeWidth="1.5" />
            <line x1="45" y1="0" x2="55" y2="75" stroke="#fefefe" strokeWidth="1.5" />
            <line x1="80" y1="0" x2="60" y2="90" stroke="#fefefe" strokeWidth="1.5" />
            
            {/* Coast highway line */}
            <path d="M 0,63 Q 40,51 70,68 T 100,58" fill="none" stroke="#faecca" strokeWidth="2" />
            
            {/* Agiou Andreou prominent street */}
            <line x1="0" y1="45" x2="100" y2="40" stroke="#fdfdfd" strokeWidth="2" />
          </svg>

          {/* Dynamic Pin marker at Agiou Andreou 124 */}
          <div className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 animate-bounce">
            <div className="bg-emerald-800 text-white rounded-full p-2 shadow-lg border border-white">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="bg-emerald-950 text-white text-[10px] font-sans font-bold px-2 py-1 rounded shadow-md border border-emerald-800 mt-1 whitespace-nowrap">
              Yektai Dental Clinic
            </div>
          </div>

          {/* Diagnostic Scale lines mapping */}
          <div className="absolute bottom-4 left-4 bg-white/95 px-2 py-1 rounded border border-stone-200/60 text-[9px] font-mono text-stone-500 shadow-xs z-10">
            Scale: 1 : 250m | GPS: 34.6786° N, 33.0411° E
          </div>
        </div>

        {/* Maps direct navigation link */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs leading-none">
          <p className="text-stone-500 font-medium">📍 Located right behind the Limassol Old Port Promenade.</p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-emerald-850 hover:bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer font-sans"
          >
            {t("getDirections")}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

    </div>
  );
}
