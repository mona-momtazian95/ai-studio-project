import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, Heart, Info, CalendarDays, CheckCircle2, ShieldAlert, Trash2, CalendarCheck } from "lucide-react";
import { Language, Appointment, Treatment, Doctor } from "../types";
import { TREATMENTS_DATA } from "../translations";
import { 
  googleSignIn, 
  initAuth, 
  handleLogout, 
  createGoogleCalendarEvent,
  sendGoogleGmail
} from "../lib/firebase";
import { User as FirebaseUser } from "firebase/auth";

interface BookingSystemProps {
  lang: Language;
  t: (key: string) => string;
}

export default function BookingSystem({ lang, t }: BookingSystemProps) {
  // Mock Specialists
  const doctors: Doctor[] = [
    {
      id: "mona",
      name: t("drMona"),
      title: {
        en: "Lead Cosmetic Specialist & Pediatric Dentist",
        el: "Υπεύθυνη Αισθητικής & Παιδοδοντιατρικής",
        ru: "Главный специалист по эстетике и детской стоматологии",
        tr: "Baş Estetik Uzmanı ve Pedodontist",
        hy: "Գլխավոր էսթետիկ մասնագետ և մանկական ատամնաբույժ"
      },
      image: "mona",
      speciality: {
        en: "Cosmetic & Veneers, Teeth Whitening",
        el: "Αισθητική & Όψεις, Λεύκανση",
        ru: "Эстетика, виниры, отбеливание",
        tr: "Estetik Diş Hekimliği, Lamineler, Diş Beyazlatma",
        hy: "Էսթետիկ ստոմատոլոգիա, վինիրներ, ատամների սպիտակեցում"
      }
    },
    {
      id: "alireza",
      name: t("drAli"),
      title: {
        en: "Chief Implantologist & Maxillofacial Surgeon",
        el: "Διευθυντής Εμφυτευματολόγος & Χειρουργός Στόματος",
        ru: "Главный имплантолог и челюстно-лицевой хирург",
        tr: "Baş İmplantolog ve Çene Cerrahı",
        hy: "Գլխավոր իմպլանտոլոգ և դիմածնոտային վիրաբույժ"
      },
      image: "alireza",
      speciality: {
        en: "Implants, Crowns, Root Canals",
        el: "Εμφυτεύματα, Στεφάνες, Ενδοδοντία",
        ru: "Имплантология, коронки, каналы",
        tr: "İmplantlar, Kuronlar, Kanal Tedavisi",
        hy: "Իմպլանտներ, պսակներ, արմատախորշերի բուժում"
      }
    }
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
  ];

  // Google Calendar Integration State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [syncToCalendar, setSyncToCalendar] = useState(true);
  const [calendarStatusMsg, setCalendarStatusMsg] = useState<"success" | "error" | null>(null);
  const [isSyncingCalendar, setIsSyncingCalendar] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Forms states
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [selectedTreatment, setSelectedTreatment] = useState(TREATMENTS_DATA[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0].id);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [notes, setNotes] = useState("");

  const [localBookings, setLocalBookings] = useState<Appointment[]>([]);
  const [successBooking, setSuccessBooking] = useState<Appointment | null>(null);

  // Sync state & credentials on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Handler for google calendar log in
  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setCalendarStatusMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
      }
    } catch (err) {
      console.error("Failed to connect Google Calendar Account:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await handleLogout();
      setUser(null);
      setAccessToken(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Load from localstorage on load
  useEffect(() => {
    const saved = localStorage.getItem("yektai_appointments");
    if (saved) {
      try {
        setLocalBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Save to localstorage helper
  const saveBookings = (newAppointments: Appointment[]) => {
    setLocalBookings(newAppointments);
    localStorage.setItem("yektai_appointments", JSON.stringify(newAppointments));
  };

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim() || !bookingDate || !bookingTime) {
      return;
    }

    const newApp: Appointment = {
      id: "YEK-" + Math.floor(100000 + Math.random() * 900000),
      patientName,
      patientPhone,
      patientEmail,
      treatmentId: selectedTreatment,
      doctorId: selectedDoctor,
      date: bookingDate,
      time: bookingTime,
      notes,
      createdAt: new Date().toLocaleDateString()
    };

    const finalApps = [newApp, ...localBookings];
    saveBookings(finalApps);
    setSuccessBooking(newApp);

    // Sync to Google Calendar & Gmail if connected
    if (user && accessToken && syncToCalendar) {
      setIsSyncingCalendar(true);
      setCalendarStatusMsg(null);
      try {
        const docName = getDoctorName(selectedDoctor);
        const treatName = getTreatmentName(selectedTreatment);
        
        // Detailed description including all patient details
        const detailsText = `Appointment with ${docName} at Yektai Dental Clinic.
----------------------------
Patient Name: ${patientName}
Phone Number: ${patientPhone}
Email Address: ${patientEmail || "Not specified"}
Treatment: ${treatName}
Date & Time: ${bookingDate} at ${bookingTime}
Reference Code: ${newApp.id}
Special Concerns / Notes: ${notes || "None"}`;

        await createGoogleCalendarEvent({
          title: `Dental Appointment: ${patientName} - ${treatName}`,
          description: detailsText,
          date: bookingDate,
          time: bookingTime,
          doctorName: docName,
          treatmentName: treatName
        }, accessToken);

        // Send HTML summary email to the logged in owner's Gmail address
        if (user.email) {
          try {
            const emailSubject = `${patientName} - ${treatName} - ${bookingDate} ${bookingTime} - Appointment Booked`;
            const emailBodyHtml = `
<div style="font-family: 'Inter', system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e7ebf4; border-radius: 16px; background-color: #ffffff; color: #1c1917; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
  <div style="text-align: center; margin-bottom: 24px; border-bottom: 2px solid #065f46; padding-bottom: 16px;">
    <h2 style="color: #065f46; font-family: serif; font-size: 24px; margin: 0 0 8px 0;">Yektai Dental Clinic</h2>
    <p style="color: #6b7280; font-size: 14px; margin: 0;">New Appointment Confirmation Summary</p>
  </div>
  
  <p style="font-size: 15px; line-height: 1.6; color: #374151;">
    Hello,
  </p>
  <p style="font-size: 15px; line-height: 1.6; color: #374151;">
    A new dental appointment has been successfully scheduled and recorded. Here is the complete summary of the appointment:
  </p>

  <div style="background-color: #f9fafb; border-radius: 12px; padding: 18px; margin: 20px 0; border: 1px solid #e5e7eb;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #6b7280; width: 40%; border-bottom: 1px solid #f3f4f6;">Appointment ID</td>
        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-family: monospace; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${newApp.id}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Patient Name</td>
        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${patientName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Phone Number</td>
        <td style="padding: 8px 0; font-size: 14px; color: #111827; border-bottom: 1px solid #f3f4f6;">${patientPhone}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Email Address</td>
        <td style="padding: 8px 0; font-size: 14px; color: #111827; border-bottom: 1px solid #f3f4f6;">${patientEmail || "Not specified"}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Requested Service</td>
        <td style="padding: 8px 0; font-size: 14px; color: #047857; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${treatName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Care Specialist</td>
        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 500; border-bottom: 1px solid #f3f4f6;">${docName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Scheduled Date</td>
        <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${bookingDate}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Scheduled Time</td>
        <td style="padding: 8px 0; font-size: 14px; color: #047857; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${bookingTime}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; font-size: 13px; color: #6b7280; vertical-align: top;">Additional Notes</td>
        <td style="padding: 8px 0; font-size: 13px; color: #4b5563; line-height: 1.4; white-space: pre-wrap;">${notes || "None"}</td>
      </tr>
    </table>
  </div>

  <p style="font-size: 12px; line-height: 1.6; color: #9ca3af; text-align: center; margin-top: 24px; border-top: 1px solid #f3f4f6; padding-top: 16px;">
    This email was automatically triggered and delivered via Yektai Clinic's Connected Google Workspace Integration.
  </p>
</div>
            `;

            await sendGoogleGmail({
              to: user.email,
              subject: emailSubject,
              bodyHtml: emailBodyHtml
            }, accessToken);
          } catch (gmailError) {
            console.warn("Gmail notification sending skipped or failed (unapproved scope):", gmailError);
          }
        }

        setCalendarStatusMsg("success");
      } catch (err) {
        console.error("Failed to sync to Google Calendar:", err);
        setCalendarStatusMsg("error");
      } finally {
        setIsSyncingCalendar(false);
      }
    } else {
      setCalendarStatusMsg(null);
    }

    // Reset fields
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
    setNotes("");
    setBookingTime("");
    setBookingDate("");
  };

  const handleCancelBooking = (id: string) => {
    const isConfirmed = window.confirm(
      lang === "el" 
        ? "Είστε σίγουροι ότι θέλετε να ακυρώσετε αυτό το ραντεβού;" 
        : lang === "ru"
        ? "Вы уверены, что хотите отменить эту запись?"
        : "Are you sure you want to cancel this appointment?"
    );
    if (!isConfirmed) return;

    const filtered = localBookings.filter(a => a.id !== id);
    saveBookings(filtered);
  };

  const getTreatmentName = (id: string) => {
    const tItem = TREATMENTS_DATA.find(x => x.id === id);
    return tItem ? tItem.name[lang] : id;
  };

  const getDoctorName = (id: string) => {
    const dr = doctors.find(x => x.id === id);
    return dr ? dr.name : id;
  };

  // Restrict calendar past dates
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
      
      {/* Booking Form Card layout */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-semibold text-stone-900">
              {t("bookingTitle")}
            </h2>
            <p className="text-stone-500 text-xs mt-0.5">
              {t("bookingDesc")}
            </p>
          </div>
        </div>

        {successBooking ? (
          /* Animated success box */
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 text-center animate-fade-in my-6">
            <CheckCircle2 className="w-14 h-14 text-emerald-700 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-emerald-950">
              {t("bookingSuccess")}
            </h3>
            <p className="text-stone-600 text-xs mt-1.5 leading-relaxed">
              {t("bookingSuccessDesc")}
            </p>

            <div className="bg-white border border-stone-200 rounded-xl p-4 my-5 text-left space-y-2 text-xs text-stone-800 shadow-sm leading-relaxed">
              <div>
                <span className="text-stone-400 font-mono block uppercase text-[10px] tracking-wider">{t("appId")}</span>
                <span className="font-bold text-emerald-900 font-mono text-sm">{successBooking.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-stone-400 block font-sans text-[10px]">{t("fullName")}</span>
                  <span className="font-semibold">{successBooking.patientName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-sans text-[10px]">{t("phone")}</span>
                  <span className="font-semibold font-mono">{successBooking.patientPhone}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-stone-400 block font-sans text-[10px]">{t("selectTreatment")}</span>
                  <span className="font-semibold text-stone-700 line-clamp-1">{getTreatmentName(successBooking.treatmentId)}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-sans text-[10px]">{t("selectDoctor")}</span>
                  <span className="font-semibold">{getDoctorName(successBooking.doctorId)}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-stone-400 block font-sans text-[10px]">{t("selectDate")}</span>
                  <span className="font-semibold font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-700" />
                    {successBooking.date}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block font-sans text-[10px]">{t("selectTime")}</span>
                  <span className="font-semibold font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-700" />
                    {successBooking.time}
                  </span>
                </div>
              </div>
            </div>

            {isSyncingCalendar && (
              <div className="text-stone-500 text-xs flex items-center justify-center gap-2 my-4">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-800 border-t-transparent"></span>
                <span>Adding to Google Calendar...</span>
              </div>
            )}
            {!isSyncingCalendar && calendarStatusMsg === "success" && (
              <div className="bg-emerald-100/80 border border-emerald-300 text-emerald-950 px-4 py-3 rounded-xl text-xs flex items-center gap-2 justify-center my-4 max-w-md mx-auto">
                <CalendarCheck className="w-4 h-4 text-emerald-700 shrink-0 animate-bounce" />
                <span className="font-medium">Synced successfully with your Google Calendar!</span>
              </div>
            )}
            {!isSyncingCalendar && calendarStatusMsg === "error" && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl text-xs flex items-center gap-2 justify-center my-4 max-w-md mx-auto">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-medium">Booked locally. Failed to insert into Google Calendar (Check permissions).</span>
              </div>
            )}

            <button
              onClick={() => {
                setSuccessBooking(null);
                setCalendarStatusMsg(null);
              }}
              className="bg-emerald-800 hover:bg-emerald-950 text-white rounded-xl py-2.5 px-6 font-semibold text-xs transition-colors cursor-pointer"
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          /* Actual interactive form */
          <form onSubmit={handleBookSubmit} className="space-y-4 mt-6">
            
            {/* Inputs Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t("fullName")} *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-700 focus:bg-white text-stone-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t("phone")} *</label>
                <input
                  type="tel"
                  required
                  placeholder="+357 "
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-emerald-700 focus:bg-white text-stone-800 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t("email")} (Optional)</label>
              <input
                type="email"
                placeholder="client@exam.ai"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-700 focus:bg-white text-stone-800 transition-colors"
              />
            </div>

            {/* Treatment & Doctor Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t("selectTreatment")} *</label>
                <select
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-700 focus:bg-white text-stone-800 transition-colors"
                >
                  {TREATMENTS_DATA.map((tItem) => (
                    <option key={tItem.id} value={tItem.id}>
                      {tItem.name[lang]} (€{tItem.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t("selectDoctor")} *</label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-700 focus:bg-white text-stone-800 transition-colors"
                >
                  {doctors.map((dr) => (
                    <option key={dr.id} value={dr.id}>
                      {dr.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t("selectDate")} *</label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-emerald-700 focus:bg-white text-stone-800 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t("selectTime")} *</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setBookingTime(slot)}
                      className={`py-2 text-[11px] font-mono font-bold rounded-lg border text-center transition-all cursor-pointer ${
                        bookingTime === slot
                          ? "bg-emerald-800 border-emerald-800 text-white shadow-sm"
                          : "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sickness Details notes */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">{t("additionalNotes")}</label>
              <textarea
                rows={2}
                placeholder="Tooth ache, routing clean, Veneer advisory consultation..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-700 focus:bg-white text-stone-800 transition-colors"
              />
            </div>

            {/* Google Calendar Sync Integration Area */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-white rounded-lg border border-stone-200 block">
                    <svg className="w-5 h-5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/>
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-stone-950">Google Calendar Sync</h4>
                    <p className="text-[10px] text-stone-500">Add appointments automatically to your calendar</p>
                  </div>
                </div>
                {user && (
                  <button
                    type="button"
                    onClick={handleGoogleLogout}
                    className="text-[9px] font-mono text-stone-400 hover:text-rose-600 underline font-semibold cursor-pointer"
                  >
                    Disconnect
                  </button>
                )}
              </div>

              {!user ? (
                <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-[10px] text-stone-500 leading-normal max-w-sm">
                    Keep track of your dental checkups easily by securely syncing scheduled time slots to your personal calendar.
                  </p>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoggingIn}
                    className="text-xs font-semibold py-2 px-3 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 active:bg-stone-100 transition-colors flex items-center gap-2 shadow-xs cursor-pointer select-none text-stone-700 shrink-0"
                    style={{ minWidth: "140px", justifyContent: "center" }}
                  >
                    {isLoggingIn ? (
                      <span className="animate-spin rounded-full h-3 w-3 border-2 border-stone-500 border-t-transparent"></span>
                    ) : (
                      <>
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 48 48">
                          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                        </svg>
                        <span>Connect Google</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-stone-200 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span className="font-semibold text-stone-800 text-[11px] truncate max-w-[180px] sm:max-w-xs">
                      Connected to {user.email || "Google Account"}
                    </span>
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={syncToCalendar}
                      onChange={(e) => setSyncToCalendar(e.target.checked)}
                      className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                    />
                    <span className="text-[10px] font-bold text-stone-600">Sync Active</span>
                  </label>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!patientName.trim() || !patientPhone.trim() || !bookingDate || !bookingTime}
              className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow transition-colors cursor-pointer text-sm"
            >
              {t("submitBooking")}
            </button>
          </form>
        )}
      </div>

      {/* Right Column: Live Bookings list */}
      <div className="lg:col-span-5 flex flex-col gap-6 text-left">
        
        {/* Doctors Info Deck */}
        <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6">
          <h3 className="text-md font-semibold text-emerald-900 mb-3 block flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-emerald-700 shrink-0" />
            Our Professional Dentists
          </h3>
          <div className="space-y-4">
            {doctors.map((dr) => (
              <div key={dr.id} className="flex gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-xs">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold font-serif shrink-0 border border-emerald-100">
                  {dr.name.split(" ")[1]?.[0] || "Dr"}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-800 leading-tight">{dr.name}</h4>
                  <p className="text-[10px] text-stone-400 mt-0.5 leading-snug">{dr.title[lang]}</p>
                  <span className="inline-block bg-stone-100 text-stone-600 rounded px-1.5 py-0.5 text-[9px] font-medium mt-1 leading-none">{dr.speciality[lang]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard of personal active appointments */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 flex-1 shadow-sm flex flex-col">
          <h3 className="text-md font-semibold text-stone-900 mb-2 font-serif flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-700" />
            {t("myBookings")}
          </h3>
          
          <div className="flex-1 overflow-y-auto mt-2 space-y-3 max-h-[300px]">
            {localBookings.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <Info className="w-8 h-8 text-stone-300 mb-1.5" />
                <p className="text-xs">{t("noBookings")}</p>
              </div>
            ) : (
              localBookings.map((app) => (
                <div key={app.id} className="bg-stone-50 border border-stone-200 rounded-xl p-3 relative flex justify-between items-start hover:shadow-xs transition-shadow">
                  <div className="space-y-1 pr-6 leading-relaxed">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold font-mono text-[10px] leading-none bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded">
                        {app.id}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        booked {app.createdAt}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-stone-800">{app.patientName}</h4>
                    <p className="text-[11px] text-emerald-800 font-medium">{getTreatmentName(app.treatmentId)}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-stone-500 pt-0.5">
                      <span className="font-mono flex items-center gap-0.5">
                        📆 {app.date}
                      </span>
                      <span className="font-mono flex items-center gap-0.5">
                        🕒 {app.time}
                      </span>
                      <span className="flex items-center gap-0.5">
                        👨‍⚕️ {getDoctorName(app.doctorId)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancelBooking(app.id)}
                    title="Cancel Appointment"
                    className="absolute top-2 right-2 hover:bg-red-50 text-stone-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
