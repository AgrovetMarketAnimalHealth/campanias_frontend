import { Separator } from "@/components/ui/separator";

export function TerminosCondicionesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Encabezado */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-light tracking-tight mb-2 text-foreground">
          Términos y Condiciones
        </h1>
        <p className="text-sm text-muted-foreground/80 font-light">
          Campaña "Atrevia, Destino Chayanne" — San Luis, 20 de febrero 2026
        </p>
      </div>

      <Separator className="mb-10 opacity-50" />

      {/* Información General - Actualizada */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Información General
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="text-muted-foreground/70 min-w-[120px]">Campaña:</span>
            <span className="text-foreground font-light">"Atrevia, Destino Chayanne"</span>
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
            <span className="text-foreground font-medium">23 de febrero al 06 de mayo de 2026</span>
          </div>
        </div>
      </section>

      <Separator className="mb-10 opacity-50" />

      {/* Detalle del Premio - Actualizado (más preciso) */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Detalle del Premio
        </h2>
        <p className="text-sm text-muted-foreground mb-6 font-light leading-relaxed">
          Se sortearán <span className="text-foreground font-medium">5 premios</span>, cada uno consiste en una entrada individual al concierto de Chayanne en Costa Rica, que incluye la experiencia <span className="text-foreground font-medium">Meet & Greet</span>.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3 text-foreground">El premio incluye:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "01 entrada al concierto + Meet & Greet con Chayanne — 22 de mayo 2026, Costa Rica.",
                "01 pasaje aéreo ida y vuelta Lima – San José – Lima.",
                "Hospedaje por 2 noches en San José.",
                "Traslados aeropuerto / hotel / aeropuerto en Costa Rica.",
                "Traslado ida y vuelta hotel / concierto / hotel.",
                "Seguro de asistencia de viaje e impuesto aeroportuario (de aplicar)."
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
                "Alimentación, bebidas ni room service.",
                "Traslados adicionales no indicados en estas bases.",
                "Gastos personales, propinas, ni trámites documentarios del ganador (como pasaporte o visas)."
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

      {/* Fechas de Sorteos - Actualizado */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Fechas de Sorteos
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:gap-6 p-4 bg-muted/30 rounded-lg">
            <span className="text-foreground font-medium min-w-[180px]">1er Sorteo — 20 de marzo 2026</span>
            <span className="text-muted-foreground font-light">2 premios (entrada + Meet & Greet y paquete de viaje)</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-6 p-4 bg-muted/30 rounded-lg">
            <span className="text-foreground font-medium min-w-[180px]">2do Sorteo — 07 de mayo 2026</span>
            <span className="text-muted-foreground font-light">3 premios (entrada + Meet & Greet y paquete de viaje)</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4 font-light leading-relaxed">
          El cierre de inscripciones para el primer sorteo será el <span className="text-foreground">17 de marzo de 2026 hasta las 12:00 p.m.</span> 
          El cierre de inscripciones para el segundo sorteo será el <span className="text-foreground">06 de mayo de 2026 hasta las 23:59 horas.</span>
          Los sorteos se celebran ante Notario Público y los ganadores serán publicados en los canales oficiales de PETMEDICA al día siguiente.
        </p>
      </section>

      <Separator className="mb-10 opacity-50" />

      {/* Mecánica de Participación - Actualizado (CORREGIDO: 1 opción por S/ 1000) */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Mecánica de Participación
        </h2>
        <p className="text-sm text-muted-foreground mb-6 font-light leading-relaxed">
          Dirigido exclusivamente a <span className="text-foreground">médicos veterinarios, clínicas veterinarias y Pet Shops</span>. 
          Por cada <span className="text-foreground">S/ 1,000 (mil soles)</span> en compras de productos Atrevia participantes, realizadas en <span className="text-foreground">una sola factura</span>, se acumula <span className="text-foreground font-semibold">1 (una) opción</span> para el sorteo.
        </p>

        {/* Tabla de productos - Actualizada para reflejar que todos participan para el monto mínimo */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3 text-foreground">Productos participantes:</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Atrevia 360",
              "Atrevia VersaGel",
              "Atrevia 360 Spot On",
              "Atrevia One",
              "Atrevia XR",
              "Atrevia Trio Cats"
            ].map((producto, index) => (
              <div key={index} className="p-3 bg-muted/20 rounded-lg text-sm text-muted-foreground">
                <span>{producto}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/70 mt-2">
            * Los productos pueden combinarse en una misma compra para alcanzar el monto mínimo de S/ 1,000.
          </p>
        </div>

        {/* Ejemplo y reglas */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Reglas para la acumulación de opciones:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 font-light">
            <li>Las compras deben ser de <span className="text-foreground">productos Atrevia participantes</span>.</li>
            <li>Se debe alcanzar un mínimo de <span className="text-foreground">S/ 1,000</span> en un <span className="text-foreground">solo comprobante de pago</span>.</li>
            <li><span className="text-foreground">No se acepta</span> la sumatoria de múltiples facturas para alcanzar el monto mínimo.</li>
            <li>La asignación de opciones es por cada múltiplo de S/ 1,000. No hay redondeo. (Ejemplo: una compra de S/ 1,800 genera 1 opción).</li>
          </ul>
          <p className="text-sm bg-muted/20 p-3 rounded-lg text-muted-foreground italic">
            <span className="font-medium text-foreground">Ejemplo:</span> Una sola compra que incluya S/ 400 de Atrevia 360 y S/ 600 de Atrevia One suma S/ 1,000 y genera 1 opción de participación.
          </p>
        </div>

        <div className="space-y-4 mt-6">
          <h3 className="text-sm font-medium text-foreground">Proceso de registro:</h3>
          <p className="text-sm text-muted-foreground font-light">
            Inscríbete a través de cualquiera de estos canales dentro de la vigencia de la campaña:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 border rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">WhatsApp</span>
              <span className="text-foreground font-medium">903 069 021</span>
            </div>
            <div className="flex-1 p-4 border rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">Web</span>
              <span className="text-foreground font-medium break-all">https://atrevia.vet/promo-concierto/</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground font-light mt-4 leading-relaxed">
            En un plazo máximo de <span className="text-foreground">2 días hábiles</span> recibirás una notificación confirmando tus opciones acumuladas.
          </p>
        </div>
      </section>

      <Separator className="mb-10 opacity-50" />

      {/* Condiciones y Restricciones - Actualizado con nuevas cláusulas */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Condiciones y Restricciones
        </h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          {[
            "No pueden participar distribuidores de PETMEDICA, ni clientes que compren a través del shop Agrovet Market. Tampoco pueden participar trabajadores de AGROVET MARKET o sus parientes hasta 4to grado de consanguinidad o 2do de afinidad.",
            "El premio es intransferible y no puede canjearse por dinero en efectivo, otros bienes ni servicios.",
            "De no poder contactar al ganador en 3 días hábiles, el premio quedará en custodia permanente de AGROVET MARKET S.A. y se considerará desierto.",
            "El ganador deberá firmar una Declaración Jurada de recepción del premio y una autorización de uso de imagen.",
            "AGROVET MARKET S.A. (PETMEDICA) podrá publicar imágenes y/o vídeos de los ganadores en sus canales oficiales con fines promocionales.",
            "Es responsabilidad exclusiva del ganador contar con pasaporte vigente y cualquier otro documento requerido para el viaje.",
            "La empresa no asume responsabilidad por cancelaciones, reprogramaciones de vuelos o del evento, ni por decisiones migratorias ajenas a su control.",
            "Los vuelos podrán tener escalas. La aerolínea, hotel y categoría serán elegidos exclusivamente por PETMEDICA.",
            "La inscripción implica la aceptación de todas las bases y condiciones aquí descritas.",
            "PETMEDICA se reserva el derecho de modificar, ampliar o suspender la campaña por razones justificadas, caso fortuito o fuerza mayor."
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-3 font-light leading-relaxed">
              <span className="text-foreground/30 mt-1 text-xs">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <Separator className="mb-10 opacity-50" />

      {/* NUEVA SECCIÓN: Autorización de Uso de Datos Personales (del TDR) */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Autorización de Uso de Datos Personales
        </h2>
        <div className="space-y-4 text-sm text-muted-foreground font-light leading-relaxed">
          <p>
            Los participantes autorizan expresamente a <span className="text-foreground">AGROVET MARKET S.A.</span> (RUC 20250406941) para tratar sus datos personales (nombres, DNI, celular, correo) con la finalidad exclusiva de gestionar su participación en el sorteo, contactar a los ganadores y coordinar la entrega de los premios.
          </p>
          <p>
            Los datos serán almacenados en el banco de datos "Clientes" de titularidad de AGROVET MARKET S.A. y se conservarán hasta 10 años después de finalizada la promoción, según la normativa aplicable.
          </p>
          <p>
            Para ejercer sus derechos de acceso, rectificación, cancelación u oposición, puede comunicarse escribiendo a las direcciones electrónicas: <span className="text-foreground">protecciondedatos@agrovetmarket.com</span> o <span className="text-foreground">marketing@agrovetmarket.com</span>, o mediante una carta a la oficina administrativa en Av. Canadá N° 3792, Interior N° 3798, Urbanización Villa Jardín, San Luis, Lima.
          </p>
        </div>
      </section>

      <Separator className="mb-10 opacity-50" />

      {/* Contacto - Actualizado con nuevo WhatsApp */}
      <section className="mb-10">
        <h2 className="text-base font-medium uppercase tracking-wider text-muted-foreground/70 mb-5">
          Contacto
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground font-light">
            Para más información sobre la campaña "Atrevia, Destino Chayanne":
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-4 bg-muted/20 rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">Web</span>
              <span className="text-foreground font-medium break-all">https://atrevia.vet/promo-concierto/</span>
            </div>
            <div className="flex-1 p-4 bg-muted/20 rounded-lg">
              <span className="text-xs text-muted-foreground block mb-1">WhatsApp</span>
              <span className="text-foreground font-medium">903 069 021</span>
              <span className="text-xs text-muted-foreground block mt-1">Lun-Vie, 9:00 a.m. a 6:00 p.m.</span>
            </div>
          </div>
        </div>
      </section>

      <Separator className="mb-8 opacity-50" />

      {/* Footer - Actualizado con la empresa y fecha del TDR */}
      <p className="text-xs text-muted-foreground/60 font-light text-center sm:text-left">
        AGROVET MARKET S.A. (PETMEDICA) — San Luis, 20 de febrero 2026
      </p>
    </div>
  );
}