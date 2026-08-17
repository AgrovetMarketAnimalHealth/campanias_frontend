import { useState, useRef } from "react";
import { UTMLink as Link } from "@/components/UTMLink"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import logoAtrevia from "@/assets/illustrations/logo-atrevia.webp";

const BRAND_HEX = "#9868D8";
const BRAND_LIGHT = "rgba(152, 104, 216, 0.08)";

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="space-y-2.5 mt-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-relaxed text-gray-700">
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
    <div className="flex items-center gap-2 mb-5">
      <div className="w-1 h-6 rounded-full" style={{ backgroundColor: BRAND_HEX }} />
      <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: BRAND_HEX }}>
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
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: "#f7f5fc" }}>

      {/* Sticky navbar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-8 py-3 bg-white transition-all duration-300"
        style={{
          boxShadow: scrolled ? "0 4px 20px rgba(152,104,216,0.1)" : "none",
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
          <span className="text-base font-semibold text-gray-700">Términos y Condiciones</span>
        </div>

        <Badge
          className="text-white text-xs font-semibold px-2 py-0.5"
          style={{ backgroundColor: BRAND_HEX }}
        >
          Sorteo 2026
        </Badge>
      </div>

      {/* Contenido scrollable */}
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

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-20 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70 mb-3">
              Lima, 24 de julio 2026
            </p>
            <p className="text-base font-semibold uppercase tracking-widest opacity-80 mb-1">
              Sorteo
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Atrevia te lleva a conocer a Chayanne
            </h1>
            <div className="flex flex-wrap gap-3">
              {[
                "Artista: Chayanne",
                "2 de diciembre 2026",
                "Lima, Perú",
                "Vigencia: 24 jul – 15 oct 2026",
                "Primer sorteo: 13 de octubre",
                "Segundo sorteo: 19 de noviembre",
              ].map((item) => (
                <span
                  key={item}
                  className="text-sm font-medium px-3 py-1.5 rounded-full"
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
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-10">

          {/* Resumen */}
          <Alert style={{ backgroundColor: "white" }} className="border-0 shadow-md rounded-xl">
            <AlertDescription>
              <div className="grid sm:grid-cols-2 gap-4 text-base text-gray-700">
                <div><span className="font-semibold text-gray-900">Nombre:</span> Atrevia te lleva a conocer a Chayanne</div>
                <div><span className="font-semibold text-gray-900">Ámbito:</span> Perú</div>
                <div><span className="font-semibold text-gray-900">Concierto:</span> 2 de diciembre 2026 — Lima, Perú</div>
                <div><span className="font-semibold text-gray-900">Vigencia:</span> 24 de julio al 15 de octubre de 2026</div>

                <div><span className="font-semibold text-gray-900">Primer sorteo:</span> 13 de octubre</div>
                <div><span className="font-semibold text-gray-900">Segundo sorteo:</span> 19 de noviembre</div>
              </div>
            </AlertDescription>
          </Alert>

          {/* INTRODUCCIÓN */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <p className="text-base text-gray-700 leading-relaxed">
                Constan en el presente documento, los Términos y Condiciones que establecen la regulación aplicable al presente sorteo denominado "Atrevia te lleva a conocer a Chayanne" (en adelante, los "Términos y Condiciones"). La empresa anunciante y organizadora de esta actividad es AGROVET MARKET S. A. (en adelante, Agrovet) a través de su marca Atrevia®. El domicilio de Agrovet es Av. Canadá 3792, Villa Jardín, San Luis. Se deja expresa constancia de que en los presentes Términos y condiciones toda referencia a posterior a "Atrevia®" se entenderá como referida a la empresa AGROVET MARKET S. A.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mt-3">
                La persona que desee participar (en adelante, Participante) en el sorteo "Atrevia te lleva a conocer a Chayanne" reconoce y acepta que el desarrollo y realización de este concurso se sujetará única y exclusivamente a los Términos y Condiciones que aquí se detallan y que su participación presupone el conocimiento, comprensión y aceptación plena e irrestricta de todos estos.
              </p>
            </div>
          </Card>

          {/* PRIMERO: Territorio */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>PRIMERO: Territorio</SectionTitle>
              <p className="text-base text-gray-700 leading-relaxed">
                La promoción será válida únicamente dentro del territorio de Perú. En consecuencia, únicamente se permitirá la participación de residentes en Perú conforme a las condiciones, requisitos, restricciones y en general, cualquier estipulación contenida en los presentes Términos y Condiciones.
              </p>
            </div>
          </Card>

          {/* SEGUNDO: Participantes */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>SEGUNDO: Participantes</SectionTitle>
              <p className="text-base text-gray-700 leading-relaxed">
                Podrán participar del concurso todas aquellas personas naturales mayores de edad e identificadas con DNI, carné de extranjería o PTP (Permiso Temporal de Permanencia) residentes en Perú. Para participar en la promoción el participante debe haber leído previamente los términos y condiciones de la promoción que aquí se encuentran detallados y a los que el participante deberá acceder desde el enlace que estará disponible en el post del sorteo "Atrevia te lleva a conocer a Chayanne" publicado en la página de Instagram de Atrevia® (
                <a href="https://www.instagram.com/atreviapets/" style={{ color: BRAND_HEX }} className="underline hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">
                  https://www.instagram.com/atreviapets/
                </a>
                ) el 24 de julio de 2026.
              </p>
              <p className="text-base text-gray-700 leading-relaxed mt-3">
                Todas las personas que intervienen como participantes o en cualquier otra forma en la presente Promoción, declaran que han entendido y aceptado los presentes Términos y Condiciones de manera previa a su participación o involucramiento. En tal sentido, los participantes del sorteo aseguran que terceros, directa o indirectamente involucrados en la mecánica descrita en los presentes términos y condiciones, han leído comprendido y aceptado plenamente los mismos sin reserva o condición alguna.
              </p>
            </div>
          </Card>

          {/* TERCERO: Licencia de Uso */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>TERCERO: Licencia de Uso</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-4 text-base text-gray-700 leading-relaxed">
              <p>Al participar en la presente promoción, el participante concede una licencia universal, gratuita, no exclusiva y por todo el tiempo que lo permitan las leyes aplicables, a Atrevia® (entiéndase Agrovet) con relación al contenido de las imágenes y videos, incluyendo atributos de la personalidad como su imagen y voz, a fin de que puedan ser compartidos o empleados en los contenidos de la marca en el contexto de la mecánica de la promoción, en los formatos y cualquier otro contenido de carácter publicitario que Atrevia® y Agrovet consideren apropiados.</p>
              <p>En ese sentido, la participación mediante fotos o vídeos en las que se aprecie su imagen, implica la expresa autorización a favor de Agrovet para el empleo de tales imágenes o vídeos con los propósitos puntuales de la promoción, sin que ello dé lugar a contraprestación, beneficio o compensación de ninguna naturaleza a su favor.</p>
              <p>Asimismo, mediante la sola participación con fotografías en el sorteo, el participante, en calidad de representante legal de su menor hijo (de ser el caso) asegura que ambos padres del menor brindan pleno consentimiento a Agrovet para hacer empleo del nombre, imagen y voz de su hijo, en los propósitos puntuales de la promoción, sin que ello dé lugar a contraprestación, beneficio o compensación de ninguna naturaleza a su favor, otorgando a Agrovet para tal efecto una licencia universal gratuita no exclusiva y por todo el tiempo que las leyes del Perú lo permitan.</p>
              <p>El participante brinda su conformidad para que Atrevia® pueda hacer uso de la licencia otorgada a través de todos los medios de comunicación, incluyendo medios de comunicación masiva tales como internet, redes sociales, televisión, radio, prensa, o a nivel de puntos de venta, u otros de índole similar.</p>
              <p>Del mismo modo, el participante declara tener los permisos, autorizaciones, licencias o sublicencias por parte de terceros que puedan tener derecho o titularidad alguna sobre los contenidos que puedan ser compartidos por el participante, así como respecto de los atributos de la personalidad de dichos terceros que puedan estar involucrados en la participación de la presente promoción.</p>
              <p>El participante asegura mantener indemne en cualquier escenario a Atrevia® sobre potenciales reclamaciones de terceros y asegura a Atrevia® que cuenta con las autorizaciones correspondientes para conferir a Agrovet una sublicencia con relación a atributos de la personalidad de terceros con los mismos alcances que los establecidos en el primer párrafo de la presente cláusula.</p>
              <p>El participante comprende que Atrevia® no se hará responsable del uso que podrían darle terceros al material publicado por el participante en el Instagram de la promoción, dado que escapa a su esfera de control.</p>
            </CardContent>
          </Card>

          {/* CUARTO: Vigencia */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>CUARTO: Vigencia</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-4 text-base text-gray-700 leading-relaxed">
              <p>La promoción se llevará a cabo del 24 de julio de 2026 al 15 de octubre de 2026. El participante declara aceptar y conocer que el perfil de Instagram de Atrevia® (
                <a href="https://www.instagram.com/atreviapets/" style={{ color: BRAND_HEX }} className="underline hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">
                  https://www.instagram.com/atreviapets/
                </a>
                ) es el único canal oficial de revelación de información entendiéndose como adecuada y suficientemente informada de cada anuncio que pueda desarrollarse en el mencionado canal.
              </p>
              <p>Cualquier tipo de variación en las fechas, de ser el caso, será oportunamente informada por Agrovet S.A. mediante un aviso en nuestra página de Instagram de Atrevia®, entendiéndose, de ser el caso, plenamente conocido tal aviso por los participantes.</p>
              <p>La modificación de la promoción, dinámica, plazo y/o cualquier otra característica, en caso se produzca una, se realizará en los términos y condiciones que Atrevia® especifique oportunamente, por lo que el participante entiende que los premios ofrecidos y cualesquiera otras condiciones aplicables, de producirse este escenario podrían ser distintas con relación a los términos originalmente previstos.</p>
              <p>El participante declara aceptar que como consecuencia de su participación en la dinámica ha asumido voluntariamente la carga de tomar conocimiento de cualquier comunicación o aviso difundido en los canales oficiales para la revelación de información previamente mencionados manifestando asimismo que entiende que dicha obligación es razonable, proporcional y que no afecta de modo alguno los intereses o derechos del participante dado el contexto de la dinámica planteada.</p>
              <p>Agrovet se reserva el derecho de ampliar la vigencia de la promoción en los términos que sean comunicados oportunamente en cuyo caso dicha ampliación de ningún modo podrá ser interpretada como una nueva promoción. En ese caso, el participante declara conocer y entender que los premios ofrecidos por Agrovet durante el periodo extendido podrían ser únicamente los que se indiquen en la publicidad respectiva en la que se de cuenta de tal extensión o ampliación. El participante, en suma, entiende que, en el supuesto de extensión o ampliación, no necesariamente se ofrecerán los premios o beneficios comprendidos durante la vigencia originalmente establecida de la promoción. La ampliación de la promoción en ningún caso significa o importa una reducción del stock mínimo considerado para la promoción en su extensión original.</p>
            </CardContent>
          </Card>

          {/* QUINTO: Mecánica */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>QUINTO: Mecánica de la promoción</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-4 text-base text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-800">Mecánica para Instagram:</p>
              <p>Durante la vigencia de la promoción, el participante deberá buscar el sorteo publicado en el perfil de Instagram de Atrevia® el 24 de julio de 2026. El participante debe seguir los siguientes pasos:</p>
              <BulletList items={[
                "Comprar cualquier producto de Atrevia® (no aplica Atrevia® Versa Gel)",
                <>
                  Registrar la compra en la web{" "}
                  <a href="https://www.atrevia.vet/promo-chayanne/clientes/" style={{ color: BRAND_HEX }} className="underline hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">
                    https://www.atrevia.vet/promo-chayanne/clientes/
                  </a>
                </>,
              ]} />
              <p className="mt-3">Se debe tomar en cuenta que el participante obtendrá más opciones de ganar si registra más boletas.</p>
              <p>Se verificará que los participantes hayan cumplido una de las opciones anteriormente mencionadas, caso contrario, se invalidará su participación.</p>
              <p>No se aceptarán frases, palabras, gestos o cualquier expresión que a criterio de Atrevia® tenga un carácter o connotación sexual, obscena, discriminatoria u ofensiva. Por tanto, el participante que incumpla con ello será eliminado, descalificado del concurso y bloqueado de las redes sociales de Atrevia®, así como de todas las redes sociales de las marcas de Agrovet. Esta evaluación será a entera discreción de Agrovet y el participante no podrá reclamarlo bajo ningún concepto, ni exigir ninguna reconsideración.</p>
            </CardContent>
          </Card>

          {/* SEXTO: Premios */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>SEXTO: Premios</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-4 text-base text-gray-700 leading-relaxed">
              <p>Se deja constancia que esta promoción consiste en el sorteo de los siguientes premios por ganador:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2" style={{ borderColor: BRAND_HEX }}>
                      <th className="py-3 pr-4 font-semibold text-gray-800">Premio</th>
                      <th className="py-3 font-semibold text-gray-800">Ganadores de Instagram</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4 pr-4">01 entrada meet & greet para el concierto de Chayanne el 02 de diciembre en el Estadio Nacional, Lima, Perú.</td>
                      <td className="py-4 font-bold" style={{ color: BRAND_HEX }}>02</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4 font-semibold">Total de ganadores</td>
                      <td className="py-4 font-bold" style={{ color: BRAND_HEX }}>02</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4">En total habrá 02 ganadores que se llevarán cada uno 01 entrada meet & greet para el concierto de Chayanne, especificado en el cuadro anterior.</p>
              <p className="font-semibold text-red-600">ATENCIÓN: Atrevia® y Agrovet no se hacen responsables del traslado ni los viáticos si el ganador no reside en Lima.</p>
              <p>El participante declara conocer que, todos los premios que puedan entregarse tienen condición de liberalidad y, por tanto, no existe relación de consumo respecto de estos con el beneficiario.</p>
              <p>Agrovet no asume responsabilidad por fallos que sean imputables al fabricante o comercializador de los premios entregados salvo que hayan sido fabricados o comercializados por Agrovet.</p>
              <p>Los premios que puedan ser entregados no son intercambiables por dinero en efectivo o por algún otro premio que no haya sido determinado por Atrevia®.</p>
              <p>El participante comprende plenamente que la sola participación en la promoción no asegura la obtención de un premio o beneficio de alguna naturaleza.</p>
            </CardContent>
          </Card>

          {/* SÉPTIMO: Ganadores */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>SÉPTIMO: Ganadores</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-6 text-base text-gray-700 leading-relaxed">
              <p>Podrán participar del sorteo para ser ganadores, los participantes que cumplan con realizar la mecánica, de acuerdo con lo descrito en el numeral cuarto y que cumplan con todos los requisitos establecidos por los términos y condiciones.</p>

              <div className="rounded-xl p-6" style={{ backgroundColor: BRAND_LIGHT }}>
                <p className="font-semibold text-gray-800">Primer ganador:</p>
                <p className="mt-2">Ingresan las inscripciones realizadas hasta el 07 de agosto. El día <strong>13 de octubre de 2026</strong> se realizará el sorteo ante Notario Público para determinar al primer ganador.</p>
                <p className="mt-2">El <strong>13 de octubre</strong> se publicará el nombre del participante ganador a través de una historia en el Instagram de Atrevia®.</p>
              </div>

              <div className="rounded-xl p-6" style={{ backgroundColor: BRAND_LIGHT }}>
                <p className="font-semibold text-gray-800">Segundo ganador:</p>
                <p className="mt-2">Ingresan las inscripciones realizadas hasta el 15 de octubre. El día <strong>19 de noviembre de 2026</strong> se realizará el sorteo ante Notario Público para determinar al segundo ganador.</p>
                <p className="mt-2">El <strong>19 de noviembre</strong> se publicará el nombre del participante ganador a través de una historia en el Instagram de Atrevia®.</p>
              </div>

              <p>Cada participante entiende que, para tomar conocimiento de si resultó ser ganador, deberá revisar el storie o comentario que contenga al ganador para cada fecha de sorteo y que es de su exclusiva responsabilidad tomar conocimiento oportuno de su eventual condición de ganador. Asimismo, el participante declara conocer que la participación no asegura la obtención o probabilidad de obtención de premio alguno.</p>
              <p>Cada ganador debe comunicarse con Atrevia® a través de un mensaje privado DM por medio de la página de Instagram, deberá indicar los siguientes datos: Nombre y Apellidos, documento de identidad, teléfono, correo y dirección exacta de su domicilio.</p>
              <p>En caso el ganador no se comunique con Atrevia® de la forma antes indicada dentro de los siguientes (01) días hábiles desde la publicación del ganador, no brinde datos necesarios, se considerará que ha renunciado al premio y Agrovet se reservará el derecho de conservar y/o disponer del premio según considere pertinente, o realizar cualquier otra acción si así lo considerase, sin que ello dé lugar a reclamos.</p>
            </CardContent>
          </Card>

          {/* OCTAVO: Entrega de premios */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>OCTAVO: Entrega de premios</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-4 text-base text-gray-700 leading-relaxed">
              <p>Para efectos de coordinar la entrega de los premios respectivos, el ganador deberá comunicarse a través de un DM mensaje privado al Instagram de Atrevia® y deberán validar sus datos, conforme a lo detallado en el anterior numeral.</p>
              <p>Una vez validados los datos del ganador, Atrevia® contará con un plazo que no excederá los treinta (30) días hábiles luego del día en que se realizó la comunicación con el ganador, para coordinar la entrega de los premios.</p>
              <p>En el supuesto de que no existan participaciones o existieran participaciones insuficientes a criterio exclusivo de Agrovet, no se entregará el premio indicado al tratarse de un supuesto ajeno a la esfera de control de Atrevia®.</p>
              <p>Se dejará constancia de la entrega del premio mediante una fotografía y mediante la firma de un cargo emitido por Atrevia®. El participante declara que cualquiera de los medios o constancia previamente indicados, es prueba plena, suficiente y de fecha cierta del cumplimiento de la entrega del premio, conforme a los presentes términos y condiciones.</p>
              <p>Imprecisiones, inexactitudes o errores en la información de contacto consignada, incluyendo el domicilio, podrían determinar la pérdida del premio a criterio de Atrevia®.</p>
            </CardContent>
          </Card>

          {/* NOVENO: Protección de datos */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>NOVENO: Protección de datos personales y recibo de premios</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-4 text-base text-gray-700 leading-relaxed">
              <p>Atrevia® cumple con informar que el responsable del tratamiento de los datos personales es Agrovet S.A. con RUC N° 20250406941 y con domicilio en Av. Canadá 3792, Villa Jardín, San Luis.</p>
              <p>Asimismo, Atrevia® cumple con informar a los participantes que sus datos personales serán tratados para la preparación, celebración y ejecución de las actividades vinculadas a la presente promoción. Además, para efectos de cumplir con la finalidad señalada en el párrafo anterior, Atrevia® cuenta con el apoyo de otras empresas, terceros proveedores de servicios, que actúan en calidad de encargados de tratamiento; los cuales, tienen acceso a los datos personales; sin perjuicio de las medidas de seguridad establecidas para el efecto.</p>
              <p>Mediante la participación en la presente promoción, el participante declara conocer y comprender plenamente que Atrevia® tratará sus datos personales proporcionados en el presente concurso únicamente con la finalidad antes indicada pues, caso contrario, Atrevia® no podría realizar las gestiones pertinentes y encaminadas a dar curso a la actividad promocional.</p>
              <p>El responsable del tratamiento de los datos personales respectivos es Atrevia®, la cual declara que los datos entregados serán tratados de manera reservada y atendiendo a los principios de confidencialidad y seguridad de la información, por tanto, resaltamos que la información suministrada a lo largo del desarrollo de la actividad promocional no será compartida con terceros no autorizados y se tratarán de acuerdo con las finalidades descritas.</p>
              <p>Es condición esencial para recibir el premio el que el participante ganador otorgue su consentimiento para que su identidad sea divulgada, así como para que las imágenes filmadas y las fotografías tomadas, sean exhibidas por cualquier medio de comunicación, incluyendo medios de comunicación masiva tales como internet, redes sociales, televisión, radio, prensa, o a nivel de puntos de venta, si Atrevia® lo dispusiere, únicamente para efectos de comunicar los resultados de la Promoción. El participante ganador no podrá reclamar exclusividad, ni derechos para exhibición, ni podrá exigir su previa aprobación del material en que va a aparecer su imagen, nombre o voz, en tal sentido, esta difusión no generará ningún derecho de compensación.</p>
            </CardContent>
          </Card>

          {/* DÉCIMO: Publicación y modificación */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>DÉCIMO: Publicación, modificación y aceptación de los términos y condiciones</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-4 text-base text-gray-700 leading-relaxed">
              <p>Los términos y condiciones de la promoción se encuentran en la descripción de la página de Instagram de Atrevia® (
                <a href="https://www.instagram.com/atreviapets/" style={{ color: BRAND_HEX }} className="underline hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">
                  https://www.instagram.com/atreviapets/
                </a>
                ) a partir del 24 de julio de 2026.
              </p>
              <p>Atrevia® se reserva el derecho de modificar los presentes términos y condiciones, así como dejar sin efecto la presente promoción por cualquier razón que considere discrecionalmente justificada debiendo para tal efecto dar aviso a través de las redes sociales de Agrovet, la misma que el participante declara conocer como el único canal oficial de revelación de información referente a la presente promoción.</p>
            </CardContent>
          </Card>

          {/* DÉCIMO PRIMERO: Exclusiones */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>DÉCIMO PRIMERO: Exclusiones y prohibiciones</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-4 text-base text-gray-700 leading-relaxed">
              <p>Queda expresamente prohibido y por ende no podrán participar en esta Promoción, ni poder solicitar ningún tipo de premio, los trabajadores de Agrovet S.A. La prohibición de participación que afecta a los citados trabajadores se extiende también a aquellos colaboradores, profesionales o técnicos que, no siendo trabajadores, presten servicios en las citadas empresas en los presentes términos y condiciones, a cualquier título. Se hace extensiva esta prohibición a los cónyuges, y parientes de los citados trabajadores, profesionales, técnicos y prestadores de servicios, hasta el segundo grado de consanguinidad o afinidad.</p>
              <p>De la misma forma, no podrá participar ninguna persona y/o colaborador que haya podido estar relacionado de alguna manera con la organización y logística del sorteo "Atrevia te lleva a conocer a Chayanne".</p>
              <p>En caso de controversia relacionada con la identidad de un participante, el titular del DNI, Carné de extranjería o PTP utilizado durante el proceso de participación en la Promoción será considerado como el usuario participante. Atrevia® no será responsable por aquellas participaciones que no se reciban a causa de fallas de transmisión, técnicas o cualquier otra situación no imputable a Atrevia®.</p>
              <p>No podrán participar de la presente promoción los trabajadores de las agencias ejecutoras de la campaña.</p>
              <p>Atrevia® no puede asegurar la accesibilidad permanente a Internet o a la página web de la promoción dado que situaciones técnicas pueden presentarse o por tratarse de circunstancias ajenas a la esfera de control de Atrevia®. En ese sentido, el participante libera de responsabilidad a Atrevia® por cualquier evento relacionado a la accesibilidad del participante.</p>
            </CardContent>
          </Card>

          {/* DÉCIMO SEGUNDO: Fraude */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>DÉCIMO SEGUNDO: Participaciones fraudulentas</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-4 text-base text-gray-700 leading-relaxed">
              <p>Estará prohibido y será anulado cualquier intento o método de participación en este sorteo que se realice por cualquier proceso, técnica o mecánica de participación distinta a la detallada precedentemente. La utilización de técnicas de participación en esta Promoción, que Atrevia® logre identificar, de naturaleza robótica, repetitiva, automática, programada, mecanizada o similar llevará a la anulación de la participación de que se trate.</p>
              <p>Atrevia®, asimismo, se reserva el derecho a su entera discreción, de descalificar a cualquier participante que considere que está manipulando el proceso o el funcionamiento de la actividad, o que no cumpla con los presentes términos y condiciones o actúe de una forma anticompetitiva o problemática. Cualquier intento de alguna persona por perjudicar el funcionamiento legítimo de esta actividad y/o de la participación de otro participante, podrá constituir una violación de las leyes civiles y penales. En caso de producirse dicho intento, Atrevia® se reserva el derecho de excluirlo de la actividad promocional y de demandar a dicha persona por los daños y perjuicios ocasionados a Atrevia® dentro de los límites de la ley.</p>
              <p>En caso de detectarse adulteración o manipulación de información, o que la misma sea errada, falsa, Atrevia® se reserva el derecho de eliminar a cualquier participante que defraude, altere o modifique el normal y buen funcionamiento de la dinámica y/o que recurra, mediante esquemas o estrategias no convencionales, a una participación que afecte el normal desenvolvimiento de la actividad y/o que perjudique los intereses de otros participantes, atentando contra el principio en virtud del cual todos los usuarios deben participar en igualdad de condiciones y con estricto cumplimiento del principio de buena fe.</p>
              <p>Atrevia® retiene la facultad de calificar qué conducta constituye fraude en el contexto de la promoción en tanto desnaturaliza la finalidad promocional o la mecánica de la promoción.</p>
              <p>En caso se encuentre algún intento de fraude dentro de la promoción, la persona podrá ser retirada automáticamente de la promoción y se le retirará el premio.</p>
            </CardContent>
          </Card>

          {/* DÉCIMO TERCERO: Reclamos */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>DÉCIMO TERCERO: Reclamos</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6 space-y-4 text-base text-gray-700 leading-relaxed">
              <p>Toda inconformidad (queja/reclamo/sugerencia) se deberá realizar durante el tiempo que dure la promoción, es decir; los reclamos realizados después del 15 de octubre de 2026 se entenderán por no formulados.</p>
              <p>La emisión y difusión de opiniones adversas al producto, la promoción, la marca o Agrovet S.A. podría constituir una acción perjudicial susceptible de ser indemnizada por afectar reputacionalmente a la empresa de manera grave.</p>
            </CardContent>
          </Card>

          {/* DÉCIMO CUARTO: Ley aplicable */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>DÉCIMO CUARTO: Ley aplicable</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6">
              <p className="text-base text-gray-700 leading-relaxed">Los participantes reconocen y aceptan que la ley aplicable para cualquier controversia que surja con relación a la actividad promocional será la de Perú y renuncian a su derecho de iniciar cualquier tipo de reclamación en otra jurisdicción.</p>
            </CardContent>
          </Card>

          {/* DÉCIMO QUINTO: Divulgación */}
          <Card className="shadow-md overflow-hidden border-0 rounded-xl">
            <div
              className="px-6 md:px-8 py-5"
              style={{ background: `linear-gradient(90deg, ${BRAND_LIGHT}, transparent)` }}
            >
              <SectionTitle>DÉCIMO QUINTO: Divulgación</SectionTitle>
            </div>
            <CardContent className="px-6 md:px-8 py-6">
              <p className="text-base text-gray-700 leading-relaxed">
                Los presentes términos y condiciones se encuentran disponibles para su consulta durante toda la vigencia de la actividad, en la descripción de la página de Instagram de Atrevia® (
                <a href="https://www.instagram.com/atreviapets/" style={{ color: BRAND_HEX }} className="underline hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">
                  https://www.instagram.com/atreviapets/
                </a>
                ). Cualquier modificación o información relativa a la promoción, será informada a través de dicha página entendiéndose que dicha difusión constituye el único y adecuado mecanismo de revelación de información.
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}