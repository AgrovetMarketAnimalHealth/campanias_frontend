import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoAtrevia from "@/assets/illustrations/logo-atrevia.webp";

const BRAND_HEX = "#9868D8";
const BRAND_LIGHT = "rgba(152, 104, 216, 0.08)";

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-700">
          <span
            className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: BRAND_HEX }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-5 rounded-full" style={{ backgroundColor: BRAND_HEX }} />
      <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: BRAND_HEX }}>
        {children}
      </h3>
    </div>
  );
}

export function TerminosCondicionesPage() {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollTop = containerRef.current?.scrollTop ?? 0;
    setScrolled(scrollTop > 10);
    if (headerRef.current) {
      const headerBottom = headerRef.current.getBoundingClientRect().bottom;
      setHeaderVisible(headerBottom > 60);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f7f5fc" }}>

      {/* Sticky navbar - sin bordes, fondo blanco al hacer scroll */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white transition-all duration-300"
        style={{
          boxShadow: scrolled ? "0 2px 16px rgba(152,104,216,0.08)" : "none",
        }}
      >
        <Link to="/" className="flex items-center gap-2 font-medium">
          <img
            src={logoAtrevia}
            alt="Atrevia logo"
            className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
          />
        </Link>

        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
          style={{ opacity: headerVisible ? 0 : 1, pointerEvents: "none" }}
        >
          <span className="text-sm font-semibold text-gray-700">Términos y Condiciones</span>
        </div>

        <Badge
          className="text-white text-[10px] font-semibold px-2 py-0.5"
          style={{ backgroundColor: BRAND_HEX }}
        >
          Campaña 2026
        </Badge>
      </div>

      {/* Contenido scrollable */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto"
        onScroll={handleScroll}
        style={{ height: "calc(100vh - 56px)" }}
      >
        {/* Hero - sin bordes en los badges */}
        <div
          ref={headerRef}
          className="relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, #5a2fa8 0%, ${BRAND_HEX} 55%, #b48de8 100%)`,
          }}
        >
          <div
            className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10"
            style={{ background: "rgba(255,255,255,0.4)" }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full opacity-10"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-6 py-14 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70 mb-3">
              Lima, 19 de mayo 2026
            </p>
            <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">
              Campaña
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
              "ATREVIA, DESTINO CHAYANNE"
            </h1>
            <div className="flex flex-wrap gap-2">
              {[
                "Artista: Chayanne",
                "2 de diciembre 2026",
                "Lima, Perú",
                "Vigencia: 19 may – 11 nov 2026",
              ].map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">

          {/* Resumen - sin bordes */}
          <Alert style={{ backgroundColor: "white" }} className="border-0 shadow-sm">
            <AlertDescription>
              <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
                <div><span className="font-semibold text-gray-900">Nombre:</span> "Atrevia, Destino Chayanne"</div>
                <div><span className="font-semibold text-gray-900">Ámbito:</span> A nivel nacional (Perú)</div>
                <div><span className="font-semibold text-gray-900">Concierto:</span> 2 de diciembre 2026 — Lima, Perú</div>
                <div><span className="font-semibold text-gray-900">Vigencia:</span> 19 de mayo al 11 de noviembre de 2026</div>
              </div>
            </AlertDescription>
          </Alert>

          {/* a) Premios - card sin bordes */}
          <Card className="shadow-sm overflow-hidden border-0">
            <div
              className="px-6 py-4"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>a) Detalle de los Premios de la Campaña</SectionTitle>
              <p className="text-sm text-gray-700 leading-relaxed">
                Se sortearán 3 (TRES) premios, consistentes cada uno en 1 (UNA) entrada individual al concierto del cantante Chayanne en Lima, Perú, más 1 (UN) meet and greet con el artista. El concierto se realizará el día 2 de diciembre del 2026. Cada premio incluirá adicionalmente, para los ganadores que residan en provincia, 1 (UN) pasaje terrestre o aéreo (según corresponda) hacia la ciudad de Lima y hospedaje por 1 (UNA) noche, conforme se detalla a continuación.
              </p>
            </div>
            <CardContent className="p-0">
              <Accordion type="multiple" className="divide-y divide-gray-100">
                {[
                  {
                    value: "p1",
                    title: "1. Entrada al concierto + Meet & Greet",
                    content: "Cada premio consiste en 01 (una) entrada individual al concierto del cantante Chayanne, concierto a realizarse el día 2 de diciembre del 2026 en la ciudad de Lima, República del Perú, más 01 (un) meet and greet con el artista.",
                  },
                  {
                    value: "p2",
                    title: "2. Beneficio adicional para ganadores de provincia",
                    content: "Si el ganador reside en provincia (fuera de la ciudad de Lima), el premio incluirá adicionalmente: 01 (UN) pasaje (terrestre o aéreo, según lo determine la organización) ida y vuelta desde su ciudad de origen hacia Lima + hospedaje para una persona x 1 noche en hotel en Lima.",
                  },
                  {
                    value: "p3",
                    title: "3. No incluye",
                    content: "Ningún tipo de alimentación, consumo de bebidas, room service, servicio de lavandería, consumos de habitación y/o minibar, propinas, ni ningún otro gasto distinto del hospedaje por 1 (UNA) noche en el hotel de la ciudad de Lima. Para los ganadores de Lima Metropolitana, el premio consiste únicamente en la entrada al concierto y el meet and greet, sin incluir pasajes ni hospedaje.",
                  },
                  {
                    value: "p4",
                    title: "4. Tampoco incluye",
                    content: "Ningún otro tipo de traslados dentro o fuera de la ciudad, ni viáticos, ni trámites documentarios, ni gastos por trámite de pasaporte o visas, ni ninguna tasa o impuesto existente o que pueda ser creado, trámites documentarios del ganador, ni ningún otro gasto que no se encuentre expresamente indicado en los puntos 1 y 2 de esta numeración.",
                  },
                ].map(({ value, title, content }) => (
                  <AccordionItem key={value} value={value} className="border-0 px-6">
                    <AccordionTrigger className="text-sm font-semibold text-gray-800 hover:no-underline py-4">
                      {title}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-gray-600 leading-relaxed pb-4">
                      {content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* b) Sorteo - card sin bordes */}
          <Card className="shadow-sm overflow-hidden border-0">
            <div
              className="px-6 py-4"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>b) Fechas, Mecánica y Condiciones del Sorteo</SectionTitle>
            </div>
            <CardContent className="px-6 py-5 space-y-6">

              {/* 1. Fechas */}
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  1. Fechas de los sorteos y cantidad de premios por sorteo
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  Los sorteos se llevarán a cabo en las fechas siguientes:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "1er Sorteo", date: "03 de setiembre del 2026", prizes: "1 (UN) premio" },
                    { label: "2do Sorteo", date: "12 de noviembre del 2026", prizes: "2 (DOS) premios" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-4 text-center shadow-sm"
                      style={{ backgroundColor: BRAND_LIGHT }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: BRAND_HEX }}>
                        {s.label}
                      </p>
                      <p className="font-bold text-gray-800 text-sm">{s.date}</p>
                      <p className="text-xs text-gray-500 mt-1">{s.prizes}</p>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* 2. Quiénes participan */}
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">2. ¿Quiénes pueden participar?</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  La campaña "ATREVIA, DESTINO CHAYANNE" está dirigida únicamente a médicos veterinarios, clínicas o consultorios veterinarios y Pet shops.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed mt-2">
                  No pueden participar las personas naturales o jurídicas que se encuentren registradas como distribuidores o clientes directos de PETMEDICA. Tampoco podrán participar los clientes que compren a través del shop Agrovet Market (
                  <a href="https://shop.agrovetmarket.com/" style={{ color: BRAND_HEX }} className="underline" target="_blank" rel="noopener noreferrer">
                    https://shop.agrovetmarket.com/
                  </a>).
                </p>
              </div>

              <hr className="border-gray-100" />

              {/* 3. Mecánica */}
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">3. La mecánica del sorteo es la siguiente:</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Por cada S/ 1,000.00 (UN MIL con 00/100 SOLES) que se adquiera en productos ATREVIA® participantes, el adquiriente acumulará 1 (una) opción para el sorteo. No participan productos distintos de ATREVIA®.
                </p>

                <div className="mt-5 space-y-5">
                  {/* 3.1 */}
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">3.1 Productos participantes y asignación de opciones</p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      Para efectos del presente sorteo, participan los productos de la línea ATREVIA® listados a continuación. El cliente acumulará 1 (UNA) opción de sorteo por cada S/ 1,000.00 (UN MIL con 00/100 Soles) de compra, siempre y cuando la compra individual o la sumatoria de estos productos en un mismo comprobante alcance el monto mínimo establecido.
                    </p>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Los productos participantes son:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["Atrevia® 360", "Atrevia® Versa Gel", "Atrevia® 360 Spot On", "Atrevia® One", "Atrevia® XR", "Atrevia® Trio Cats"].map((p) => (
                        <div
                          key={p}
                          className="rounded-lg px-3 py-2 text-xs font-medium text-center shadow-sm"
                          style={{ color: BRAND_HEX, backgroundColor: BRAND_LIGHT }}
                        >
                          {p}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mt-3">
                      Estos productos podrán ser adquiridos tanto de forma individual como combinada entre sí en una misma compra hasta alcanzar el monto mínimo.
                    </p>
                    <div
                      className="mt-3 rounded-lg p-4 text-sm shadow-sm"
                      style={{ backgroundColor: BRAND_LIGHT }}
                    >
                      <p className="font-semibold mb-1 text-xs uppercase tracking-wider" style={{ color: BRAND_HEX }}>
                        Ejemplo ilustrativo
                      </p>
                      <p className="text-gray-700">
                        Una sola compra que incluya S/ 400.00 de Atrevia® 360 y S/ 600.00 de Atrevia® One (Total: S/ 1,000.00). Al tratarse de productos participantes que sumados alcanzan el monto mínimo en un solo comprobante, dicha compra generará una (1) opción de participación.
                      </p>
                    </div>
                  </div>

                  {/* 3.2 */}
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">3.2 Reglas sobre la validación de compras</p>
                    <BulletList items={[
                      "Sumatoria de Productos: Se permite la sumatoria de cualquier combinación de los productos participantes mencionados en el punto 3.1, siempre que se realicen en 1 (UNA) sola compra (un solo comprobante) para alcanzar el monto mínimo de S/ 1,000.00 (UN MIL con 00/100 Soles).",
                      "Monto Mínimo por Registro: El registro de opciones se realiza únicamente si en 1 (UNA) compra se alcanza el monto mínimo de S/ 1,000.00. Por lo tanto, no se aceptará la sumatoria de comprobantes de pago distintos que individualmente sean inferiores a S/ 1,000.00.",
                      "Prohibición de Redondeo: La asignación de opciones se realizará estrictamente sobre la base de múltiplos de S/ 1,000.00 (UN MIL con 00/100 Soles). No se efectuará redondeo a favor de los participantes en caso de montos excedentes que no lleguen a alcanzar un nuevo múltiplo de S/ 1,000.00 (Ejemplo: una compra de S/ 1,800.00 genera solo 1 opción).",
                    ]} />
                  </div>

                  {/* 3.3 */}
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">3.3 Proceso de Registro</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Los participantes que adquieran los productos ATREVIA® referidos en el punto 3.1 por el monto mínimo indicado, deberán inscribirse registrándose vía WhatsApp al{" "}
                      <span className="font-semibold" style={{ color: BRAND_HEX }}>903069021</span>{" "}
                      o en la página web:{" "}
                      <a href="https://atrevia.vet/promo-concierto/" style={{ color: BRAND_HEX }} className="underline" target="_blank" rel="noopener noreferrer">
                        https://atrevia.vet/promo-concierto/
                      </a>
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mt-2">
                      En estos canales se validará la compra realizada y se asignará el número de opciones correspondientes de conformidad con lo señalado en los puntos 3.1 y 3.2.
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* 3.4 */}
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-3">3.4 Condiciones y Restricciones Generales</p>
                <BulletList items={[
                  "La promoción del concierto en Lima, Perú estará vigente desde 19 de mayo de 2026 al 11 de noviembre de 2026 hasta las 12 del mediodía, fecha en la cual se realizará el corte de inscripciones para la segunda fecha del sorteo. El sorteo de la segunda fecha se realizará el 12 de noviembre del 2026.",
                  "El corte de inscripciones para la primera fecha del sorteo (03 de setiembre de 2026) se realizará el día 02 de setiembre de 2026 a las 12:00 del mediodía.",
                  "Se establece un límite de 01 premio por ganador. En ese sentido, quien resulte ganador en el primer sorteo no podrá participar ni ser considerado en el segundo sorteo, independientemente de las veces que haya sido seleccionado.",
                  "No podrán participar los ganadores de cualquier sorteo organizado por AGROVET MARKET S.A. durante el año 2026, independientemente del producto o marca promocionada.",
                  "Los sorteos se realizarán bajo la presencia de un Notario Público y la lista de ganadores será publicada en las redes institucionales de PETMEDICA al día siguiente de realizado cada sorteo. Sin perjuicio de ello, se tomará contacto con cada uno de los ganadores mediante el correo electrónico y/o teléfono consignado.",
                  "Al validar el comprobante de pago, se consideran los valores exactos: cada S/ 1,000.00 (UN MIL con 00/100 SOLES) de compra en productos participantes equivaldrá a 1 (UNA) opción de sorteo. No se efectuarán redondeos a favor del participante.",
                  "No podrán participar distribuidores, ni ningún otro cliente que no califique como médico veterinario, clínica/consultorio veterinario o pet shop. Tampoco podrán participar trabajadores y/o parientes de trabajadores de AGROVET MARKET hasta cuarto grado de consanguinidad o segundo de afinidad, ni convivientes.",
                  "Se aceptarán y serán válidas para la acumulación de opciones todas aquellas facturas y/o comprobantes de pago emitidos a partir del 19 de mayo de 2026, siempre que cumplan con los montos mínimos y las categorías de productos participantes detalladas en la cláusula anterior.",
                  "La presente promoción es válida exclusivamente dentro del territorio de la República del Perú (Nivel Nacional). No podrán participar personas naturales o jurídicas domiciliadas en el extranjero, ni compras realizadas fuera del territorio peruano.",
                  "Los datos personales serán recopilados mediante WhatsApp (903069021) o en la página web https://atrevia.vet/promo-concierto/. El tratamiento de estos datos se realizará en estricto respeto de la Ley N° 29733.",
                  "Los datos recepcionados serán verificados por el equipo de AGROVET MARKET, quienes consignarán los mismos en una base de datos especificando el número exacto de opciones generadas por cada registro.",
                  "Posteriormente a la inscripción, y en un lapso máximo de 2 días hábiles, el participante recibirá una notificación indicando las opciones acumuladas.",
                  "Cada opción validada representa 1 ticket con los datos del participante que será ingresado al ánfora para el sorteo.",
                  "El premio es intransferible, no puede ser sustituido por dinero en efectivo y se entregará únicamente a los ganadores, quienes aceptan el uso de su imagen (fotos/videos) para fines promocionales del evento y la experiencia en Lima.",
                  "La elección de aerolínea, escalas, hotel y logística del viaje será gestionada exclusivamente por PETMEDICA. La empresa no asume responsabilidad por demoras, cancelaciones de vuelos o cambios en el evento ajenos a su control.",
                  "Es responsabilidad del ganador tener vigente su documento de identidad (DNI) y cualquier documento requerido para el viaje dentro del territorio nacional. Si no se logra contactar al ganador en 3 días hábiles, el premio quedará vacante.",
                  "Una vez recibido el premio, los ganadores deberán firmar una Declaración Jurada de recepción y la autorización de uso de imagen correspondiente.",
                ]} />
              </div>

              <hr className="border-gray-100" />

              {/* 3.5 */}
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-3">3.5 Consideraciones</p>
                <BulletList items={[
                  "La inscripción en la presente campaña implica el pleno conocimiento y aceptación de estas bases.",
                  "PETMEDICA se reserva el derecho a modificar, ampliar o cancelar la campaña por razones justificadas, caso fortuito o fuerza mayor.",
                  <>
                    Para más información, puede ingresar a la web{" "}
                    <a href="https://atrevia.vet/promo-concierto/" style={{ color: BRAND_HEX }} className="underline" target="_blank" rel="noopener noreferrer">
                      https://atrevia.vet/promo-concierto/
                    </a>{" "}
                    o escribir al WhatsApp <span className="font-semibold" style={{ color: BRAND_HEX }}>903069021</span> de lunes a viernes (9:00 am a 6:00 pm).
                  </>,
                ]} />
              </div>

            </CardContent>
          </Card>

          {/* 4. Datos personales - card sin bordes */}
          <Card className="shadow-sm overflow-hidden border-0">
            <div
              className="px-6 py-4"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>4. Autorización de Uso de Datos Personales</SectionTitle>
            </div>
            <CardContent className="px-6 py-5 space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>Los participantes del presente sorteo, autorizan expresamente a AGROVET MARKET S.A., identificada con RUC Nro. 20250406941, con domicilio en la Avenida Canadá Nro. 3792 Interior Nro. 3798, Urbanización Villa Jardín, Distrito de San Luis, Provincia y Departamento de Lima, para tratar y hacer uso de sus datos personales, con la finalidad de participar en el sorteo.</p>
              <p>El fin especifico del tratamiento de datos personales en esta campaña es facilitar la realización del sorteo de los premios, y el contacto con los ganadores para la entrega de los bienes, sin perjuicio de las demás coordinaciones correspondientes a la ejecución de los premios.</p>
              <p>Los datos necesarios para cumplir con la finalidad descrita son los siguientes: nombres y apellidos, número y tipo de documento de identidad, número de celular, y correo electrónico. De no proporcionar dicha información, AGROVET MARKET S.A. no podrá brindar la finalidad anterior.</p>
              <p>Queda expresamente establecido que la aceptación del consentimiento es condición necesaria e imprescindible para la participación del titular de los datos personales en el sorteo. En tal sentido, se entiende que la sola inscripción para participar de la campaña y de los sorteos implica el otorgamiento de un consentimiento libre, previo expreso e informado sobre el tratamiento de sus datos personales. Asimismo, queda establecido que el presente consentimiento se otorga libremente en virtud de lo establecido en el numeral 3.3 del artículo 3° del Reglamento de la Ley N° 29733, norma que permite otorgar beneficios al titular de los datos personales a cambio de que este otorgue su consentimiento al tratamiento de sus datos personales.</p>
              <p>Los datos personales que brinde serán almacenados en el banco de datos denominado "Clientes" de titularidad de AGROVET MARKET S.A.</p>
              <p>AGROVET MARKET podrá utilizar, conservar y tratar la información del Participante hasta que culmine La Promoción y se entreguen los premios, y luego se mantendrán por un plazo de 10 años.</p>
              <p>En caso algún participante desee ejercer los derechos contemplados en la Ley de Protección de Datos Personales y su Reglamento, éste deberá comunicarse con AGROVET MARKET S.A. utilizando la "Opción de baja" proporcionada en cada una de las comunicaciones comerciales enviadas al correo proporcionado por el participante. Del mismo modo, podrá ejercer sus derechos comunicándose a cualquiera de las siguientes direcciones electrónicas:{" "}
                <a href="mailto:protecciondedatos@agrovetmarket.com" style={{ color: BRAND_HEX }} className="underline">protecciondedatos@agrovetmarket.com</a>{" "}
                o{" "}
                <a href="mailto:marketing@agrovetmarket.com" style={{ color: BRAND_HEX }} className="underline">marketing@agrovetmarket.com</a>;
                {" "}así como también podrá remitir una comunicación escrita la oficina administrativa de AGROVET MARKET S.A. ubicada en la Avenida Canadá N° 3792, Interior N° 3798, Urbanización Villa Jardín, Distrito de San Luis, Provincia y Departamento de Lima, República del Perú. En cualquier caso será necesario que el participante explique bajo qué circunstancias dio los datos personales en cuestión a la AGROVET MARKET S.A.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}