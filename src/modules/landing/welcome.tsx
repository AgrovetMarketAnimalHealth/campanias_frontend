import { UTMLink as Link } from "@/components/UTMLink"
import { useEffect, useRef } from "react";
import { useAuthDestino } from "@/modules/perfil/hooks/useAuthDestino";
import { SignupTabs } from "@/modules/auth/components/signup-tabs";
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

// TODO: ajusta esto a la ruta real donde el cliente sube sus facturas
const RUTA_SUBIR_FACTURAS = "/portal/dashboard";

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

function scrollToRegistro() {
  document.getElementById("registro")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Animaciones "llamativas" para los CTA cuando el cliente ya está autenticado
function EstilosCtaLlamativo() {
  return (
    <style>{`
      @keyframes ctaPulseAmarillo {
        0%, 100% { transform: scale(1); box-shadow: 2px 2px 10px rgba(0,0,0,0.18), 0 0 0 0 rgba(254,238,0,0.7); }
        50% { transform: scale(1.04); box-shadow: 2px 2px 10px rgba(0,0,0,0.18), 0 0 20px 6px rgba(254,238,0,0.55); }
      }
      @keyframes ctaPulseVioleta {
        0%, 100% { transform: scale(1); box-shadow: 2px 2px 12px rgba(0,0,0,0.25), 0 0 0 0 rgba(141,99,207,0.6); }
        50% { transform: scale(1.04); box-shadow: 2px 2px 12px rgba(0,0,0,0.25), 0 0 20px 6px rgba(141,99,207,0.45); }
      }
      .cta-llamativo-amarillo { animation: ctaPulseAmarillo 1.8s ease-in-out infinite; }
      .cta-llamativo-violeta { animation: ctaPulseVioleta 1.8s ease-in-out infinite; }
    `}</style>
  );
}

function CtaBtnAmarillo() {
  const { estado, cliente } = useAuthDestino();
  const cargando = estado === "cargando";
  const autenticado = !!cliente;

  const baseClass =
    "inline-flex items-center justify-center w-full max-w-[180px] md:max-w-[280px] px-0 py-[13px] md:py-5 rounded-full font-black uppercase text-[14px] md:text-[20px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97]";

  const baseStyle: React.CSSProperties = {
    letterSpacing: "0.05em",
    backgroundColor: cargando ? "rgb(200,200,200)" : "rgb(254,238,0)",
    color: "rgb(32,26,21)",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.18)",
  };

  if (cargando) {
    return (
      <button type="button" disabled className={baseClass} style={{ ...baseStyle, pointerEvents: "none" }}>
        Cargando...
      </button>
    );
  }

  // Autenticado: ya no tiene sentido invitarlo a inscribirse, lo mandamos a subir facturas
  if (autenticado) {
    return (
      <Link
        to={RUTA_SUBIR_FACTURAS}
        className={`${baseClass} cta-llamativo-amarillo`}
        style={baseStyle}
      >
        Sube tus facturas
      </Link>
    );
  }

  // No autenticado: hace scroll a la sección 2 (formulario de registro)
  return (
    <button type="button" onClick={scrollToRegistro} className={baseClass} style={baseStyle}>
      Inscríbete aquí
    </button>
  );
}

function CtaBtnBlanco() {
  const { estado, cliente } = useAuthDestino();
  const cargando = estado === "cargando";
  const autenticado = !!cliente;

  const baseClass =
    "inline-flex items-center justify-center w-auto max-w-[280px] md:max-w-[460px] px-5 py-[10px] md:py-5 rounded-full font-black uppercase text-[11px] md:text-[20px] transition-all duration-200 hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97]";

  const baseStyle: React.CSSProperties = {
    letterSpacing: "0.05em",
    backgroundColor: "#fff",
    color: "rgb(141, 99, 207)",
    boxShadow: "2px 2px 12px rgba(0,0,0,0.25)",
  };

  if (cargando) {
    return (
      <button type="button" disabled className={baseClass} style={{ ...baseStyle, pointerEvents: "none" }}>
        Cargando...
      </button>
    );
  }

  if (autenticado) {
    return (
      <Link
        to={RUTA_SUBIR_FACTURAS}
        className={`${baseClass} cta-llamativo-violeta`}
        style={baseStyle}
      >
        ¡Sube tus facturas aquí!
      </Link>
    );
  }

  return (
    <button type="button" onClick={scrollToRegistro} className={baseClass} style={baseStyle}>
      ¡Quiero conocer a Chayanne!
    </button>
  );
}

export function WelcomePage() {
  const revealRef = useRef<HTMLDivElement | null>(null);
  useScrollReveal(revealRef);
  const { estado, cliente } = useAuthDestino();
  const cargando = estado === "cargando";
  const autenticado = !!cliente;

  return (
    <div
      ref={revealRef}
      className="font-nunito flex flex-col items-center w-full bg-white overflow-x-hidden"
    >
      <EstilosCtaLlamativo />

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

      {/* ── 2. FORMULARIO DE REGISTRO (oculto si ya está autenticado o mientras carga) ── */}
      {!cargando && !autenticado && (
        <section id="registro" className="reveal w-full">
          <SignupTabs />
        </section>
      )}

      {/* ── 3. PREMIOS ── */}
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

      {/* ── 4. PRODUCTOS ── */}
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

      {/* ── 5. PASOS ── */}
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

      {/* ── 6. INTERMEDIO ── */}
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

      {/* ── 7. BRAND CIERRE ── */}
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

      {/* ── 8. CTA FINAL ── */}
      <section className="w-full bg-white">
        <div className="reveal flex flex-col items-center gap-3 px-6 py-8 md:py-12">
          <p className="font-black text-[22px] md:text-[32px] text-center uppercase">
            {autenticado ? (
              <>¡No olvides <span className="font-black text-[rgb(138,105,212)]">subir tus facturas</span>!</>
            ) : (
              <>¡Quiero conocer a{" "}<span className="font-black text-[rgb(138,105,212)]">Chayanne!</span></>
            )}
          </p>
          <CtaBtnAmarillo />
        </div>
      </section>

    </div>
  );
}