export type Language = "en" | "el" | "ru" | "tr" | "hy";

export interface Treatment {
  id: string;
  name: Record<Language, string>;
  category: Record<Language, string>;
  price: number;
  duration: string;
  description: Record<Language, string>;
}

export interface Doctor {
  id: string;
  name: string;
  title: Record<Language, string>;
  image: string;
  speciality: Record<Language, string>;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  treatmentId: string;
  doctorId: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  treatmentName: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  items: InvoiceItem[];
  vatRate: number; // e.g. 0.19 for 19%
  status: "paid" | "unpaid" | "pending";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}
