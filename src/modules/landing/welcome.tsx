import { Link } from "@tanstack/react-router";
import landingDesktop  from "@/assets/mobile/1-Landing_principa_desto.jpg";
import landingMobile   from "@/assets/mobile/1-Landing_Principal.webp";
import premiosMobile   from "@/assets/mobile/2-Landing_Premios.webp";
import productosMobile from "@/assets/mobile/3-Landing_Productos.webp";
import chayanneBrand   from "@/assets/mobile/4-Landing_Chayanne & Atrevia.webp";

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

  /* ══ S1 — HERO ══ */
  .s1 { width: 100%; overflow: hidden; }
  .s1-inner { position: relative; }

  .s1-img-desktop { display: none; }
  .s1-img-desktop img { display: block; max-width: 100%; height: auto; }

  .s1-img-mobile { display: block; }
  .s1-img-mobile img { display: block; max-width: 100%; height: auto; }

  /* ══ S2 — PREMIOS ══ */
  .s2 {
    width: 100%;
    background: linear-gradient(135deg, var(--purple-d) 0%, var(--purple-m) 100%);
    overflow: hidden;
  }

  .s2-img-mobile { display: block; }
  .s2-img-mobile img { display: block; max-width: 100%; height: auto; }

  /* s2-inner solo visible en desktop */
  .s2-inner {
    display: none;
    flex-direction: column;
    gap: 14px;
    padding: 28px 24px 32px;
    position: relative;
    z-index: 1;
  }
  .s2-top { display: flex; align-items: flex-start; gap: 16px; }
  .s2-photo {
    flex-shrink: 0;
    width: 88px; height: 88px;
    border-radius: 12px;
    background: rgba(255,255,255,0.12);
    border: 2px dashed rgba(255,255,255,0.28);
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
  }
  .s2-copy { font-size: 14px; color: rgba(255,255,255,0.92); font-weight: 600; line-height: 1.6; }
  .s2-copy strong { color: var(--white); font-weight: 900; font-size: 15px; }
  .s2-date { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 900; color: var(--yellow); }
  .s2-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--yellow); color: var(--dark);
    font-size: 13px; font-weight: 900;
    padding: 10px 22px; border-radius: 999px; width: fit-content;
  }

  /* ══ S3 — PRODUCTOS ══ */
  .s3 { width: 100%; background: #ffffff; }

  .s3-img { display: flex; justify-content: center; }
  .s3-img img { display: block; max-width: 100%; height: auto; }

  .s3-inner { padding: 12px 24px 28px; }
  .s3-disclaimer { font-size: 10px; color: #888; line-height: 1.6; text-align: left; }

  /* ══ S4 — BRAND CIERRE ══ */
  .s4 { width: 100%; background: #9669d8; overflow: hidden; }
  .s4-img { display: flex; justify-content: center; }
  .s4-img img { display: block; max-width: 100%; height: auto; }

  /* ══ S5 — CTA ══ */
  .s5 {
    width: 100%;
    background: #ffffff;
    padding: 20px 24px 36px;
    display: flex; justify-content: center;
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
  }
  .s5-btn:hover { background: var(--purple-d); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(123,63,160,0.38); }
  .s5-btn:active { transform: scale(0.97); }

  /* ══════════════════════════
     DESKTOP ≥ 768px
  ══════════════════════════ */
  @media (min-width: 768px) {

    /* S1 */
    .s1-img-mobile  { display: none !important; }
    .s1-img-desktop { display: block; }

    /* S2 */
    .s2-img-mobile { display: none !important; }
    .s2-inner {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 40px;
      max-width: 1200px;
      margin: 0 auto;
      padding: 48px 64px;
    }
    .s2-top { flex: 0 0 auto; flex-direction: column; align-items: center; gap: 12px; }
    .s2-photo { width: 120px; height: 120px; font-size: 40px; border-radius: 16px; }
    .s2-body-col { flex: 1; display: flex; flex-direction: column; gap: 16px; }
    .s2-copy { font-size: 17px; }
    .s2-copy strong { font-size: 18px; }
    .s2-date { font-size: 24px; }
    .s2-pill { font-size: 15px; padding: 12px 28px; }

    /* S3 — imagen achicada en desktop */
    .s3-img img {
      max-width: none;
      width: auto;
      max-height: 420px; /* ajusta a tu gusto */
      height: auto;
    }
    .s3-inner { max-width: 1200px; margin: 0 auto; padding: 12px 64px 40px; }
    .s3-disclaimer { font-size: 11px; }

    /* S4 — imagen achicada en desktop */
    .s4-img img {
      max-width: none;
      width: auto;
      max-height: 340px; /* ajusta a tu gusto */
      height: auto;
    }

    /* S5 */
    .s5 { padding: 40px 64px 60px; }
    .s5-btn { font-size: 17px; letter-spacing: 2.5px; max-width: 420px; padding: 20px 0; }
  }
`;

export function WelcomePage() {
  return (
    <>
      <style>{styles}</style>

      <div className="wp-root">

        {/* ── 1. HERO ── */}
        <section className="s1">
          <div className="s1-inner">
            <div className="s1-img-desktop">
              <img src={landingDesktop} alt="Destino Chayanne desktop" />
            </div>
            <div className="s1-img-mobile">
              <img src={landingMobile} alt="Destino Chayanne mobile" />
            </div>
          </div>
        </section>

        {/* ── 2. PREMIOS ── */}
        <section className="s2">
          <div className="s2-img-mobile">
            <img src={premiosMobile} alt="Premios mobile" />
          </div>
          <div className="s2-inner">
            <div className="s2-top">
              <div className="s2-photo">🐶</div>
            </div>
            <div className="s2-body-col">
              <p className="s2-copy">
                Participa por 1 entrada{" "}
                <strong>MEET &amp; GREET</strong>{" "}
                para el concierto de{" "}
                <strong>CHAYANNE</strong>
              </p>
              <div className="s2-date">
                el 22 DE MAYO EN COSTA RICA <span>🇨🇷</span>
              </div>
              <div className="s2-pill">
                El premio incluye pasaje de <strong>ida y vuelta</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. PRODUCTOS ── */}
        <section className="s3">
          <div className="s3-img">
            <img src={productosMobile} alt="Productos Atrevia" />
          </div>
          <div className="s3-inner">
            <p className="s3-disclaimer">
              *No incluye IGV. Ver Términos y Condiciones.
              <br />
              Las entradas se sortearán en 2 fechas: Primer sorteo 20 de marzo
              y segundo sorteo 07 de mayo del 2026.
            </p>
          </div>
        </section>

        {/* ── 4. BRAND CIERRE ── */}
        <section className="s4">
          <div className="s4-img">
            <img src={chayanneBrand} alt="Chayanne y Atrevia" />
          </div>
        </section>

        {/* ── 5. CTA ── */}
        <section className="s5">
          <Link to="/registrarme" className="s5-btn">
            Inscríbete aquí
          </Link>
        </section>

      </div>
    </>
  );
}