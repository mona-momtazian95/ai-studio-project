import React, { useRef, useState } from "react";
import { Download, Mail, Phone, MapPin, Sparkles, Check, Share2, Clipboard, X, Send } from "lucide-react";
import { Language } from "../types";
// @ts-ignore
import dentalChairImg from "../assets/images/dental_surgery_chair_1780737639278.png";
// @ts-ignore
import yektaiLogoLeaf from "../assets/images/yektai_logo_leaf.svg";

interface BusinessCardProps {
  lang: Language;
  t: (key: string) => string;
}

export default function InteractiveBusinessCard({ lang, t }: BusinessCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharing, setSharing] = useState(false);

  const contactEmail = "info@yektai.ai";
  const contactPhone = "+357 111 111";
  const contactAddress = "Agiou Andreou 124, Limassol, Cyprus";
  const clinicUrl = window.location.origin;

  // Function to export as standard vCard contact file
  const handleDownloadvCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Yektai Dental Clinic
ORG:Yektai Dental Clinic
URL:${clinicUrl}
EMAIL;TYPE=PREF,INTERNET:${contactEmail}
TEL;TYPE=WORK,VOICE:${contactPhone}
ADR;TYPE=WORK:;;Agiou Andreou 124;Limassol;3036;Cyprus
NOTE:Your smile is our priority - Premium Dental Care in Limassol
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Yektai_Dental_Clinic.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Shared function to render custom canvas state high density (suitable for both download and sharing)
  const renderCanvasData = async (canvas: HTMLCanvasElement): Promise<boolean> => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    // Ensure all premium web fonts are loaded completely before drawing
    try {
      await document.fonts.ready;
    } catch (e) {
      console.warn("Fonts loading deferred", e);
    }

    // Set high dynamic resolution
    canvas.width = 1000;
    canvas.height = 562;

    // 1. Draw Background Cream
    ctx.fillStyle = "#FDFCF8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vector drawing helper functions for standard Lucide-style outline icons
    const drawMailIcon = (c: CanvasRenderingContext2D, x: number, y: number, s: number) => {
      c.save();
      c.strokeStyle = "#8FA998";
      c.lineWidth = 2.2;
      c.lineCap = "round";
      c.lineJoin = "round";
      c.beginPath();
      c.rect(x, y + s * 0.15, s, s * 0.7);
      c.moveTo(x, y + s * 0.15);
      c.lineTo(x + s / 2, y + s * 0.55);
      c.lineTo(x + s, y + s * 0.15);
      c.stroke();
      c.restore();
    };

    const drawPhoneIcon = (c: CanvasRenderingContext2D, x: number, y: number, s: number) => {
      c.save();
      c.strokeStyle = "#8FA998";
      c.lineWidth = 2.2;
      c.lineCap = "round";
      c.lineJoin = "round";
      c.beginPath();
      c.moveTo(x + s * 0.2, y + s * 0.35);
      c.lineTo(x + s * 0.35, y + s * 0.2);
      c.lineTo(x + s * 0.5, y + s * 0.35);
      c.lineTo(x + s * 0.4, y + s * 0.45);
      c.quadraticCurveTo(x + s * 0.6, y + s * 0.65, x + s * 0.75, y + s * 0.5);
      c.lineTo(x + s * 0.85, y + s * 0.6);
      c.lineTo(x + s * 0.7, y + s * 0.75);
      c.lineTo(x + s * 0.55, y + s * 0.9);
      c.quadraticCurveTo(x + s * 0.15, y + s * 0.5, x + s * 0.2, y + s * 0.35);
      c.stroke();
      c.restore();
    };

    const drawMapPinIcon = (c: CanvasRenderingContext2D, x: number, y: number, s: number) => {
      c.save();
      c.strokeStyle = "#8FA998";
      c.fillStyle = "#8FA998";
      c.lineWidth = 2.2;
      c.lineCap = "round";
      c.lineJoin = "round";
      c.beginPath();
      const cx = x + s / 2;
      const cy = y + s * 0.35;
      const r = s * 0.3;
      c.arc(cx, cy, r, -Math.PI, 0);
      c.lineTo(cx, y + s);
      c.closePath();
      c.stroke();
      c.beginPath();
      c.arc(cx, cy, s * 0.1, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    // Load static assets in parallel
    const loadImage = (src: string): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });
    };

    const [chairImg, qrImg, logoImg] = await Promise.all([
      loadImage(dentalChairImg),
      loadImage(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(clinicUrl)}`),
      loadImage(yektaiLogoLeaf)
    ]);

    // 2. Clear clipped region and draw curved background photograph
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(420, 0);
    ctx.bezierCurveTo(450, 180, 320, 380, 420, 562);
    ctx.lineTo(0, 562);
    ctx.closePath();
    ctx.clip();

    if (chairImg) {
      // Draw with object-cover logic to preserve the aspect ratio, matches CSS object-cover exactly
      const imgWidth = chairImg.width;
      const imgHeight = chairImg.height;
      const targetWidth = 450;
      const targetHeight = 562;
      
      const imgRatio = imgWidth / imgHeight;
      const targetRatio = targetWidth / targetHeight;
      let sx = 0, sy = 0, sw = imgWidth, sh = imgHeight;
      
      if (imgRatio > targetRatio) {
        sw = imgHeight * targetRatio;
        sx = (imgWidth - sw) / 2;
      } else {
        sh = imgWidth / targetRatio;
        sy = (imgHeight - sh) / 2;
      }
      ctx.drawImage(chairImg, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);
    } else {
      ctx.fillStyle = "#2D3629";
      ctx.fillRect(0, 0, 420, 562);
    }

    // Blend dark branding multiplier overlay on left sidebar
    ctx.fillStyle = "rgba(45, 54, 41, 0.75)";
    ctx.fillRect(0, 0, 440, 562);

    // Subtle background accent rings for visual richness
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.beginPath();
    ctx.arc(150, 160, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(220, 420, 85, 0, Math.PI * 2);
    ctx.fill();



    // Brand Monogram in left sidebar center
    ctx.save();
    ctx.translate(175, 236);
    
    // Draw white circular background container to match the exact uploaded badge
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.fill();

    // Draw clean matching outline border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.stroke();

    if (logoImg) {
      // Draw the exact logo in the middle of the badge
      ctx.drawImage(logoImg, -38, -38, 76, 76);
    } else {
      // Fallback if logoImg fails to load
      ctx.fillStyle = "#2D3629";
      ctx.font = "bold 44px 'Times New Roman', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Y", -4, 0);
    }

    ctx.restore();

    // Slogan inside left panel
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.font = "italic 20px 'Georgia', serif";
    ctx.textAlign = "left";
    
    // Helper to wrap the slogan line perfectly in all languages (English, Greek, Russian, Persian)
    const drawWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
      const words = text.split(" ");
      let line = "";
      let currentY = y;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, currentY);
          line = words[n] + " ";
          currentY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, currentY);
    };

    drawWrappedText(`"${t("cardSlogan")}"`, 60, 486, 240, 22);
    ctx.restore();

    ctx.restore(); // Restores original clip path

    // Draw S-curve division divider stroke nicely on top
    ctx.save();
    ctx.strokeStyle = "#8FA998";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(420, 0);
    ctx.bezierCurveTo(450, 180, 320, 380, 420, 562);
    ctx.stroke();
    ctx.restore();

    // 4. Draw Branding texts on right
    ctx.fillStyle = "#2D3629";
    ctx.font = "600 48px 'Playfair Display', 'Georgia', serif";
    ctx.textAlign = "left";
    ctx.fillText("YEKTAI", 480, 115);

    ctx.fillStyle = "#8FA998";
    ctx.font = "500 16px 'Space Grotesk', sans-serif";
    try {
      // @ts-ignore
      ctx.letterSpacing = "6px";
    } catch (e) {}
    ctx.fillText("DENTAL CLINIC", 480, 155);
    try {
      // @ts-ignore
      ctx.letterSpacing = "0px";
    } catch (e) {}

    ctx.strokeStyle = "rgba(45, 54, 41, 0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(480, 186);
    ctx.lineTo(920, 186);
    ctx.stroke();

    // Contact Information
    ctx.fillStyle = "#3A4335";
    ctx.font = "normal 18px 'Inter', system-ui, sans-serif";

    // Mail icon + txt
    drawMailIcon(ctx, 480, 226, 20);
    ctx.fillStyle = "#3A4335";
    ctx.font = "500 18px 'Inter', system-ui, sans-serif";
    ctx.fillText(contactEmail, 516, 242);

    // Phone icon + txt
    drawPhoneIcon(ctx, 480, 276, 20);
    ctx.fillStyle = "#3A4335";
    ctx.font = "500 18px 'Inter', system-ui, sans-serif";
    ctx.fillText(contactPhone, 516, 292);

    // Location icon + txt
    drawMapPinIcon(ctx, 480, 326, 20);
    ctx.fillStyle = "#3A4335";
    ctx.font = "500 18px 'Inter', system-ui, sans-serif";
    ctx.fillText(t("addressShort"), 516, 342);

    // Divider accent line before address and QR code
    ctx.strokeStyle = "rgba(45, 54, 41, 0.1)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(480, 390);
    ctx.lineTo(700, 390);
    ctx.stroke();

    // Address at the bottom left-ish area of right panel (matches html 100%)
    ctx.fillStyle = "#6B7565";
    ctx.font = "normal 14px 'JetBrains Mono', monospace";
    ctx.fillText("Agiou Andreou 124", 480, 478);
    ctx.fillText("Limassol 3036", 480, 502);

    // 5. Draw real QR code and boundary
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(143, 169, 152, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.fillRect(810, 390, 110, 110);
    ctx.strokeRect(810, 390, 110, 110);

    if (qrImg) {
      ctx.drawImage(qrImg, 815, 395, 100, 100);
    } else {
      // Fallback matrix dots representation
      ctx.fillStyle = "#2D3629";
      const drawFinder = (x: number, y: number) => {
        ctx.fillRect(x, y, 30, 30);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x + 6, y + 6, 18, 18);
        ctx.fillStyle = "#2D3629";
        ctx.fillRect(x + 10, y + 10, 8, 8);
      };
      drawFinder(820, 400);
      drawFinder(880, 400);
      drawFinder(820, 460);
    }

    ctx.fillStyle = "#8FA998";
    ctx.font = "bold 11px 'Space Grotesk', sans-serif";
    try {
      // @ts-ignore
      ctx.letterSpacing = "1.5px";
    } catch (e) {}
    ctx.textAlign = "center";
    ctx.fillText(t("scanToBook").toUpperCase(), 865, 524);
    try {
      // @ts-ignore
      ctx.letterSpacing = "0px";
    } catch (e) {}

    return true;
  };

  // Download logic
  const handleDownloadPNG = async () => {
    setDownloading(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setDownloading(false);
      return;
    }
    const success = await renderCanvasData(canvas);
    if (success) {
      const link = document.createElement("a");
      link.download = `Yektai_Dental_Clinic_Business_Card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
    setDownloading(false);
  };

  // Seamless social/app share logic using standard web share API or custom overlays
  const handleNativeShare = async () => {
    setSharing(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      setSharing(false);
      return;
    }

    try {
      await renderCanvasData(canvas);
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setSharing(false);
          return;
        }

        const file = new File([blob], "Yektai_Dental_Business_Card.png", { type: "image/png" });
        const shareData = {
          files: [file],
          title: "Yektai Dental Clinic",
          text: `Save Yektai Dental Clinic contact details or book a dental appointment: ${clinicUrl}`,
          url: clinicUrl
        };

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share(shareData);
          setShowShareModal(false);
        } else if (navigator.share) {
          await navigator.share({
            title: "Yektai Dental Clinic",
            text: "Check out Yektai Dental Clinic in Limassol, Cyprus.",
            url: clinicUrl
          });
          setShowShareModal(false);
        } else {
          // Trigger copy clipboard fallback
          handleCopyToClipboard();
        }
        setSharing(false);
      }, "image/png");
    } catch (err) {
      console.log("Could not share standard file structure:", err);
      try {
        if (navigator.share) {
          await navigator.share({
            title: "Yektai Dental Clinic",
            text: "Premium Dental Care in Limassol, Cyprus.",
            url: clinicUrl
          });
          setShowShareModal(false);
        } else {
          handleCopyToClipboard();
        }
      } catch (e) {
        // Shared cancelled / aborted silently
      }
      setSharing(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`Yektai Dental Clinic\nPhone: ${contactPhone}\nEmail: ${contactEmail}\nAddress: ${contactAddress}\nWebsite: ${clinicUrl}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div id="interactive-card" className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm max-w-4xl mx-auto transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold font-sans text-stone-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
            {t("cardDownloadTitle")}
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            {t("cardDownloadDesc")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            id="vcard-btn"
            onClick={handleDownloadvCard}
            className="flex items-center justify-center gap-2 px-4 py-2 text-stone-700 bg-stone-50 border border-stone-200 rounded-lg hover:bg-stone-100 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            {t("downloadVcf")}
          </button>
          <button
            id="share-modal-btn"
            onClick={() => setShowShareModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-emerald-800 border border-emerald-700 rounded-lg hover:bg-emerald-900 text-xs font-semibold cursor-pointer transition-colors"
          >
            <Share2 className="w-4 h-4 text-white" />
            Share Card
          </button>
          <button
            id="copy-card-btn"
            onClick={handleCopyToClipboard}
            className="flex items-center justify-center gap-2 px-4 py-2 text-stone-700 bg-stone-50 border border-stone-200 rounded-lg hover:bg-stone-100 text-xs font-semibold cursor-pointer transition-colors"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                Copied!
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4 text-stone-500" />
                Copy Info
              </>
            )}
          </button>
        </div>
      </div>

      {/* High-Fidelity Front-End Rendered Business Card Card Container */}
      <div className="relative overflow-hidden bg-[#FDFCF8] border border-stone-200 rounded-2xl shadow-md cursor-pointer transition-transform hover:scale-[1.01] p-0 aspect-[16/9] w-full max-w-[640px] mx-auto select-none">
        
        {/* SVG clip-path definition for responsive, pixel-perfect S-curve sidebar masking */}
        <svg className="absolute w-0 h-0" width="0" height="0">
          <defs>
            <clipPath id="card-curve-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 0.42,0 C 0.45,0.3202 0.32,0.6761 0.42,1 L 0,1 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Curved Emerald Olive framing motif with clinic chair interior */}
        <div 
          style={{ clipPath: "url(#card-curve-clip)" }}
          className="absolute inset-y-0 left-0 w-full z-10 overflow-hidden pointer-events-none"
        >
          {/* Real Background image of green dental chair room matching user attachment */}
          <img 
            src={dentalChairImg} 
            alt="Yektai Modern Clinic Surgery" 
            className="absolute inset-y-0 left-0 w-[45%] h-full object-cover z-0 filter brightness-[0.42] contrast-[1.1]"
            referrerPolicy="no-referrer"
          />
          {/* Saturated Dark Overlay to ensure strict AAA typography readability */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-[#2D3629]/75 mix-blend-multiply z-0 pointer-events-none" />

          {/* SVG shapes nested for background accent rings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 562">
            <circle cx="150" cy="160" r="120" fill="rgba(255, 255, 255, 0.08)" />
            <circle cx="220" cy="420" r="85" fill="rgba(255, 255, 255, 0.08)" />
          </svg>

          {/* Slogan & Branding Content elements on top of image */}
          <div className="relative z-10 flex flex-col justify-between h-full w-[35%] p-6 text-white text-left pointer-events-auto">


            {/* Center Monogram symbol mirroring canvas exactly */}
            <div className="absolute top-[42%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/40 flex items-center justify-center bg-white p-1.5 shadow-md">
                <img 
                  src={yektaiLogoLeaf} 
                  alt="Yektai Dental Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Slogan details on left panel with full automatic wrapping */}
            <div className="mt-auto">
              <p className="text-[11px] md:text-[12px] font-serif italic text-white/95 leading-normal max-w-[90%] break-words">
                "{t("cardSlogan")}"
              </p>
            </div>
          </div>
        </div>

        {/* Curved sage green line divider stroke on top of the division */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 1000 562" preserveAspectRatio="none">
          <path 
            d="M 420,0 C 450,180 320,380 420,562" 
            fill="none" 
            stroke="#8FA998" 
            strokeWidth="10" 
          />
        </svg>

        {/* Right Content area */}
        <div className="absolute top-0 right-0 bottom-0 w-[58%] pl-[8%] pr-6 py-6 flex flex-col justify-between text-left">
          
          {/* Main Title branding */}
          <div>
            <h1 className="text-3xl font-serif font-semibold text-[#2D3629] tracking-tight leading-none">
              YEKTAI
            </h1>
            <p className="text-[11px] font-sans text-[#8FA998] font-medium tracking-[0.25em] mt-1 leading-none uppercase">
              Dental Clinic
            </p>
            <div className="h-[2px] bg-[#8FA998]/20 mt-3 w-11/12" />
          </div>

          {/* Contacts */}
          <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2 text-[#3A4335]">
              <Mail className="w-4 h-4 text-[#8FA998] shrink-0" />
              <span className="text-xs font-mono select-all text-[#3A4335] leading-none">{contactEmail}</span>
            </div>
            <div className="flex items-center gap-2 text-[#3A4335]">
              <Phone className="w-4 h-4 text-[#8FA998] shrink-0" />
              <span className="text-xs font-mono select-all text-[#3A4335] leading-none">{contactPhone}</span>
            </div>
            <div className="flex items-center gap-2 text-[#3A4335]">
              <MapPin className="w-4 h-4 text-[#8FA998] shrink-0" />
              <span className="text-xs font-sans text-[#3A4335] leading-none">{t("addressShort")}</span>
            </div>
          </div>

          {/* Dental QR area */}
          <div className="flex items-end justify-between mt-auto">
            <div className="text-[9px] text-[#6B7565] font-mono leading-tight">
              Agiou Andreou 124<br />
              Limassol 3036
            </div>
            
            {/* Real Web-Address QR code */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-1 rounded border border-[#8FA998]/30 shadow-sm transition-transform hover:scale-105 duration-200">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(clinicUrl)}`} 
                  alt="Yektai Dental QR"
                  className="w-16 h-16 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[7.5px] font-sans font-bold text-[#8FA998] tracking-wider mt-1 opacity-85 leading-tight select-none">
                {t("scanToBook")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <button
          id="png-btn"
          onClick={handleDownloadPNG}
          disabled={downloading}
          className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3 rounded-xl transition-all border border-stone-200 font-semibold text-sm cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {downloading ? "Generating..." : "Download Photo"}
        </button>

        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg font-semibold text-sm cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          Share Business Card
        </button>
      </div>

      {/* Hidden off-screen Canvas for graphic export */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Premium Multi-Channel Share Modal Overlay */}
      {showShareModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-all animate-fade-in block">
          <div className="bg-[#FDFCF8] border border-stone-200 rounded-2xl max-w-sm w-full p-6 text-left shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-serif font-bold text-[#2D3629] mb-1">
              Share Contact Details
            </h3>
            <p className="text-stone-500 text-xs mb-5 leading-normal">
              Choose an application to quickly forward our digital business card photo or website link to your contacts.
            </p>

            <div className="space-y-2.5">
              {/* Native System App Share */}
              <button
                onClick={handleNativeShare}
                disabled={sharing}
                className="w-full flex items-center gap-3 p-3 text-stone-700 hover:text-emerald-900 bg-white hover:bg-emerald-50/40 border border-stone-200 hover:border-emerald-200 rounded-xl transition-all text-xs font-semibold text-left cursor-pointer shadow-xs select-none"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">{sharing ? "Preparing Image..." : "Share Card Image & Link"}</p>
                  <p className="text-[10px] text-stone-400 font-normal">Send original card with mobile apps & social chats</p>
                </div>
              </button>

              {/* Copy Website Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(clinicUrl);
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                }}
                className="w-full flex items-center gap-3 p-3 text-stone-700 hover:text-emerald-900 bg-white hover:bg-emerald-50/40 border border-stone-200 hover:border-emerald-200 rounded-xl transition-all text-xs font-semibold text-left cursor-pointer shadow-xs select-none"
              >
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                  {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Clipboard className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-semibold text-stone-800">{isCopied ? "Link Copied!" : "Copy Website Link"}</p>
                  <p className="text-[10px] text-stone-400 font-normal">{clinicUrl.replace(/^https?:\/\//, "")}</p>
                </div>
              </button>

              {/* Direct share on WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `Yektai Dental Clinic - Premium dental care in Limassol, Cyprus. Book an appointment online: ${clinicUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareModal(false)}
                className="w-full flex items-center gap-3 p-3 text-stone-700 hover:text-emerald-900 bg-white hover:bg-emerald-50/40 border border-stone-200 hover:border-emerald-200 rounded-xl transition-all text-xs font-semibold text-left cursor-pointer shadow-xs block"
              >
                <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] shrink-0">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Forward on WhatsApp</p>
                  <p className="text-[10px] text-stone-400 font-normal">Send our clinic link in your WhatsApp chat</p>
                </div>
              </a>

              {/* Direct share on Telegram */}
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(clinicUrl)}&text=${encodeURIComponent(
                  "Yektai Dental Clinic - Premium Dental Care in Limassol, Cyprus"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowShareModal(false)}
                className="w-full flex items-center gap-3 p-3 text-stone-700 hover:text-emerald-900 bg-white hover:bg-emerald-50/40 border border-stone-200 hover:border-emerald-200 rounded-xl transition-all text-xs font-semibold text-left cursor-pointer shadow-xs block"
              >
                <div className="w-8 h-8 rounded-full bg-[#E1F5FE] flex items-center justify-center text-[#0288D1] shrink-0">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Post on Telegram</p>
                  <p className="text-[10px] text-stone-400 font-normal">Share on Telegram channels, groups, or saved items</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CSS custom framing classes */}
      <style>{`
        .clip-path-curve {
          clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
        }
        @media (max-width: 480px) {
          #interactive-card .aspect-\\[16\\/9\\] {
            aspect-ratio: auto;
            height: 380px;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

