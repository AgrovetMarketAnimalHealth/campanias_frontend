import { Separator } from "@/components/ui/separator";

export function TerminosCondicionesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Encabezado con diseño minimalista */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-light tracking-tight mb-2 text-foreground">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-muted-foreground/80 font-light">
          Sorteo "Atrevia, Destino Chayanne" — San Luis, 17 de febrero 2026
        </p>
      </div>

      <Separator className="mb-10 opacity-50" />

      {/* Información general - diseño más limpio */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Información General
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="text-muted-foreground/70 min-w-[120px]">Campaña:</span>
            <span className="text-foreground font-light">Atrevia, Destino Chayanne</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="text-muted-foreground/70 min-w-[120px]">Ámbito:</span>
            <span className="text-foreground font-light">Nacional (Perú)</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="text-muted-foreground/70 min-w-[120px]">Fecha del concierto:</span>
            <span className="text-foreground font-light">22 de mayo 2026, 7:00 p.m. — San José, Costa Rica</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="text-muted-foreground/70 min-w-[120px]">Vigencia:</span>
            <span className="text-foreground font-medium">19 de febrero al 28 de abril de 2026</span>
          </div>
        </div>
      </section>

      <Separator className="mb-10 opacity-50" />

      {/* Premio - diseño más limpio */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Detalle del Premio
        </h2>
        <p className="text-sm text-muted-foreground mb-6 font-light leading-relaxed">
          Se sortearán <span className="text-foreground font-medium">5 entradas al concierto de Costa Rica</span>, 
          cada una incluye Meet & Greet con Chayanne.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-foreground">El premio incluye:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "01 entrada al concierto + Meet & Greet con Chayanne — 22 de mayo 2026, Costa Rica",
                "01 pasaje aéreo ida y vuelta Lima – San José – Lima",
                "Hospedaje por 2 noches",
                "Traslados aeropuerto / hotel / aeropuerto en Costa Rica",
                "Seguro de viaje e impuesto interportuario (de aplicar)"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 font-light">
                  <span className="text-foreground/40 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3 text-foreground">El premio no incluye:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Alimentación ni room service",
                "Traslados adicionales no indicados en estas bases",
                "Gastos personales, propinas ni trámites documentarios del ganador"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 font-light">
                  <span className="text-foreground/40 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Separator className="mb-10 opacity-50" />

      {/* Sorteos */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Fechas de Sorteos
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:gap-6 p-4 bg-muted/30 rounded-lg">
            <span className="text-foreground font-medium min-w-[180px]">1er Sorteo — 17 de marzo 2026</span>
            <span className="text-muted-foreground font-light">2 entradas + Meet & Greet</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-6 p-4 bg-muted/30 rounded-lg">
            <span className="text-foreground font-medium min-w-[180px]">2do Sorteo — 06 de mayo 2026</span>
            <span className="text-muted-foreground font-light">3 entradas + Meet & Greet</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4 font-light leading-relaxed">
          El cierre de inscripciones se realiza <span className="text-foreground">el día hábil anterior a cada sorteo, hasta las 12:00 p.m.</span> 
          Los sorteos se celebran ante Notario Público y se publican en los canales oficiales de la empresa.
        </p>
      </section>

      <Separator className="mb-10 opacity-50" />

      {/* Mecánica */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Mecánica de Participación
        </h2>
        <p className="text-sm text-muted-foreground mb-6 font-light leading-relaxed">
          Dirigido exclusivamente a <span className="text-foreground">médicos veterinarios, clínicas veterinarias y Pet Shops</span>. 
          Por cada <span className="text-foreground">S/ 1,000 (mil soles)</span> en compras de productos Atrevia se acumula 1 o 2 opciones.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { producto: "Atrevia 360", opciones: 2 },
            { producto: "Atrevia VersaGel", opciones: 2 },
            { producto: "Atrevia 360 Spot On", opciones: 2 },
            { producto: "Atrevia One", opciones: 1 },
            { producto: "Atrevia XR", opciones: 1 },
            { producto: "Atrevia Trio Cats", opciones: 1 }
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg text-sm">
              <span className="text-muted-foreground font-light">{item.producto}</span>
              <span className="text-foreground font-medium">{item.opciones} opción{item.opciones > 1 ? 'es' : ''}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Proceso de registro:</h3>
          <p className="text-sm text-muted-foreground font-light">
            Inscríbete a través de cualquiera de estos canales:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 border rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">WhatsApp</span>
              <span className="text-foreground font-medium">908 814 845</span>
            </div>
            <div className="flex-1 p-4 border rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">Web</span>
              <span className="text-foreground font-medium break-all">https://atrevia.vet/promo-concierto</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-light mt-4 leading-relaxed">
            En un plazo máximo de <span className="text-foreground">2 días hábiles</span> recibirás una notificación confirmando tus opciones acumuladas. 
            Las compras deben ser en una sola factura; no se aceptan acumulaciones fraccionadas.
          </p>
        </div>
      </section>

      <Separator className="mb-10 opacity-50" />

      {/* Condiciones - diseño más legible */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Condiciones y Restricciones
        </h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          {[
            "No pueden participar distribuidores de Agrovet Market S.A. ni personas jurídicas registradas como tal.",
            "El premio es intransferible y no puede canjearse por dinero en efectivo, otros bienes ni servicios.",
            "De no poder contactar al ganador en 3 días hábiles, el premio quedará en custodia permanente de Agrovet Market S.A.",
            "El ganador deberá firmar una Declaración Jurada de recepción del premio y una autorización de uso de imagen.",
            "Agrovet Market S.A. podrá publicar imágenes y/o vídeos de los ganadores en sus canales oficiales.",
            "Es responsabilidad exclusiva del ganador contar con pasaporte vigente y documentos requeridos.",
            "La empresa no asume responsabilidad por cancelaciones, reprogramaciones o decisiones migratorias.",
            "Los vuelos podrán tener escalas. La aerolínea, hotel y categoría serán elegidos por Agrovet Market S.A.",
            "Agrovet Market S.A. asumirá el pago de los impuestos de ley aplicables al premio (IGV e ITF).",
            "La inscripción implica la aceptación de estas bases y condiciones.",
            "Agrovet Market S.A. se reserva el derecho de modificar o suspender la campaña."
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3 font-light leading-relaxed">
              <span className="text-foreground/30 mt-1 text-xs">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="mb-10 opacity-50" />

      {/* Contacto */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Contacto
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground font-light">
            Para más información sobre el sorteo "Atrevia, Destino Chayanne":
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 bg-muted/20 rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">Web</span>
              <span className="text-foreground font-medium break-all">https://atrevia.vet/promo-concierto</span>
            </div>
            <div className="flex-1 p-4 bg-muted/20 rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">WhatsApp</span>
              <span className="text-foreground font-medium">908 814 845</span>
              <span className="text-xs text-muted-foreground block mt-1">Lun-Vie, 9:00 a.m. a 6:00 p.m.</span>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mb-8 opacity-50" />

      {/* Footer */}
      <p className="text-xs text-muted-foreground/60 font-light text-center sm:text-left">
        AGROVET MARKET S.A. — San Luis, 17 de febrero 2026
      </p>
    </div>
  );
}