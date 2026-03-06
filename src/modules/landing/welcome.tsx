import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import landingDesktop  from "@/assets/illustrations/landing_s1.webp";
import landingMobile   from "@/assets/mobile/1-Landing_Principal (1).webp";
import premiosMobile   from "@/assets/mobile/landigns2_mobil.webp";
import productosMobile from "@/assets/mobile/3-Landing_Productos.webp";
import packProductos   from "@/assets/mobile/3-Landing_Productos.webp";
import chayanneBrand   from "@/assets/mobile/4-Landing_Chayanne & Atrevia.webp";
import preparaMaleta   from "@/assets/mobile/prepara tu maleta.webp";
import fotoChayanne    from "@/assets/illustrations/landings2 (2).webp";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&family=Nunito:wght@400;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #ffffff; }

  :root {
    --sky:      #5CC8F0;
    --purple-d: #7B3FA0;
    --purple-m: #9B59C5;
    --yellow:   #F5D800;
    --white:    #FFFFFF;
    --dark:     #1A1A1A;
  }

  .wp-root {
    font-family: 'Nunito', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: #ffffff;
    overflow-x: hidden;
  }

  /* ══ SCROLL REVEAL ══ */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .reveal-left {
    opacity: 0;
    transform: translateX(-48px);
    transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }

  .reveal-right {
    opacity: 0;
    transform: translateX(48px);
    transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  .reveal-scale {
    opacity: 0;
    transform: scale(0.92);
    transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .reveal-scale.visible { opacity: 1; transform: scale(1); }

  .delay-1 { transition-delay: 0.1s; }
  .delay-2 { transition-delay: 0.22s; }
  .delay-3 { transition-delay: 0.34s; }
  .delay-4 { transition-delay: 0.46s; }

  /* ══ S1 — HERO ══ */
  .s1 { width: 100%; overflow: hidden; }
  .s1-inner { position: relative; }

  .s1-img-desktop img,
  .s1-img-mobile img {
    display: block;
    max-width: 100%;
    height: auto;
    animation: heroSlideDown 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  @keyframes heroSlideDown {
    from { opacity: 0; transform: translateY(-32px) scale(1.04); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ══ IMAGE HOVER EFFECTS ══ */
  .img-hover { overflow: hidden; display: block; }
  .img-hover img {
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), filter 0.55s ease;
    will-change: transform;
  }
  .img-hover:hover img { transform: scale(1.035); filter: brightness(1.05); }

  /* ══ S2 — PREMIOS ══ */
  .s2 {
    width: 100%;
    background: linear-gradient(135deg, #583FA0 0%, #8D6BD9 100%);
    overflow: hidden;
  }
  .s2-img-mobile { display: block; }
  .s2-img-mobile img { display: block; max-width: 100%; height: auto; }
  .s2-inner { display: none; }

  /* ══ S3 — PRODUCTOS ══ */
  .s3 { width: 100%; background: #ffffff; }
  .s3-img { display: flex; justify-content: center; }
  .s3-img img { display: block; max-width: 100%; height: auto; }
  .s3-img-mobile        { display: block; }
  .s3-img-desktop-block { display: none; }
  .s3-inner { padding: 8px 24px 20px; }
  .s3-disclaimer { font-size: 13px; color: #555; line-height: 1.6; text-align: left; font-weight: 700; }
  .s3-link { color: #7B3FA0; font-weight: 700; text-decoration: underline; }

  /* ══ S4 — BRAND CIERRE ══ */
  .s4 { width: 100%; background: #9669d8; overflow: hidden; }
  .s4-img-mobile { display: flex; justify-content: center; }
  .s4-img-mobile img { display: block; max-width: 100%; height: auto; }
  .s4-img-desktop { display: none; }

  /* ══ S5 — CTA ══ */
  .s5 {
    width: 100%;
    background: #ffffff;
    padding: 20px 24px 36px;
    display: flex;
    justify-content: center;
  }
  .s5-btn {
    display: inline-flex; align-items: center; justify-content: center;
    background: #6B6B6B; color: var(--white);
    font-family: 'Nunito', sans-serif; font-weight: 900;
    font-size: 12px; letter-spacing: 1.8px; text-transform: uppercase;
    padding: 13px 0; border-radius: 999px; text-decoration: none;
    width: 100%; max-width: 240px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.15);
    transition: background 0.22s, transform 0.15s, box-shadow 0.22s;
    animation: btnPulse 2.8s ease-in-out infinite;
  }
  @keyframes btnPulse {
    0%, 100% { box-shadow: 0 4px 18px rgba(0,0,0,0.15); }
    50%       { box-shadow: 0 6px 28px rgba(123,63,160,0.45); }
  }
  .s5-btn:hover {
    background: var(--purple-d);
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 10px 32px rgba(123,63,160,0.45);
    animation: none;
  }
  .s5-btn:active { transform: scale(0.97); }

  /* ══════════════════════════
     DESKTOP ≥ 768px
  ══════════════════════════ */
  @media (min-width: 768px) {
    .s2-img-mobile { display: none !important; }
    .s2-inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 32px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .s2-top { flex: 0 0 auto; display: flex; align-items: center; }
    .s2-top img { height: auto; max-height: 340px; width: auto; object-fit: contain; }
    .s2-body-col { flex: 1; display: flex; justify-content: center; align-items: center; }
    .s2-body-col img { width: 100%; height: auto; }

    .s3-img-mobile        { display: none !important; }
    .s3-img-desktop-block {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 48px 64px 0;
    }
    .s3-img-desktop-block img { width: 100%; max-width: 1100px; height: auto; }
    .s3-inner { max-width: 1100px; margin: 0 auto; padding: 8px 64px 24px; }
    .s3-disclaimer { font-size: 14px; }

    .s4 { background: rgb(150, 105, 216); }
    .s4-img-mobile  { display: none !important; }
    .s4-img-desktop {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px 64px;
    }
    .s4-img-desktop .s4-img-wrap {
      display: flex; justify-content: center; align-items: center;
      max-width: 1000px; width: 100%;
    }
    .s4-img-desktop img {
      display: block; width: 100%; max-width: 900px; height: auto; object-fit: contain;
    }

    .s5 { padding: 40px 64px 60px; }
    .s5-btn { font-size: 17px; letter-spacing: 2.5px; max-width: 420px; padding: 20px 0; }
  }
`;

/**
 * Hook que detecta si el viewport es desktop (≥768px).
 * Al usar matchMedia en el estado inicial evitamos un flash de imagen incorrecta.
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

export function WelcomePage() {
  const revealRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className="wp-root" ref={revealRef}>

        {/* ── 1. HERO ── */}
        <section className="s1">
          <div className="s1-inner">
            {/*
              Renderizado condicional: solo se monta (y descarga) la imagen
              que corresponde al viewport actual. Nunca se carga la imagen
              desktop en móvil ni viceversa.
            */}
            {isDesktop ? (
              <div className="s1-img-desktop img-hover">
                <img
                  src={landingDesktop}
                  alt="Destino Chayanne desktop"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : (
              <div className="s1-img-mobile img-hover">
                <img
                  src={landingMobile}
                  alt="Destino Chayanne mobile"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </section>

        {/* ── 2. PREMIOS ── */}
        <section className="s2">
          <div className="s2-img-mobile reveal img-hover">
            <img src={premiosMobile} alt="Premios mobile" loading="lazy" decoding="async" />
          </div>
          <div className="s2-inner">
            <div className="s2-top reveal-left img-hover">
              <img src={fotoChayanne} alt="Chayanne participa" loading="lazy" decoding="async" />
            </div>
          </div>
        </section>

        {/* ── 3. PRODUCTOS ── */}
        <section className="s3">
          <div className="s3-img s3-img-mobile reveal-scale img-hover">
            <img src={productosMobile} alt="Productos Atrevia mobile" loading="lazy" decoding="async" />
          </div>
          <div className="s3-img s3-img-desktop-block reveal-scale img-hover">
            <img src={packProductos} alt="Productos Atrevia desktop" loading="lazy" decoding="async" />
          </div>
          <div className="s3-inner reveal delay-2">
            <p className="s3-disclaimer">
              *No incluye IGV. Ver{" "}
              <Link to="/portal/terminos-condiciones" className="s3-link">
                Términos y Condiciones
              </Link>
              .
              <br />
              Las entradas se sortearán en 2 fechas: Primer sorteo 20 de marzo
              y segundo sorteo 07 de mayo del 2026.
            </p>
          </div>
        </section>

        {/* ── 4. BRAND CIERRE ── */}
        <section className="s4">
          <div className="s4-img-mobile reveal img-hover">
            <img src={chayanneBrand} alt="Chayanne y Atrevia" loading="lazy" decoding="async" />
          </div>
          <div className="s4-img-desktop reveal-scale">
            <div className="s4-img-wrap img-hover">
              <img src={preparaMaleta} alt="Prepara tu maleta" loading="lazy" decoding="async" />
            </div>
          </div>
        </section>

        {/* ── 5. CTA ── */}
        <section className="s5">
          <Link to="/registrarme" className="s5-btn reveal delay-1">
            Inscríbete aquí
          </Link>
        </section>

      </div>
    </>
  );
}