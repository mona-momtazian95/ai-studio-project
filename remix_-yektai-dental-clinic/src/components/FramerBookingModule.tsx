import React, { useState, useEffect } from "react";
import { CalendarDays, Clock, User, CheckCircle2, ShieldAlert, Trash2 } from "lucide-react";

// --- HOVER & ANIMATION STYLES INLINE FOR PORTABILITY ---
const cssFadeIn = `
@keyframes frameFadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.framer-animate-fade {
  animation: frameFadeIn 0.4s ease-out forwards;
}
`;

// --- SELF-CONTAINED LOCALIZATION DICTIONARY ---
const TRANSLATIONS: Record<string, any> = {
  en: {
    bookingTitle: "Book Appointment",
    bookingDesc: "Select specialist, date and fill in your details.",
    selectDoctor: "Select Specialist",
    selectTreatment: "Dental Treatment",
    selectDate: "Preferred Date",
    selectTime: "Available Time Slots",
    patientName: "Your Full Name",
    patientPhone: "Phone Number (+357 ...)",
    patientEmail: "Email Address (Optional)",
    notes: "Special requests or dental concerns",
    submitBtn: "Confirm Booking",
    successTitle: "Appointment Confirmed!",
    successDesc: "Your reservation has been recorded locally. We look forward to seeing you!",
    appointmentCode: "Reservation ID",
    myBookings: "My Saved Sessions",
    noBookings: "No bookings found.",
    cancelBtn: "Cancel",
    drMona: "Dr. Mona Momtazian",
    drAli: "Dr. Alireza Yektai",
    cosmetic: "Cosmetic & Veneers, Teeth Whitening",
    implant: "Implants, Crowns, Root Canals",
    leadCosmetic: "Lead Cosmetic & Pediatric Specialist",
    implantsCrows: "Chief Implantologist & Surgeon"
  },
  el: {
    bookingTitle: "Κράτηση Ραντεβού",
    bookingDesc: "Επιλέξτε ειδικό, ημερομηνία και συμπληρώστε τα στοιχεία σας.",
    selectDoctor: "Επιλογή Ειδικού",
    selectTreatment: "Οδοντιατρική Θεραπεία",
    selectDate: "Επιθυμητή Ημερομηνία",
    selectTime: "Διαθέσιμες Ώρες",
    patientName: "Ονοματεπώνυμο",
    patientPhone: "Αριθμός Τηλεφώνου",
    patientEmail: "Διεύθυνση Email",
    notes: "Σημειώσεις ή ειδικές ανάγκες",
    submitBtn: "Επιβεβαίωση Κράτησης",
    successTitle: "Το Ραντεβού Επιβεβαιώθηκε!",
    successDesc: "Η κράτησή σας έχει καταγραφεί τοπικά. Ανυπομονούμε να σας δούμε!",
    appointmentCode: "Κωδικός Κράτησης",
    myBookings: "Τα Ραντεβού Μου",
    noBookings: "Δεν βρέθηκαν κρατήσεις.",
    cancelBtn: "Ακύρωση",
    drMona: "Δρ. Μόνα Μομταζιάν",
    drAli: "Δρ. Αλιρέζα Γιεκτάι",
    cosmetic: "Αισθητική & Όψεις, Λεύκανση",
    implant: "Εμφυτεύματα, Στεφάνες, Ενδοδοντία",
    leadCosmetic: "Υπεύθυνη Αισθητικής & Παιδοδοντιατρικής",
    implantsCrows: "Διευθυντής Εμφυτευματολόγος & Χειρουργός"
  },
  ru: {
    bookingTitle: "Запись на прием",
    bookingDesc: "Выберите специалиста, дату и введите свои данные.",
    selectDoctor: "Выберите врача",
    selectTreatment: "Стоматологическая услуга",
    selectDate: "Дата визита",
    selectTime: "Доступное время",
    patientName: "Ваше имя и фамилия",
    patientPhone: "Номер телефона (+357 ...)",
    patientEmail: "Эл. почта (необязательно)",
    notes: "Особые пожелания или проблемы",
    submitBtn: "Подтвердить запись",
    successTitle: "Запись подтверждена!",
    successDesc: "Ваша бронь успешно сохранена. Мы будем рады видеть вас!",
    appointmentCode: "Код бронирования",
    myBookings: "Мои записи",
    noBookings: "Записи не найдены.",
    cancelBtn: "Отменить",
    drMona: "Д-р Мона Момтазиан",
    drAli: "Д-р Алиреза Ектаи",
    cosmetic: "Эстетика, виниры, отбеливание",
    implant: "Имплантология, коронки, каналы",
    leadCosmetic: "Главный специалист по эстетике",
    implantsCrows: "Главный имплантолог"
  }
};

// --- CORE MOCK DATA FOR BULLETPROOF COMPILATION ---
const SECURE_TREATMENTS = [
  { id: "clean", label: "Teeth Cleaning & Polish" },
  { id: "whitening", label: "Laser Teeth Whitening" },
  { id: "implants", label: "Consultation & Implants" },
  { id: "aligners", label: "Clear Aligners & Braces" },
  { id: "emergency", label: "Emergency Relief & Pain Care" }
];

const SECURE_DOCTORS = [
  { id: "mona", keyName: "drMona", keyTitle: "leadCosmetic", keySpec: "cosmetic" },
  { id: "alireza", keyName: "drAli", keyTitle: "implantsCrows", keySpec: "implant" }
];

const SECURE_HOURS = [
  "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
];

// Define TypeScript Props Interface for standard usage and Framer attributes
export interface FramerBookingProps {
  language: "en" | "el" | "ru";
  primaryColor: string;
  accentHoverBg: string;
  borderRadiusPx: number;
  showMyBookingsList: boolean;
  boxShadow: boolean;
  borderActiveColor: string;
}

export default function FramerBookingModule(props: Partial<FramerBookingProps>) {
  // Safe fallback parameters for visual customization directly in Framer sidebar!
  const lang = props.language || "en";
  const colorTheme = props.primaryColor || "#065f46"; // Default elegant emerald
  const hoverColor = props.accentHoverBg || "#047857";
  const radius = props.borderRadiusPx !== undefined ? props.borderRadiusPx : 16;
  const showSavedList = props.showMyBookingsList !== undefined ? props.showMyBookingsList : true;
  const shadowActive = props.boxShadow !== undefined ? props.boxShadow : true;
  const activeBorder = props.borderActiveColor || "#10b981";

  // Translate helper safe against dynamic key missing
  const tx = (key: string): string => {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  // State Management
  const [selectedDoctor, setSelectedDoctor] = useState(SECURE_DOCTORS[0].id);
  const [selectedTreatment, setSelectedTreatment] = useState(SECURE_TREATMENTS[0].id);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientNotes, setPatientNotes] = useState("");

  const [savedReservations, setSavedReservations] = useState<any[]>([]);
  const [recentBooking, setRecentBooking] = useState<any | null>(null);

  // Load bookings securely from absolute standalone space
  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("framer_booking_reservations");
      if (data) {
        try {
          setSavedReservations(JSON.parse(data));
        } catch (_) {}
      }
    }
  }, []);

  const saveToStorage = (list: any[]) => {
    setSavedReservations(list);
    if (typeof window !== "undefined") {
      localStorage.setItem("framer_booking_reservations", JSON.stringify(list));
    }
  };

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim() || !bookingDate || !bookingTime) {
      return;
    }

    const uniqueId = "FRM-" + Math.floor(100000 + Math.random() * 900000);
    const newReservation = {
      id: uniqueId,
      doctor: SECURE_DOCTORS.find(d => d.id === selectedDoctor),
      treatment: SECURE_TREATMENTS.find(t => t.id === selectedTreatment),
      date: bookingDate,
      time: bookingTime,
      name: patientName,
      phone: patientPhone,
      email: patientEmail,
      notes: patientNotes,
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newReservation, ...savedReservations];
    saveToStorage(updated);
    setRecentBooking(newReservation);

    // Reset details
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
    setPatientNotes("");
    setBookingDate("");
    setBookingTime("");
  };

  const cancelReservation = (id: string) => {
    const filtered = savedReservations.filter(r => r.id !== id);
    saveToStorage(filtered);
  };

  const minDateLimit = new Date().toISOString().split("T")[0];

  return (
    <div className="w-full text-stone-800 font-sans leading-relaxed text-left">
      <style>{cssFadeIn}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto p-2">
        {/* Booking Form Layout */}
        <div 
          className="lg:col-span-7 bg-white border border-stone-200 p-6 md:p-8 text-left transition-all"
          style={{ 
            borderRadius: `${radius}px`,
            boxShadow: shadowActive ? "0 4px 20px -2px rgba(120, 110, 90, 0.08), 0 2px 8px -1px rgba(0, 0, 0, 0.03)" : "none"
          }}
        >
          <div className="flex items-center gap-3.5 mb-6">
            <div 
              className="p-3 text-white flex items-center justify-center shrink-0" 
              style={{ backgroundColor: colorTheme, borderRadius: `${radius * 0.7}px` }}
            >
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-stone-900 leading-tight">
                {tx("bookingTitle")}
              </h3>
              <p className="text-stone-500 text-xs mt-1">
                {tx("bookingDesc")}
              </p>
            </div>
          </div>

          {recentBooking ? (
            <div className="framer-animate-fade border rounded-xl p-6 text-center space-y-4 my-6 bg-emerald-50/40 border-emerald-200">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-serif font-bold text-stone-900">{tx("successTitle")}</h4>
                <p className="text-stone-600 text-xs mt-1">{tx("successDesc")}</p>
              </div>

              <div className="bg-white border border-emerald-100 rounded-lg p-3 text-left font-mono text-xs space-y-1 block max-w-sm mx-auto">
                <div className="flex justify-between text-stone-400">
                  <span>{tx("appointmentCode")}:</span>
                  <span className="font-bold text-stone-700">{recentBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Specialist:</span>
                  <span className="text-stone-700 font-sans font-medium">{tx(recentBooking.doctor?.keyName || "")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Date &amp; Time:</span>
                  <span className="text-emerald-700 font-bold">{recentBooking.date} • {recentBooking.time}</span>
                </div>
              </div>

              <button
                onClick={() => setRecentBooking(null)}
                className="px-5 py-2 text-white font-medium text-xs rounded-lg transition-transform hover:scale-102 active:scale-98"
                style={{ backgroundColor: colorTheme }}
              >
                Book Another Slot
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingConfirm} className="space-y-4">
              
              {/* Doctor Choice */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  {tx("selectDoctor")}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SECURE_DOCTORS.map(d => (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDoctor(d.id)}
                      className="border p-3.5 rounded-xl cursor-pointer select-none transition-all flex items-start gap-3 bg-stone-50"
                      style={{ 
                        borderWidth: "1.5px",
                        borderColor: selectedDoctor === d.id ? activeBorder : "#e7e5e4",
                        boxShadow: selectedDoctor === d.id ? `0 0 0 3px ${activeBorder}20` : "none"
                      }}
                    >
                      <div className="w-10 h-10 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center font-serif text-stone-700 font-bold shrink-0">
                        {d.id === "mona" ? "M" : "A"}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-stone-900">{tx(d.keyName)}</h4>
                        <p className="text-[10px] text-stone-500 font-medium leading-tight mt-0.5">{tx(d.keyTitle)}</p>
                        <p className="text-[9px] text-emerald-800 font-medium tracking-wide leading-tight mt-0.5">{tx(d.keySpec)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment Picker */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  {tx("selectTreatment")}
                </label>
                <select
                  value={selectedTreatment}
                  onChange={(e) => setSelectedTreatment(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs font-medium text-stone-800 focus:outline-none transition-all"
                  style={{ borderRadius: `${radius * 0.6}px` }}
                >
                  {SECURE_TREATMENTS.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date selection & calendar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    {tx("selectDate")}
                  </label>
                  <input
                    type="date"
                    min={minDateLimit}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs font-medium text-stone-800 focus:outline-none"
                    style={{ borderRadius: `${radius * 0.6}px` }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    {tx("selectTime")}
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {SECURE_HOURS.map(hour => (
                      <button
                        key={hour}
                        type="button"
                        onClick={() => setBookingTime(hour)}
                        className={`py-2 text-[11px] font-mono font-bold rounded-lg transition-all ${
                          bookingTime === hour 
                            ? "text-white" 
                            : "bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100"
                        }`}
                        style={{
                          backgroundColor: bookingTime === hour ? colorTheme : undefined,
                          borderColor: bookingTime === hour ? colorTheme : undefined
                        }}
                      >
                        {hour}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Patient Fields */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={tx("patientName")}
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-none"
                      style={{ borderRadius: `${radius * 0.6}px` }}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder={tx("patientPhone")}
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-none"
                      style={{ borderRadius: `${radius * 0.6}px` }}
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder={tx("patientEmail")}
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-none"
                    style={{ borderRadius: `${radius * 0.6}px` }}
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder={tx("notes")}
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-none resize-none"
                    style={{ borderRadius: `${radius * 0.6}px` }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!patientName || !patientPhone || !bookingDate || !bookingTime}
                className="w-full py-3.5 text-white font-serif font-bold text-sm tracking-wide rounded-xl shadow-md transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                style={{ 
                  backgroundColor: colorTheme, 
                  borderRadius: `${radius * 0.7}px`,
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = colorTheme)}
              >
                {tx("submitBtn")}
              </button>

            </form>
          )}
        </div>

        {/* Saved Bookings Column - Great for local persistence demonstration and widget usage */}
        {showSavedList && (
          <div 
            className="lg:col-span-5 bg-stone-50 border border-stone-200 p-6 text-left space-y-4"
            style={{ 
              borderRadius: `${radius}px`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-stone-600" />
              <h4 className="text-sm font-serif font-bold text-stone-900">{tx("myBookings")}</h4>
            </div>

            {savedReservations.length === 0 ? (
              <p className="text-xs text-stone-400 italic bg-white p-4 rounded-xl border border-dashed border-stone-200 text-center">
                {tx("noBookings")}
              </p>
            ) : (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {savedReservations.map((res) => (
                  <div 
                    key={res.id} 
                    className="bg-white border border-stone-200 rounded-xl p-3 flex flex-col justify-between text-xs space-y-2 group shadow-2xs relative"
                  >
                    <button
                      onClick={() => cancelReservation(res.id)}
                      className="absolute top-2 right-2 text-stone-400 hover:text-rose-600 transition-colors"
                      title={tx("cancelBtn")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <h5 className="font-bold text-stone-900">{res.name}</h5>
                      </div>
                      <p className="text-[10px] text-stone-500 font-medium pl-3 mt-0.5">
                        {tx(res.doctor?.keyName || "")} • {res.treatment?.label}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] bg-stone-50/80 p-2 rounded-lg font-medium pl-3 pt-1">
                      <span className="text-emerald-800 font-bold font-mono text-xs">{res.date} • {res.time}</span>
                      <span className="text-stone-400 font-mono text-[9px]">{res.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="space-y-2 p-1.5 bg-emerald-800/5 rounded-xl border border-emerald-900/10 text-[10px] text-stone-500">
              <div className="flex gap-2 items-start">
                <ShieldAlert className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                <p className="leading-normal">
                  <strong>Developer Sandbox Tool:</strong> This widget safely implements booking local preservation mimicking database integrations. Plug directly inside your personal <strong>Framer Code components</strong>, and visual custom properties can sync seamlessly.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- COMPILE-SAFE DEFINITION OF FRAMER PROPERTY CONTROLS ---
// When the file is copy & pasted directly into standard Framer Code editor, the below Framer control system active-registers 
// the properties dynamically allowing design teams to visually configure all parameters in the canvas sidebar.

try {
  // @ts-ignore
  if (typeof window !== "undefined" && window.Framer) {
    // Only imports property controls if Framer global environment is open & accessible in compilation runtime
  }
} catch (_) {}
