import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Receipt, MapPin, Compass, Phone, Mail, Clock, ShieldCheck, Heart, User, ArrowRight, Share2, Star } from "lucide-react";
import { Language } from "./types";
import { translations, TREATMENTS_DATA } from "./translations";
// @ts-ignore
import heroSmileImg from "./assets/images/beautiful_smile_teeth_1780737043969.png";
// @ts-ignore
import dentalChairImg from "./assets/images/dental_surgery_chair_1780737639278.png";
// @ts-ignore
import clinicBuildingImg from "./assets/images/clinic_building_1780744523283.png";
// @ts-ignore
import yektaiLogoLeaf from "./assets/images/yektai_logo_leaf.svg";

// Subcomponents
import InteractiveBusinessCard from "./components/InteractiveBusinessCard";
import BookingSystem from "./components/BookingSystem";
import InvoiceGenerator from "./components/InvoiceGenerator";
import ContactSection from "./components/ContactSection";
import AIChatbot from "./components/AIChatbot";

export default function App() {
  // Lang preference management via localStorage
  const [lang, setLang] = useState<Language>("en");
  const [activeTab, setActiveTab] = useState<"home" | "services" | "booking" | "invoices" | "contact">("home");

  // Load user language selection if any
  useEffect(() => {
    const saved = localStorage.getItem("yektai_lang");
    if (saved && (saved === "en" || saved === "el" || saved === "ru" || saved === "tr" || saved === "hy")) {
      setLang(saved as Language);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("yektai_lang", newLang);
  };

  // Helper macro translation getter
  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key;
  };

  // Language flag/abbrev indicators mapping
  const languagesList: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "EN", flag: "🇬🇧" },
    { code: "el", label: "ΕΛ", flag: "🇨🇾" },
    { code: "tr", label: "TR", flag: "🇹🇷" },
    { code: "ru", label: "РУ", flag: "🇷🇺" },
    { code: "hy", label: "ՀԱ", flag: "🇦🇲" }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-800 font-sans flex flex-col justify-between ltr" style={{ direction: "ltr" }}>
      
      {/* 1. Header Toolbar Assembly */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-stone-200 z-30 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          
          {/* Logo Brand Layout */}
          <div onClick={() => setActiveTab("home")} className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 pl-1">
            <img 
              src={yektaiLogoLeaf} 
              alt="Yektai Dental" 
              className="w-11 h-11 select-none shrink-0" 
              referrerPolicy="no-referrer"
            />
            <div className="text-left font-sans whitespace-nowrap">
              <h1 className="text-md sm:text-lg font-serif font-bold tracking-tight text-emerald-950 uppercase leading-tight whitespace-nowrap">YEKTAI</h1>
              <p className="text-[9px] text-emerald-700 font-semibold tracking-[0.2em] sm:tracking-[0.25em] leading-none uppercase whitespace-nowrap">D E N T A L   C L I N I C</p>
            </div>
          </div>

          {/* Desktop Nav Actions */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold select-none">
            <button
              onClick={() => setActiveTab("home")}
              className={`hover:text-emerald-800 cursor-pointer transition-colors px-2 py-1 ${activeTab === "home" ? "text-emerald-800 font-bold border-b-2 border-emerald-800" : "text-stone-600"}`}
            >
              {t("home")}
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`hover:text-emerald-800 cursor-pointer transition-colors px-2 py-1 ${activeTab === "services" ? "text-emerald-800 font-bold border-b-2 border-emerald-800" : "text-stone-600"}`}
            >
              {t("services")}
            </button>
            <button
              onClick={() => setActiveTab("booking")}
              className={`hover:text-emerald-800 cursor-pointer transition-colors px-2 py-1 ${activeTab === "booking" ? "text-emerald-800 font-bold border-b-2 border-emerald-800" : "text-stone-600"}`}
            >
              {t("booking")}
            </button>
            <button
              onClick={() => setActiveTab("invoices")}
              className={`hover:text-emerald-800 cursor-pointer transition-colors px-2 py-1 ${activeTab === "invoices" ? "text-emerald-800 font-bold border-b-2 border-emerald-800" : "text-stone-600"}`}
            >
              {t("invoices")}
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`hover:text-emerald-800 cursor-pointer transition-colors px-2 py-1 ${activeTab === "contact" ? "text-emerald-800 font-bold border-b-2 border-emerald-800" : "text-stone-600"}`}
            >
              {t("contactTitle")}
            </button>
          </nav>

          {/* Dynamic Multilingual Flags Button panel */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-full border border-stone-200">
              {languagesList.map((item) => (
                <button
                  key={item.code}
                  onClick={() => changeLanguage(item.code)}
                  title={item.label}
                  className={`px-3 py-1 text-xs font-bold rounded-full cursor-pointer transition-all ${
                    lang === item.code
                      ? "bg-white text-emerald-800 shadow-sm font-extrabold font-serif"
                      : "text-stone-500 hover:text-stone-900 opacity-70"
                  }`}
                >
                  <span className="mr-1">{item.flag}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA action button */}
            <button
              onClick={() => setActiveTab("booking")}
              className="hidden sm:flex items-center gap-1.5 bg-emerald-850 hover:bg-emerald-950 text-white rounded-xl px-4 py-2.5 text-xs font-bold shadow hover:shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              {t("bookNowCustom")}
            </button>
          </div>

        </div>
      </header>

      {/* 2. Visual Hero Grid Assembly — dynamic to home tab */}
      {activeTab === "home" && (
        <section className="relative w-full h-[520px] sm:h-[580px] md:h-[620px] bg-stone-900 border-b border-stone-200 overflow-hidden select-none flex items-center">
          
          {/* Immersive background graphic of perfect teeth and smiling lips */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroSmileImg} 
              alt="Yektai Premium Dental Smile" 
              className="w-full h-full object-cover object-center lg:object-[center_35%] filter brightness-95 opacity-90"
              referrerPolicy="no-referrer"
            />
            {/* Safe contrast vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35" />
            {/* Smooth transition into background of web app page */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FDFCF8] via-[#FDFCF8]/40 to-transparent pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left">
            <div className="max-w-2xl space-y-6 text-white mr-auto ml-0 text-left">
              
              <div className="inline-flex items-center gap-2 bg-emerald-800/80 backdrop-blur-xs text-emerald-100 border border-emerald-700/50 rounded-full px-3.5 py-1.5 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>{t("experienceYears")}</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]">
                {t("heroTitle")}
              </h2>
              
              <p className="text-stone-300 text-sm md:text-base leading-relaxed max-w-lg font-medium [text-shadow:_0_1px_2px_rgba(0,0,0,0.25)]">
                {t("heroDesc")}
              </p>

              {/* USP Checklist indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-xs font-semibold text-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-850/80 flex items-center justify-center shrink-0 border border-emerald-600/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <span>{t("advancedTech")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-850/80 flex items-center justify-center shrink-0 border border-emerald-600/30">
                    <Heart className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <span>{t("familyAtmosphere")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-850/80 flex items-center justify-center shrink-0 border border-emerald-600/30">
                    <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  </div>
                  <span>Rated 4.9/5 by Cyprus Chamber</span>
                </div>
              </div>

              {/* Action buttons with custom colors */}
              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  onClick={() => setActiveTab("booking")}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl py-3 px-6 text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-emerald-700/40"
                >
                  {t("bookNowCustom")}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab("services")}
                  className="bg-white/10 hover:bg-white/15 backdrop-blur-xs border border-white/20 text-white rounded-xl py-3 px-6 text-sm font-semibold transition-all cursor-pointer"
                >
                  {t("viewServicesCustom")}
                </button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 3. Main Central App Segment Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Dynamic Navigation selector buttons (shown on mobile, or as tabs) */}
        <div className="flex justify-center flex-wrap gap-2 mb-10 select-none">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === "home"
                ? "bg-emerald-800 text-white border-emerald-800"
                : "bg-white hover:bg-stone-50 text-stone-700 border-stone-250"
            }`}
          >
            🏠 {t("home")}
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === "services"
                ? "bg-emerald-800 text-white border-emerald-800"
                : "bg-white hover:bg-stone-50 text-stone-700 border-stone-250"
            }`}
          >
            🦷 {t("services")}
          </button>
          <button
            onClick={() => setActiveTab("booking")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === "booking"
                ? "bg-emerald-800 text-white border-emerald-800"
                : "bg-white hover:bg-stone-50 text-stone-700 border-stone-250"
            }`}
          >
            📅 {t("booking")}
          </button>
          <button
            onClick={() => setActiveTab("invoices")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === "invoices"
                ? "bg-emerald-800 text-white border-emerald-800"
                : "bg-white hover:bg-stone-50 text-stone-700 border-stone-250"
            }`}
          >
            📑 {t("invoices")}
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
              activeTab === "contact"
                ? "bg-emerald-800 text-white border-emerald-800"
                : "bg-white hover:bg-stone-50 text-stone-700 border-stone-250"
            }`}
          >
            📍 {t("contactTitle")}
          </button>
        </div>

        {/* Outer Staging Wrapper */}
        <div className="animate-fade-in">
          {activeTab === "home" && (
            <div className="space-y-16">
              
              {/* Home content overview */}
              <div className="text-center max-w-2xl mx-auto space-y-5 select-none">
                <div className="relative w-full h-[220px] sm:h-[340px] rounded-3xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-100/50">
                  <img 
                    src={clinicBuildingImg} 
                    alt="Yektai Dental Clinic Exterior Facade in Limassol" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-serif font-semibold text-emerald-950 tracking-tight">
                    Dental Excellence in Cyprus
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed max-w-lg mx-auto">
                    Tailored treatments and state-of-the-art care designed around your unique smile. Access clinic coordinates below.
                  </p>
                </div>
              </div>

              {/* Dynamic Interactive Card Segment */}
              <div>
                <InteractiveBusinessCard lang={lang} t={t} />
              </div>

              {/* Quick Services Preview */}
              <div className="space-y-6 select-none bg-stone-50 rounded-2xl p-6 border border-stone-200">
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <h3 className="text-xl font-serif font-bold text-emerald-950">{t("servicesIntroTitle")}</h3>
                    <p className="text-stone-500 text-xs mt-0.5">{t("servicesIntroDesc")}</p>
                  </div>
                  <button onClick={() => setActiveTab("services")} className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer">
                    View All {TREATMENTS_DATA.length} Treatments →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TREATMENTS_DATA.slice(0, 3).map((item) => (
                    <div key={item.id} className="bg-white border border-stone-200 rounded-xl p-5 text-left flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded uppercase font-bold tracking-wider">{item.category[lang]}</span>
                        <h4 className="text-sm font-semibold text-stone-900 mt-2.5">{item.name[lang]}</h4>
                        <p className="text-stone-500 text-[11px] leading-relaxed mt-1.5 truncate">{item.description[lang]}</p>
                      </div>
                      <div className="flex justify-between items-center text-xs border-t border-stone-100 pt-3.5 mt-4">
                        <span className="text-stone-400 font-mono">🕒 {item.duration}</span>
                        <span className="font-bold text-emerald-900 font-mono text-sm">{t("startingFrom")} €{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modern Clinical Facility Tour Section */}
              <div className="space-y-8 select-none pt-4">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Clinic Facade & Interiors
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-emerald-950 mt-2">
                    Our State-Of-The-Art Limassol Facility
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    Take a visual tour of Yektai Dental Clinic. We pair warm natural acoustics, modern exterior architecture, and premium dental chairs to make your visit relaxing and stress-free.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
                  {/* Left Column: Clinic Exterior */}
                  <div className="group bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between">
                    <div className="relative h-64 md:h-72 overflow-hidden bg-stone-100">
                      <img 
                        src={clinicBuildingImg} 
                        alt="Yektai Dental Clinic Exterior Facade in Limassol" 
                        className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-4 left-4 bg-emerald-900/90 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-md backdrop-blur-xs">
                        Exterior Storefront
                      </span>
                    </div>
                    <div className="p-6 text-left space-y-2">
                      <h4 className="text-md font-serif font-bold text-stone-900">Prestigious Location & Design</h4>
                      <p className="text-stone-500 text-xs leading-relaxed">
                        Centrally situated on historic Agiou Andreou St in Limassol, Cyprus, our clinic is finished with clean limestone tile work, warm wood cladding, and cozy glass design providing natural light-filled reception lounges.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Treatment Room / Interior */}
                  <div className="group bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between">
                    <div className="relative h-64 md:h-72 overflow-hidden bg-stone-100">
                      <img 
                        src={dentalChairImg} 
                        alt="Yektai Modern Surgery Room with Green Chair" 
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-4 left-4 bg-emerald-900/90 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-md backdrop-blur-xs">
                        Equipped Surgery Room
                      </span>
                    </div>
                    <div className="p-6 text-left space-y-2">
                      <h4 className="text-md font-serif font-bold text-stone-900">Advanced Ergonomic Surgery Chairs</h4>
                      <p className="text-stone-500 text-xs leading-relaxed">
                        Our treatment room houses our premier olive-green custom orthopedic therapy chair, paired with dual-sensor clinical lighting systems, ultra-sterile air filtration, and private cabinets to shield medical instruments out of direct patient sight.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-8 animate-fade-in select-none text-left">
              <div className="max-w-2xl text-left space-y-2 mb-6">
                <h2 className="text-3xl font-serif font-semibold text-stone-900">
                  {t("servicesIntroTitle")}
                </h2>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {t("servicesIntroDesc")}
                </p>
              </div>

              {/* Grid lists of dental diagnostics and surgical options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TREATMENTS_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-stone-200 hover:border-emerald-700 hover:shadow-xs p-6 rounded-2xl flex flex-col justify-between transition-all"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 rounded uppercase font-bold tracking-wider leading-relaxed">
                          {item.category[lang]}
                        </span>
                        <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md font-mono">
                          ID: {item.id}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-stone-900 leading-tight">
                        {item.name[lang]}
                      </h3>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        {item.description[lang]}
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-stone-100 pt-4 mt-6 text-xs text-stone-600 font-sans leading-none">
                      <div className="flex items-center gap-4">
                        <span className="font-mono flex items-center gap-1">
                          🕒 {t("durationLabel")}: <strong>{item.duration}</strong>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 block text-[9px] uppercase tracking-wide mb-1 leading-none font-bold">Estimated Cost</span>
                        <span className="text-lg font-mono font-bold text-emerald-950">
                          {t("startingFrom")} €{item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special warning check notes */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-amber-900 leading-relaxed">
                <Clock className="w-5 h-5 text-amber-700 shrink-0" />
                <p>
                  * Treatment times might vary based on custom diagnostics, x-rays, or physical structures of patients mouths. Free follow-up consultation is fully guaranteed.
                </p>
              </div>
            </div>
          )}

          {activeTab === "booking" && (
            <div className="animate-fade-in">
              <BookingSystem lang={lang} t={t} />
            </div>
          )}

          {activeTab === "invoices" && (
            <div className="animate-fade-in">
              <InvoiceGenerator lang={lang} t={t} />
            </div>
          )}

          {activeTab === "contact" && (
            <div className="animate-fade-in">
              <ContactSection lang={lang} t={t} />
            </div>
          )}
        </div>

      </main>

      {/* 4. Complete Footer Area with addresses coordinates */}
      <footer className="bg-stone-900 border-t border-stone-850 text-stone-400 py-12 text-sm select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
          
          {/* Slogan metadata */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={yektaiLogoLeaf} 
                alt="Yektai Dental" 
                className="w-9 h-9 select-none shrink-0" 
                referrerPolicy="no-referrer"
              />
              <span className="font-serif font-bold text-white text-md uppercase tracking-tight">{t("brand")}</span>
            </div>
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
              {t("footerDesc")}
            </p>
            <p className="text-[10px] text-stone-600 font-mono">
              © 2026 {t("brand")}. {t("allRightsReserved")}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.1em] mb-2">{t("addressTitle")}</h4>
            <ul className="space-y-1.5 text-xs text-stone-500 leading-normal">
              <li>{t("addressText")}</li>
              <li>{t("phoneLabel")}: +357 111 111</li>
              <li>{t("emailLabel")}: info@yektai.ai</li>
            </ul>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="text-white text-[11px] font-bold uppercase tracking-[0.1em] mb-2">{t("hoursTitle")}</h4>
            <div className="text-stone-500 space-y-1">
              <p>{t("monFri")}: 09:00 - 18:00</p>
              <p>{t("sat")}: 09:00 - 14:00</p>
              <p>{t("sun")}: {t("closed")}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. Intelligently Floating AI Chatbot Assistant represented bottom right */}
      <AIChatbot lang={lang} t={t} />

      {/* CSS Utility variables injected for fade animation */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.35s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-spin-once {
          animation: spin 0.6s ease-out 1;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .rtl {
          direction: rtl;
        }
        .ltr {
          direction: ltr;
        }
      `}</style>

    </div>
  );
}
