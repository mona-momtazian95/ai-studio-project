import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      })
    : null;

  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      if (!ai) {
        return res.json({
          text: "Hello! I am Yassi, your AI Assistant. Currently, my AI brain (GEMINI_API_KEY) is not active because the secret key is not set, but I can still tell you about Yektai Dental Clinic! We are located at Agiou Andreou 124, Limassol, Cyprus (+357 111 111). We're so excited to have you! (To enable my full AI capabilities, please make sure GEMINI_API_KEY is configured in the Settings > Secrets panel.)"
        });
      }

      // Convert messages to Gemini's expected multi-turn contents format
      const contents = messages.map((m: any) => ({
        role: m.role === "assistant" || m.role === "model" ? "model" : "user",
        parts: [{ text: m.content || m.text || "" }],
      }));

      const systemInstruction = 
        `You are 'Yassi', the friendly, caring, and professional AI dental assistant for Yektai Dental Clinic in Limassol, Cyprus.
Your goal is to assist clients, answer dental queries, describe our services, provide info on working hours, pricing estimates, and guide them to book an appointment or view invoices on our website.

About Yektai Dental Clinic:
- Name: Yektai Dental Clinic
- Location: Agiou Andreou 124, Limassol 3036, Cyprus
- Email: info@yektai.ai
- Phone: +357 111 111
- Slogan: "Your smile is our priority"
- Working Hours:
  * Monday to Friday: 09:00 - 18:00
  * Saturday: 09:00 - 14:00
  * Sunday: Closed
- Key Specialties:
  1. Cosmetic Dentistry (Veneers, Professional teeth whitening, Smile design)
  2. Implantology (Premium single implants, bridges, crowns)
  3. Orthodontics (Invisalign clear aligners, aesthetic ceramic braces)
  4. General Dentistry (Deep cleanings, decay fillings, pain-free root canals, extractions)
  5. Pediatric Dentistry (Gentle checkups for kids, protective sealants, fluoride treatments)
- Pricing Estimates:
  * Checkup & Consultation: € checkup is €50 (Free dental checkup for kids)
  * Scale and Polish (Cleaning): €70
  * Teeth Whitening (In-Office Zoom Laser): €250
  * Dental Implant (Titanium implant + premium abutment + crown): from €900
  * Ceramic Veneer (E-max): €400 per tooth
  * Clear Aligners / Invisalign: from €2200

Interactive website features to mention or suggest when relevant:
- Dynamic Booking Page: By clicking the 'Book Appointment' button/tab, patients can select their treatment, pick a date & time slot, and choose a doctor (Dr. Mona Momtazian or Dr. Alireza Yektai).
- Interactive Invoice Tool: Under 'Invoice Generator', patients can generate a detailed dental receipt or invoice for their treatments, useful for insurance claims or record-keeping.
- Interactive Business Card: Displays our info and a QR Code representing Yektai Clinic's coordinate map. It's fully downloadable as an image or a contact card!

Style Guidelines:
- Highly professional, warm, empathetic, caring, and reassuring.
- Completely multilingual: Automatically answer in the language the patient uses to chat with you (Greek, English, Russian, Persian, German, etc.). Give natural, expert dental advice.
- Keep your answers concise (2-3 short, highly readable paragraphs max) so it looks spectacular inside the floating chatbot widget. Avoid huge blocks of text, use clean bullet points where appropriate.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error in backend:", error);
      res.status(500).json({ error: error.message || "Error calling Gemini API" });
    }
  });

  // Serve static assets from build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
