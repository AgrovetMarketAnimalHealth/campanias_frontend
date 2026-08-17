// welcome.tsx
import { useEffect, useRef } from "react";
import desk1 from "@/assets/destokp/1-Seccion.webp";
import mob1 from "@/assets/mobile/1-Seccion.webp";
import desk3 from "@/assets/destokp/3-Seccion.webp";
import mob3 from "@/assets/mobile/3-Seccion.webp";
import desk4 from "@/assets/destokp/4-Seccion.webp";
import mob4 from "@/assets/mobile/4-Seccion.webp";
import desk5 from "@/assets/destokp/5-Seccion.webp";
import mob5 from "@/assets/mobile/5-Seccion.webp";
import desk6 from "@/assets/destokp/6-Seccion.webp";
import mob6 from "@/assets/mobile/6-Seccion.webp";
import { UTMLink as Link } from "@/components/UTMLink";

// ── WhatsApp CTA ──
const WHATSAPP_NUMERO = "51903069021";
const WHATSAPP_MENSAJE =
  '¡Hola! Deseo registrar mis facturas de Atrevia para participar en el sorteo "Vive la experiencia Chayanne".';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  WHATSAPP_MENSAJE
)}`;

function useScrollReveal(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("js-ready");
    const markVisible = (el: Element) => el.classList.add("visible");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    const targets = root.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) markVisible(el);
      else observer.observe(el);
    });
    return () => observer.disconnect();
  }, [rootRef]);
}

function EstilosCtaLlamativo() {
  return (
    <style>{`
      @media (max-width: 1023px) {
        .formulario-integrado {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
      }
    `}</style>
  );
}

/** Recuadro único con título + botón de WhatsApp (reemplaza formulario/bienvenida) */
function CuadroWhatsapp({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={compact ? "text-center" : "text-center bg-white rounded-2xl shadow-xl"}
      style={
        compact
          ? undefined
          : {
              padding: "clamp(12px, 2vw, 32px)",
              width: "clamp(220px, 24vw, 420px)",
            }
      }
    >
      <h2
        className={`font-black text-gray-800 mb-4 leading-snug ${
          compact ? "text-lg" : ""
        }`}
        style={compact ? undefined : { fontSize: "clamp(14px, 1.4vw, 24px)" }}
      >
        ¡Vive la experiencia Chayanne!
      </h2>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center w-full rounded-full font-black uppercase transition-transform duration-200 hover:-translate-y-1 active:scale-[0.97]"
        style={{
          letterSpacing: "0.05em",
          backgroundColor: "rgb(254,238,0)",
          color: "rgb(32,26,21)",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.18)",
          maxWidth: compact ? "360px" : "clamp(180px, 19vw, 380px)",
          padding: compact ? "16px 24px" : "clamp(8px, 1.2vw, 16px) clamp(16px, 2vw, 24px)",
          fontSize: compact ? "14px" : "clamp(11px, 1.1vw, 18px)",
        }}
      >
        Registra tus facturas aquí
      </a>
    </div>
  );
}

/** Botón CTA final (misma acción: WhatsApp) */
function CtaBtnAmarillo() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center w-full max-w-[360px] md:max-w-[420px] px-6 py-4 md:py-5 rounded-full font-black uppercase text-[14px] md:text-[18px] transition-transform duration-200 hover:-translate-y-1 active:scale-[0.97]"
      style={{
        letterSpacing: "0.05em",
        backgroundColor: "rgb(254,238,0)",
        color: "rgb(32,26,21)",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.18)",
      }}
    >
      Registra tus facturas aquí
    </a>
  );
}

function InstagramEmbedChayanne() {
  useEffect(() => {
    const processEmbed = () => {
      // @ts-ignore
      if (window.instgrm) window.instgrm.Embeds.process();
    };

    const existing = document.getElementById("instagram-embed-script");
    if (existing) {
      processEmbed();
    } else {
      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.onload = processEmbed;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full flex justify-center px-4">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/DZsfaphP1Qj/"
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "12px",
          margin: 0,
          maxWidth: "400px",
          minWidth: "280px",
          width: "100%",
          padding: 0,
        }}
      >
        <a href="https://www.instagram.com/p/DZsfaphP1Qj/" target="_blank" rel="noreferrer">
          Ver publicación en Instagram
        </a>
      </blockquote>
    </div>
  );
}

export function WelcomePage() {
  const revealRef = useRef<HTMLDivElement | null>(null);
  useScrollReveal(revealRef);

  return (
    <div
      ref={revealRef}
      className="font-nunito flex flex-col items-center w-full bg-white overflow-x-hidden"
    >
      <EstilosCtaLlamativo />

      {/* ── 1. HERO con recuadro flotante ── */}
      <section id="seccion1" className="reveal w-full bg-white animate-hero-slide-down">
        {/* Desktop: imagen con su proporción real + recuadro flotando encima */}
        <div className="relative hidden md:block w-full overflow-hidden">
        <div className="w-full" style={{ paddingBottom: "41.67%" }} />
        <img src={desk1} alt="" className="absolute inset-0 w-full h-full object-cover" />

        <div className="absolute inset-0 flex items-center justify-end pr-[3vw]">
          <CuadroWhatsapp />
        </div>
      </div>

        {/* Mobile: solo la imagen, sin nada encima */}
        <div className="relative block md:hidden w-full overflow-hidden" style={{ paddingBottom: "73.80%" }}>
          <img src={mob1} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      {/* ── 2. RECUADRO (mobile, debajo del hero) ── */}
      <section id="registro" className="reveal w-full block md:hidden">
        <div className="flex justify-center px-6 py-6">
          <CuadroWhatsapp compact />
        </div>
      </section>

      {/* ── ESPACIO BLANCO ── */}
      <section className="w-full bg-white h-1 md:h-2" />

      {/* SECCIÓN 3 - FONDO MORADO */}
      <section className="w-full bg-[linear-gradient(135deg,rgb(88,63,160)_0%,rgb(128,95,199)_50%,rgb(88,63,160)_100%)]">
        <div className="reveal-scale w-full">
          <div className="relative hidden md:block w-full overflow-hidden" style={{ paddingBottom: "28%" }}>
            <img src={desk3} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
          <div className="relative block md:hidden w-full overflow-hidden" style={{ paddingBottom: "48%" }}>
            <img src={mob3} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 4 - IMAGEN CON TÉRMINOS */}
      <section className="w-full bg-white pt-4 pb-2 md:pt-6 md:pb-3">
        <div className="reveal w-full">
          <div className="relative hidden md:block w-full overflow-hidden mb-4" style={{ paddingBottom: "27%" }}>
            <img src={desk4} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
          <div className="relative block md:hidden w-full overflow-hidden mb-2" style={{ paddingBottom: "45%" }}>
            <img src={mob4} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        </div>
        <div className="reveal delay-[0.22s] px-6 pt-1 pb-3 md:max-w-[1100px] md:mx-auto md:px-16 md:pb-4">
          <p className="text-[13px] md:text-[14px] text-[#555] leading-relaxed text-left">
            *No incluye IGV. Ver{" "}
            <Link to="/portal/terminos-condiciones" className="text-violet-500 font-bold underline">
              Términos y Condiciones
            </Link>
            . Las entradas se sortearán en 2 fechas: Primer sorteo (2 Ganadores) el 13 de octubre y segundo sorteo (3 Ganadores) el 19 de noviembre de 2026
          </p>
        </div>
      </section>

      {/* SECCIÓN 5 - FONDO GRIS */}
      <section className="w-full bg-[rgb(236,238,240)] pt-4 pb-2 md:pt-6 md:pb-3">
        <div className="reveal w-full">
          <div className="relative hidden md:block w-full overflow-hidden" style={{ paddingBottom: "14%" }}>
            <img src={desk5} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
          <div className="relative block md:hidden w-full overflow-hidden" style={{ paddingBottom: "23%" }}>
            <img src={mob5} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        </div>
      </section>

      {/* SECCIÓN 6 - FONDO MORADO OSCURO */}
      <section className="w-full bg-[linear-gradient(135deg,rgb(88,63,160)_0%,rgb(125,94,198)_50%,rgb(138,105,212)_100%)]">
        <div className="reveal w-full">
          <div className="relative hidden md:block w-full overflow-hidden" style={{ paddingBottom: "12%" }}>
            <img src={desk6} alt="" className="absolute inset-0 w-full h-full object-cover scale-75" />
          </div>
          <div className="relative block md:hidden w-full overflow-hidden" style={{ paddingBottom: "23%" }}>
            <img src={mob6} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* SECCIÓN FINAL - CTA */}
      <section className="w-full bg-white">
        <div className="reveal flex flex-col items-center gap-3 px-6 py-8 md:py-12">
          <p className="text-center text-[22px] font-black uppercase md:text-[32px]">
            ¡Así celebraron nuestros últimos <span className="text-[rgb(138,105,212)]">ganadores!</span>
          </p>
          <p className="text-center text-[22px] font-black uppercase md:text-[32px]">
            Participa y el próximo podrías ser tú.
          </p>
          <InstagramEmbedChayanne />
          <CtaBtnAmarillo />
        </div>
      </section>
    </div>
  );
}