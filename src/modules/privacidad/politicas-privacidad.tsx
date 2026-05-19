import { useState, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
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
const BRAND_LIGHT = "rgba(152, 104, 216, 0.07)";

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-700">
          <span className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: BRAND_HEX }} />
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

export function PoliticasPrivacidadPage() {
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

      {/* Sticky navbar — siempre blanco */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white"
        style={{
          borderBottom: scrolled ? "1px solid #f0ecfb" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 12px rgba(152,104,216,0.06)" : "none",
          transition: "box-shadow 0.3s, border-color 0.3s",
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
          <span className="text-sm font-semibold text-gray-700">Consentimiento Informado</span>
        </div>

        <Badge className="text-white text-[10px] font-semibold px-2 py-0.5" style={{ backgroundColor: BRAND_HEX, border: "none" }}>
          Ley N° 29733
        </Badge>
      </div>

      {/* Contenido */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto"
        onScroll={handleScroll}
        style={{ height: "calc(100vh - 56px)" }}
      >
        {/* Hero */}
        <div
          ref={headerRef}
          className="relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, #5a2fa8 0%, ${BRAND_HEX} 55%, #b48de8 100%)` }}
        >
          <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10" style={{ background: "rgba(255,255,255,0.4)" }} />
          <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full opacity-10" style={{ background: "rgba(255,255,255,0.3)" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-14 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70 mb-3">AGROVET MARKET S.A.</p>
            <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">Documento Legal</p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-6">CONSENTIMIENTO INFORMADO</h1>
            <div className="flex flex-wrap gap-2">
              {["RUC: 20250406941", "Ley N° 29733", "D.S. N° 016-2024-JUS"].map((item) => (
                <span key={item} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">

          {/* Intro */}
          <Alert className="border-0 bg-white shadow-sm">
            <AlertDescription>
              <p className="text-sm text-gray-700 leading-relaxed">
                En cumplimiento de lo dispuesto por la Ley N° 29733, Ley de Protección de Datos Personales y su reglamento, aprobado por Decreto Supremo N° 016-2024-JUS, yo ……………………….., identificado con D.N.I./C.E./Pasaporte N° ……………, con domicilio en …………………………………., Distrito de ………, Provincia de ……………, Departamento de …………., declaro haber sido informado de lo siguiente:
              </p>
            </AlertDescription>
          </Alert>

          {/* Cláusulas */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="px-6 py-4" style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}>
              <SectionTitle>Cláusulas del Consentimiento Informado</SectionTitle>
            </div>
            <CardContent className="p-0">
              <Accordion
                type="multiple"
                defaultValue={["c1", "c2", "c3", "c4", "c5", "c6"]}
                className="divide-y divide-gray-100"
                style={{ borderTop: "1px solid #f0ecfb" }}
              >

                <AccordionItem value="c1" className="border-0 px-6">
                  <AccordionTrigger className="text-sm font-semibold text-gray-800 hover:no-underline py-4">
                    1. Identidad y Domicilio del Titular del Banco de Datos Personales o Encargado del Tratamiento
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 leading-relaxed pb-5">
                    AGROVET MARKET S.A., identificada con RUC Nro. 20250406941, con domicilio en la Avenida Canadá Nro. 3792 Interior Nro. 3798, Urbanización Villa Jardín, Distrito de San Luis, Provincia y Departamento de Lima, República del Perú.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="c2" className="border-0 px-6">
                  <AccordionTrigger className="text-sm font-semibold text-gray-800 hover:no-underline py-4">
                    2. Finalidad del Banco de Datos Personales de AGROVET MARKET S.A.
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 leading-relaxed pb-5 space-y-3">
                    <p>El Banco de Datos Personales de AGROVET MARKET S.A. tiene por finalidad de establecer, modificar y/o ejecutar toda y cualquier clase de relaciones jurídicas existentes y/o que puedan existir entre los titulares de los datos personales de AGROVET MARKET S.A. y sus clientes, ya sean de carácter comercial, laboral, civil, colaborativo y/o de cualquier otra índole, así como para fines promocionales, de verificación y consulta y/o cualquier otra actividad lícita debidamente informada a dichos titulares de datos personales. Concretamente, los datos podrán ser tratados con las siguientes finalidades:</p>
                    <BulletList items={[
                      "Promoción comercial y venta de productos o servicios a clientes, información a titulares de Datos Personales sobre convocatorias y procesos de selección de personal.",
                      "Ejecución de contratos de la empresa con clientes y/o proveedores y/o prestadores de servicios.",
                      "Acreditación del cumplimiento de la entrega de los premios de la campaña \"ATREVIA, DESTINO CHAYANNE\" (1 entrada al concierto + 1 meet and greet con Chayanne).",
                      "Fines publicitarios respecto de la campaña \"ATREVIA, DESTINO CHAYANNE\".",
                    ]} />
                    <p>Asimismo, los datos personales sólo serán utilizados con propósitos limitados, esto es como los expuestos precedentemente.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="c3" className="border-0 px-6">
                  <AccordionTrigger className="text-sm font-semibold text-gray-800 hover:no-underline py-4">
                    3. Transferencias y Destinatarios
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 leading-relaxed pb-5 space-y-3">
                    <p>Los Datos Personales podrán ser transferidos por AGROVET MARKET S.A. a nivel local e internacional a sus vinculadas para fines de la ejecución de los premios de la campaña "ATREVIA, DESTINO CHAYANNE", así como a las aerolíneas, compañías de taxi o movilidad, hotel y a los organizadores del evento denominado "Concierto de Chayanne en Lima, Perú", así como a las demás entidades privadas o públicas y autoridades con las cuales sea menester contactar para el cumplimiento de los premios.</p>
                    <p>AGROVET MARKET S.A. podrá transferir los datos personales a las autoridades policiales, fiscales, tributarias, laborales, aduaneras, judiciales, congresales, comisiones investigadoras y demás entidades públicas legalmente facultadas conforme a ley, sea en cumplimiento de la normatividad vigente y/o por requerimiento de éstas.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="c4" className="border-0 px-6">
                  <AccordionTrigger className="text-sm font-semibold text-gray-800 hover:no-underline py-4">
                    4. Plazo durante el cual se Conservarán los Datos Personales
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="rounded-xl p-4 text-center" style={{ backgroundColor: BRAND_LIGHT }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: BRAND_HEX }}>Plazo de conservación</p>
                      <p className="text-3xl font-black text-gray-800">10 años</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="c5" className="border-0 px-6">
                  <AccordionTrigger className="text-sm font-semibold text-gray-800 hover:no-underline py-4">
                    5. Política de Tratamiento de Datos Personales y Derechos de Información, Acceso, Rectificación, Cancelación y Oposición de los Datos
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 leading-relaxed pb-5 space-y-3">
                    <p>La Política de Tratamiento de Datos Personales de AGROVET MARKET S.A. obra en su página Web <a href="https://shop.agrovetmarket.com/content-7-politicas-de-privacidad" style={{ color: BRAND_HEX }} className="underline" target="_blank" rel="noopener noreferrer">https://shop.agrovetmarket.com/content-7-politicas-de-privacidad</a>. Asimismo, el titular de Datos Personales, tiene derecho de acceder a sus datos en posesión de AGROVET MARKET S.A. El titular de Datos Personales podrá en todo momento revocar el consentimiento otorgado expresamente (dejándose constancia que el premio no podrá ser ejecutado al efectuar esta revocación) y/o ejercer todos los derechos que le confiere la normativa de Protección de Datos Personales, mediante la presentación de una solicitud, acompañada de copia de su D.N.I. o Carnet de Extranjería y enviando su solicitud y/o consultas a:</p>
                    <BulletList items={[
                      <>Correo electrónico: <a href="mailto:protecciondedatos@agrovetmarket.com" style={{ color: BRAND_HEX }} className="underline">protecciondedatos@agrovetmarket.com</a></>,
                      "Sede: Avenida Canadá Nro. 3792 Interior Nro. 3798, Urbanización Villa Jardín, Distrito de San Luis, Provincia y Departamento de Lima, República del Perú.",
                    ]} />
                    <p>En caso que el titular de los Datos Personales requiera ejercer sus derechos mediante un representante, éste deberá presentar carta poder legalizada por notario público que lo faculte como tal y su documento de identidad.</p>
                    <p>La solicitud debe estar dirigida a AGROVET MARKET S.A., con los nombres y apellidos del titular del derecho y acreditación de los mismos, copia del documento que acredite su identidad, la petición concreta conteniendo descripción clara y precisa de los datos respecto de los que busca ejercer sus derechos, el domicilio o dirección electrónica, fecha y firma del solicitante y los documentos que sustentan la petición, de ser el caso.</p>
                    <p>De considerar el titular del dato personal que no ha sido atendido en el ejercicio de sus derechos puede presentar una reclamación ante la Autoridad Nacional de Protección de Datos o ante el Poder Judicial.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="c6" className="border-0 px-6">
                  <AccordionTrigger className="text-sm font-semibold text-gray-800 hover:no-underline py-4">
                    6. Consentimiento Informado
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700 leading-relaxed pb-5 space-y-3">
                    <p>Por el presente acto, esto es, mediante mi firma física, electrónica, digitalizada, inscripción para participar en la campaña "ATREVIA, DESTINO CHAYANNE" o mediante grabación en audio y/o video de la presente declaración de consentimiento informado, declaro que he sido informado de manera previa, clara, expresa, precisa y suficiente sobre el tratamiento de mis Datos Personales y haber sido informado de la Política de Tratamiento de Datos Personales de AGROVET MARKET S.A., razón por la cual proporciono mis datos personales y autorizo su tratamiento de manera libre, previa, expresa, voluntaria e inequívoca y, además, doy mi consentimiento para que se realicen todas las verificaciones de mis datos, de mis referencias personales y de todos los demás que resulten necesarios para los fines de AGROVET MARKET S.A. referidos en el punto 2. FINALIDAD del presente documento. Asimismo, autorizo el uso de mi imagen y voz (fotografía, audio y vídeo) en caso de resultar ganador de alguno de los premios de la campaña "ATREVIA, DESTINO CHAYANNE".</p>
                    <p>Así, con la finalidad de ejecutar las finalidades establecidas en la Política de Tratamiento de Datos Personales declaro que AGROVET MARKET S.A. se encuentra facultado para dar tratamiento y, eventualmente, transferir mis Datos Personales conforme a lo indicado en los puntos 1 al 5 precedentes. De igual modo, reconozco que estarán incluidos dentro de mi información todos aquellos datos, operaciones y referencias a los que AGROVET MARKET S.A. pueda acceder en el curso normal de sus operaciones, ya sea por haber sido proporcionados mi persona o por terceros, o por haber sido desarrollados por AGROVET MARKET S.A., tanto en forma física, oral o electrónica y que pudieran calificar como "Datos Personales" conforme a la Ley N° 29733 - Ley de Protección de Datos Personales y su Reglamento aprobado mediante Decreto Supremo N° 106-2024-JUS.</p>
                    <p>Del mismo modo, autorizo expresamente a AGROVET MARKET S.A. a incorporar mi información al banco de Datos Personales de AGROVET MARKET S.A., así como a almacenar, dar tratamiento, procesar y transferir información a sus vinculadas, a las entidades públicas y privadas indicadas líneas arriba, así como a los clientes que la contraten para procesos de selección de personal y/o gestión de talento humano, conforme a los procedimientos que AGROVET MARKET S.A. determine en el marco de sus operaciones habituales u otros pertinentes.</p>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </CardContent>
          </Card>

          {/* Datos del declarante */}
          <Card className="border-0 shadow-sm overflow-hidden">
            <div className="px-6 py-4" style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}>
              <SectionTitle>Datos del Declarante</SectionTitle>
            </div>
            <CardContent className="px-6 py-6">
              <div className="grid sm:grid-cols-2 gap-5">
                {["Fecha", "Lugar", "Nombre y apellidos", "Tipo y número de documento de identidad", "Domicilio", "Correo electrónico"].map((label) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: BRAND_HEX }}>{label}</span>
                    <div className="h-8 border-b border-gray-200" />
                  </div>
                ))}
              </div>

              <Separator className="bg-gray-100 my-8" />

              <div className="flex justify-center">
                <div className="text-center">
                  <div className="w-48 border-t-2 mx-auto mb-3" style={{ borderColor: BRAND_HEX }} />
                  <p className="text-sm font-semibold text-gray-700">Firma del Declarante</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer empresa */}
          <div className="flex justify-center pb-10">
            <div className="rounded-2xl px-10 py-6 text-center bg-white shadow-sm">
              <div className="w-16 border-t-2 mx-auto mb-4" style={{ borderColor: BRAND_HEX }} />
              <img
                src={logoAtrevia}
                alt="Atrevia logo"
                className="h-8 w-auto object-contain mx-auto mb-2 dark:brightness-0 dark:invert"
              />
              <p className="font-bold text-gray-800 text-sm">AGROVET MARKET S.A.</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">RUC 20250406941</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
