import React, { useState, useEffect } from "react";
import { Receipt, Plus, Trash2, Printer, Search, Download, HelpCircle, Save, CheckCircle2 } from "lucide-react";
import { Language, Invoice, InvoiceItem } from "../types";
import { TREATMENTS_DATA } from "../translations";

interface InvoiceGeneratorProps {
  lang: Language;
  t: (key: string) => string;
}

export default function InvoiceGenerator({ lang, t }: InvoiceGeneratorProps) {
  // Local storage invoice list state
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);

  // Form Field States
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [customItemDesc, setCustomItemDesc] = useState(TREATMENTS_DATA[0].id);
  const [customItemQty, setCustomItemQty] = useState(1);
  const [customItemPrice, setCustomItemPrice] = useState(TREATMENTS_DATA[0].price);

  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [vatRate, setVatRate] = useState(0.19); // Standard Cyprus VAT is 19% for dental/cosmetic
  const [searchQuery, setSearchQuery] = useState("");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Initialize and load sample data or saved ones
  useEffect(() => {
    const saved = localStorage.getItem("yektai_invoices");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setInvoices(parsed);
        if (parsed.length > 0) {
          setActiveInvoice(parsed[0]);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      // Seed initial sample invoice to show off the system immediately
      const sample: Invoice = {
        id: "INV-652011",
        invoiceNumber: "YEK-2026-0034",
        patientName: "Mona Momtazian",
        patientEmail: "mona.momtazian95@gmail.com",
        patientPhone: "+357 99 123456",
        date: "2026-06-06",
        vatRate: 0.19,
        status: "paid",
        items: [
          {
            id: "1",
            treatmentName: "Checkup & Comprehensive Consultation",
            price: 50,
            quantity: 1
          },
          {
            id: "2",
            treatmentName: "In-Office Zoom Laser Teeth Whitening",
            price: 250,
            quantity: 1
          }
        ]
      };
      setInvoices([sample]);
      setActiveInvoice(sample);
      localStorage.setItem("yektai_invoices", JSON.stringify([sample]));
    }
  }, []);

  // Update unit price on changing treatment selection
  const handleTreatmentChange = (treatmentId: string) => {
    setCustomItemDesc(treatmentId);
    const selection = TREATMENTS_DATA.find(x => x.id === treatmentId);
    if (selection) {
      setCustomItemPrice(selection.price);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const selection = TREATMENTS_DATA.find(x => x.id === customItemDesc);
    const label = selection ? selection.name[lang] : customItemDesc;

    const newItem: InvoiceItem = {
      id: Math.random().toString(),
      treatmentName: label,
      price: customItemPrice,
      quantity: customItemQty
    };

    setItems([...items, newItem]);
    // Reset inputs
    setCustomItemQty(1);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const computeTotals = (itemList: InvoiceItem[]) => {
    const subtotal = itemList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const vat = subtotal * vatRate;
    const total = subtotal + vat;
    return { subtotal, vat, total };
  };

  const handleSaveInvoice = () => {
    if (!clientName.trim() || items.length === 0) return;

    const invoiceNumber = `YEK-2026-0${Math.floor(100 + Math.random() * 900)}`;
    const newInvoice: Invoice = {
      id: "INV-" + Math.floor(100000 + Math.random() * 900000),
      invoiceNumber,
      patientName: clientName,
      patientEmail: clientEmail,
      patientPhone: clientPhone,
      date: new Date().toISOString().split("T")[0],
      items,
      vatRate,
      status: "paid"
    };

    const updated = [newInvoice, ...invoices];
    setInvoices(updated);
    localStorage.setItem("yektai_invoices", JSON.stringify(updated));
    setActiveInvoice(newInvoice);

    // Reset setup form
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setItems([]);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const totals = computeTotals(items);
  const activeTotals = activeInvoice ? computeTotals(activeInvoice.items) : { subtotal: 0, vat: 0, total: 0 };

  const handlePrint = () => {
    window.print();
  };

  const filteredInvoices = invoices.filter(inv =>
    inv.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto text-left">
      
      {/* LEFT COLUMN: Setup Generator inputs */}
      <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-semibold text-stone-900">{t("invoiceTitle")}</h2>
              <p className="text-stone-500 text-xs mt-0.5">{t("invoiceDesc")}</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            
            {/* Bill To Customer Information */}
            <div className="border border-stone-100 bg-stone-50/50 p-4 rounded-xl space-y-3">
              <h3 className="text-xs font-bold text-stone-700 tracking-wider uppercase">{t("billTo")}</h3>
              <div>
                <input
                  type="text"
                  placeholder={t("patientNameHolder")}
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-700 text-stone-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="email"
                  placeholder={t("patientEmailHolder")}
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-700 text-stone-800 font-mono"
                />
                <input
                  type="tel"
                  placeholder={t("patientPhoneHolder")}
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-700 text-stone-800 font-mono"
                />
              </div>
            </div>

            {/* Treatment Selector & Add item to array form */}
            <form onSubmit={handleAddItem} className="space-y-3 border border-stone-100 p-4 rounded-xl bg-stone-50/50">
              <h3 className="text-xs font-bold text-stone-700 tracking-wider uppercase">{t("addItem")}</h3>
              <div className="space-y-2">
                <select
                  value={customItemDesc}
                  onChange={(e) => handleTreatmentChange(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-700 text-stone-800 font-semibold"
                >
                  {TREATMENTS_DATA.map(tr => (
                    <option key={tr.id} value={tr.id}>
                      {tr.name[lang]} (€{tr.price})
                    </option>
                  ))}
                  <option value="X-Ray Assessment">Digital Panoramic Dental X-Ray</option>
                  <option value="Composite Tooth Filling - Medium 1">Composite Resin Tooth Filling</option>
                  <option value="Fluoride preventative tooth sealant">Fluoride Preventive Treatment</option>
                </select>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[10px] text-stone-400 mb-0.5">{t("unitPrice")}</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={customItemPrice}
                      onChange={(e) => setCustomItemPrice(Number(e.target.value))}
                      className="w-full bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-700 text-stone-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-0.5">{t("qty")}</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={customItemQty}
                      onChange={(e) => setCustomItemQty(Number(e.target.value))}
                      className="w-full bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-700 text-stone-800 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-800 hover:bg-stone-900 text-white rounded-lg py-2 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t("addItem")}
                </button>
              </div>
            </form>

            {/* Currently staging items inside the list */}
            {items.length > 0 && (
              <div className="max-h-[140px] overflow-y-auto space-y-2 pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs bg-emerald-50/50 border border-emerald-100 rounded-lg p-2.5">
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-semibold text-stone-800 line-clamp-1">{item.treatmentName}</p>
                      <span className="text-[10px] text-stone-400 font-mono">{item.quantity} x €{item.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-stone-700">€{item.price * item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Staging Totals block */}
                <div className="bg-stone-50 border border-stone-200 p-3 rounded-lg text-xs space-y-1 mt-3">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal:</span>
                    <span className="font-mono">€{totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>{t("vatAmount")}:</span>
                    <span className="font-mono">€{totals.vat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-950 text-sm border-t border-stone-200 pt-1.5 mt-1">
                    <span>Total:</span>
                    <span className="font-mono">€{totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Action Panel Buttons to lock / save standard invoice */}
        <div className="pt-6 border-t border-stone-100 mt-6 space-y-3">
          {showSaveSuccess && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs py-2 px-3 rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              Invoice generated & saved locally!
            </div>
          )}
          <button
            onClick={handleSaveInvoice}
            disabled={!clientName.trim() || items.length === 0}
            className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white rounded-xl py-3 text-xs font-semibold cursor-pointer shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            {t("saveInvoice")}
          </button>
        </div>

      </div>

      {/* RIGHT COLUMN: Invoice layout view & historical searching logs */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Invoice searching toolbar */}
        <div className="bg-white border border-stone-200 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t("searchInvoices")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-700"
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
            <button
              onClick={handlePrint}
              disabled={!activeInvoice}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-200 text-xs font-semibold disabled:opacity-40 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Printout
            </button>
          </div>
        </div>

        {/* Actual High-Fidelity Dental Invoice Sheet */}
        {activeInvoice ? (
          <div
            id="printable-invoice-sheet"
            className="bg-white border border-stone-200 rounded-2xl shadow-md p-8 md:p-12 relative overflow-hidden select-text"
          >
            {/* Fine watermark bar representing clean modern branding design */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-emerald-800" />
            
            {/* Invoice Metadata row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-100 pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-850 flex items-center justify-center font-serif text-white font-bold text-xs">Y</div>
                  <span className="font-serif font-bold text-lg text-emerald-950 uppercase">{t("brand")}</span>
                </div>
                <p className="text-[10px] text-stone-400 mt-1 uppercase font-semibold tracking-widest">{t("slogan")}</p>
              </div>
              <div className="text-left sm:text-right font-mono text-xs text-stone-500">
                <p className="font-bold text-stone-800 text-sm">INVOICE-RECEIPT</p>
                <p className="mt-0.5"><span className="text-stone-400">{t("invoiceNum")}:</span> <strong className="text-emerald-900">{activeInvoice.invoiceNumber}</strong></p>
                <p><span className="text-stone-400">{t("invoiceDate")}:</span> {activeInvoice.date}</p>
              </div>
            </div>

            {/* Bill Address Coordinates info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-stone-100 text-xs">
              <div>
                <p className="text-stone-400 uppercase font-bold tracking-wider text-[10px] mb-1.5">Dentist Specialist Office</p>
                <h4 className="font-bold text-stone-800">Yektai Dental Clinic</h4>
                <p className="text-stone-500 leading-relaxed mt-0.5">
                  Agiou Andreou 124, Block C<br />
                  3036 Limassol, Cyprus<br />
                  Tel: +357 111 111<br />
                  Email: info@yektai.ai
                </p>
              </div>
              <div>
                <p className="text-stone-400 uppercase font-bold tracking-wider text-[10px] mb-1.5">{t("billTo")}</p>
                <h4 className="font-bold text-stone-800">{activeInvoice.patientName}</h4>
                <p className="text-stone-500 leading-relaxed mt-0.5">
                  {activeInvoice.patientPhone && <>Phone: {activeInvoice.patientPhone}<br /></>}
                  {activeInvoice.patientEmail && <>Email: {activeInvoice.patientEmail}<br /></>}
                  Cyprus Dental Patient Record
                </p>
              </div>
            </div>

            {/* Table Itemized Rows */}
            <div className="py-6 min-h-[140px]">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider text-[10px] text-left">
                    <th className="pb-2.5">{t("itemDescription")}</th>
                    <th className="pb-2.5 text-center w-12">{t("qty")}</th>
                    <th className="pb-2.5 text-right w-24">Unit (€)</th>
                    <th className="pb-2.5 text-right w-24">Total (€)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {activeInvoice.items.map((item) => (
                    <tr key={item.id} className="text-stone-800 font-medium">
                      <td className="py-3 pr-2 font-semibold text-stone-900">{item.treatmentName}</td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right font-mono">€{item.price.toFixed(2)}</td>
                      <td className="py-3 text-right font-bold text-stone-900 font-mono">€{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Invoicing summary details */}
            <div className="border-t border-stone-200 pt-5 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-stone-400 leading-relaxed">
                <p className="font-semibold text-stone-500">Legal Declaration / Notes:</p>
                <p className="text-[10px] mt-1 pr-4">
                  Dentistry treatments in Cyprus. Tax exemption applies to selected non-cosmetic surgeries. Standard VAT calculated at 19% for professional laser whitening and cosmetic enhancements.
                </p>
              </div>
              <div className="space-y-1.5 text-left sm:text-right font-medium">
                <div className="flex justify-between sm:justify-end gap-16 text-stone-500">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold w-24">€{activeTotals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-16 text-stone-500">
                  <span>VAT ({activeInvoice.vatRate * 100}%):</span>
                  <span className="font-mono font-bold w-24">€{activeTotals.vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-16 text-lg font-serif font-bold text-emerald-950 border-t border-stone-200 pt-2 mt-1">
                  <span>Total Due:</span>
                  <span className="font-mono w-24">€{activeTotals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Cyprus clinic official seal visual outline */}
            <div className="flex justify-between items-end mt-12 pt-6 border-t border-stone-100 text-[10px] text-stone-400">
              <div>
                <p className="font-semibold text-stone-600">Yektai Dental Clinic Cyprus</p>
                <p>Dental Registration Chamber No. CY-87140B</p>
              </div>
              <div className="text-right border border-emerald-100 rounded-lg p-2 bg-emerald-50/20">
                <span className="block font-bold text-emerald-800 uppercase tracking-wider">OFFICIAL ELECT_PAID</span>
                <span className="block font-mono mt-0.5">{activeInvoice.invoiceNumber}</span>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-stone-50 border border-stone-200 rounded-2xl h-96 flex flex-col items-center justify-center text-center p-6 text-stone-400 font-sans">
            <HelpCircle className="w-10 h-10 text-stone-300 mb-2" />
            <p className="text-sm">{t("noInvoices")}</p>
          </div>
        )}

        {/* History / Other records selector deck */}
        <div className="bg-stone-50 border border-stone-150 rounded-xl p-4 text-left">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-[0.1em] mb-3">Saved Invoice Records History:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {filteredInvoices.map((inv) => (
              <button
                key={inv.id}
                onClick={() => setActiveInvoice(inv)}
                className={`p-3 rounded-lg border text-left flex justify-between items-center transition-all cursor-pointer ${
                  activeInvoice?.id === inv.id
                    ? "bg-emerald-900 text-white border-emerald-900 shadow"
                    : "bg-white hover:bg-stone-100 border-stone-200 text-stone-700"
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold leading-none truncate">{inv.patientName}</h4>
                  <span className="text-[10px] font-mono opacity-80 block mt-1.5">{inv.invoiceNumber}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold block font-mono">€{computeTotals(inv.items).total.toFixed(0)}</span>
                  <span className="text-[9px] uppercase font-bold tracking-widest opacity-80 mt-0.5 block font-mono">PAID</span>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Screen Printing CSS styles injecting for pure layout prints */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice-sheet, #printable-invoice-sheet * {
            visibility: visible;
          }
          #printable-invoice-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
        }
      `}</style>

    </div>
  );
}
