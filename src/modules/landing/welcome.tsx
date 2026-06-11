import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useAuthDestino } from "@/modules/perfil/hooks/useAuthDestino";

import desk1 from "@/assets/destokp/1-Seccion.webp";
import mob1 from "@/assets/mobile/1-Seccion.webp";
import desk2 from "@/assets/destokp/2-Seccion.webp";
import mob2 from "@/assets/mobile/2-Seccion.webp";
import desk3 from "@/assets/destokp/3-Seccion.webp";
import mob3 from "@/assets/mobile/3-Seccion.webp";
import desk4 from "@/assets/destokp/4-Seccion.webp";
import mob4 from "@/assets/mobile/4-Seccion.webp";
import desk5 from "@/assets/destokp/5-Seccion.webp";
import mob5 from "@/assets/mobile/5-Seccion.webp";
import desk6 from "@/assets/destokp/6-Seccion.webp";
import mob6 from "@/assets/mobile/6-Seccion.webp";

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

function CtaBtnAmarillo() {
  const { estado, destino } = useAuthDestino();
  const cargando = estado === "cargando";
  return (
    <Link
      to={destino}
      aria-busy={cargando}
      tabIndex={cargando ? -1 : 0}
      className="inline-flex items-center justify-center w-full max-w-[180px] md:max-w-[280px] px-0 py-[13px] md:py-5 rounded-full font-black uppercase text-[14px] md:text-[20px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97]"
      style={{
        letterSpacing: "0.05em",
        backgroundColor: cargando ? "rgb(200,200,200)" : "rgb(254,238,0)",
        color: "rgb(32,26,21)",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.18)",
      }}
    >
      {cargando ? "Cargando..." : "Inscríbete aquí"}
    </Link>
  );
}

function CtaBtnBlanco() {
  const { estado, destino } = useAuthDestino();
  const cargando = estado === "cargando";

  return (
    <Link
      to={destino}
      aria-busy={cargando}
      tabIndex={cargando ? -1 : 0}
      className="inline-flex items-center justify-center w-auto max-w-[280px] md:max-w-[460px] px-5 py-[10px] md:py-5 rounded-full font-black uppercase text-[11px] md:text-[20px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97]"
      style={{
        letterSpacing: "0.05em",
        backgroundColor: "#fff",
        color: "rgb(141, 99, 207)",
        boxShadow: "2px 2px 12px rgba(0,0,0,0.25)",
      }}
    >
      ¡Quiero conocer a Chayanne!
    </Link>
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
      {/* ── 1. HERO ── */}
      <section className="reveal w-full bg-white animate-hero-slide-down">
        <div
          className="relative hidden md:block w-full overflow-hidden"
          style={{ paddingBottom: "41.67%" }}
        >
          <img src={desk1} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div
          className="relative block md:hidden w-full overflow-hidden"
          style={{ paddingBottom: "73.80%" }}
        >
          <img src={mob1} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </section>

      {/* ── 2. PREMIOS ── */}
      <section className="reveal w-full bg-[rgb(137,208,242)]">
        <div className="relative hidden md:block w-full">
          <img src={desk2} alt="" className="w-full h-auto block" />
          <div className="absolute inset-0 flex justify-center items-center">
            <CtaBtnBlanco />
          </div>
        </div>
        <div className="relative block md:hidden w-full">
          <img src={mob2} alt="" className="w-full h-auto block" />
          <div className="absolute inset-0 flex justify-center items-center">
            <CtaBtnBlanco />
          </div>
        </div>
      </section>

      {/* ── 3. PRODUCTOS ── */}
      <section className="w-full bg-[linear-gradient(135deg,rgb(88,63,160)_0%,rgb(128,95,199)_50%,rgb(88,63,160)_100%)]">
        <div className="reveal-scale w-full">
          <div
            className="relative hidden md:block w-full overflow-hidden"
            style={{ paddingBottom: "28%" }}
          >
            <img src={desk3} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
          <div
            className="relative block md:hidden w-full overflow-hidden"
            style={{ paddingBottom: "48%" }}
          >
            <img src={mob3} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        </div>
      </section>

      {/* ── 4. PASOS ── */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="reveal w-full">
          <div
            className="relative hidden md:block w-full overflow-hidden mb-16"
            style={{ paddingBottom: "27%" }}
          >
            <img src={desk4} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
          <div
            className="relative block md:hidden w-full overflow-hidden mb-6"
            style={{ paddingBottom: "45%" }}
          >
            <img
              src={mob4}
              alt=""
              className="absolute inset-0 w-full h-full object-contain translate-y-4"
            />
          </div>
        </div>
        <div className="reveal delay-[0.22s] px-6 pt-2 pb-5 md:max-w-[1100px] md:mx-auto md:px-16 md:pb-6">
          <p className="text-[13px] md:text-[14px] text-[#555] leading-relaxed text-left">
            *No incluye IGV. Ver{" "}
            <Link to="/portal/terminos-condiciones" className="text-violet-500 font-bold underline">Términos y Condiciones</Link>.
            Las entradas se sortearán en 2 fechas: Primer sorteo (2 Ganadores) el 8 de setiembre
            y segundo sorteo (3 Ganadores) el 12 de noviembre de 2026.
          </p>
        </div>
      </section>

      {/* ── 5. INTERMEDIO ── */}
      <section className="w-full bg-[rgb(236,238,240)] py-8 md:py-12">
        <div className="reveal w-full">
          <div
            className="relative hidden md:block w-full overflow-hidden"
            style={{ paddingBottom: "14%" }}
          >
            <img src={desk5} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
          <div
            className="relative block md:hidden w-full overflow-hidden"
            style={{ paddingBottom: "25%" }}
          >
            <img src={mob5} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        </div>
      </section>

      {/* ── 6. BRAND CIERRE ── */}
      <section className="w-full bg-[linear-gradient(135deg,rgb(88,63,160)_0%,rgb(125,94,198)_50%,rgb(138,105,212)_100%)]">
        <div className="reveal w-full">
          <div
            className="relative hidden md:block w-full overflow-hidden"
            style={{ paddingBottom: "12%" }}
          >
            <img
              src={desk6}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-75"
            />
          </div>
          <div
            className="relative block md:hidden w-full overflow-hidden"
            style={{ paddingBottom: "25%" }}
          >
            <img src={mob6} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* ── 7. CTA FINAL ── */}
      <section className="w-full bg-white">
        <div className="reveal flex flex-col items-center gap-3 px-6 py-8 md:py-12">
          <p className="font-black text-[22px] md:text-[32px] text-center uppercase">
            ¡Quiero conocer a{" "}
            <span className="font-black text-[rgb(138,105,212)]">Chayanne!</span>
          </p>
          <CtaBtnAmarillo />
        </div>
      </section>
    </div>
  );
}