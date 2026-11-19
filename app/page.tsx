"use client";
import { useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbztOE23wuY0kcXE3IWTx378v8in5Y9JtSGEBwbVTjs0xIJUkhB2PQLqVu9SXSLkFVUoyw/exec";

interface Pregunta {
  texto: string;
  esGanancia?: boolean;
  mostrarDato: boolean;
  mePasa?: string;
  noMePasa?: string;
  fuente?: string;
}

// 1. BANCO CON DATO (Frases completas y claras, sin títulos sueltos)
const bancoConDato: Record<string, Pregunta[]> = {
  "13-18": [
    {
      texto: "¿Te pasa o conocés a alguien que haya dejado de salir con amigos para no gastar en bondi o tren?",
      mostrarDato: true,
      mePasa: "No es un caso aislado: hoy se hacen 1 de cada 5 viajes menos en colectivo que en 2023 y el boleto subió 1.302%.",
      noMePasa: "Aunque no lo veas de cerca, se viaja 21% menos en colectivo que en 2023 y el boleto subió 1.302%.",
      fuente: "IAG en base a CNRT, AAETA e INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien en cuya casa tuvieron que gastar ahorros, pedir prestado o vender algo para llegar a fin de mes?",
      mostrarDato: true,
      mePasa: "Pasa en casi la mitad de los hogares del país: el 47,7% tuvo que recurrir a eso para llegar a fin de mes.",
      noMePasa: "Aunque no te toque de cerca, casi la mitad de los hogares del país (47,7%) tuvo que hacerlo.",
      fuente: "IAG en base a EPH-INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien en cuya casa tuvieron que recortar gastos para poder pagar la luz o el gas?",
      mostrarDato: true,
      mePasa: "Pasa en muchas casas: la luz en hogares de ingresos bajos subió 1.065% desde fines de 2023 (la inflación fue 336%).",
      noMePasa: "Aunque no lo veas de cerca, la luz subió más de 1.000% en todos los hogares (la inflación fue 336%).",
      fuente: "IAG en base a ENRE e INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien en cuya casa compran menos carne, leche o yerba que antes?",
      mostrarDato: true,
      mePasa: "Pasa en todo el país: el consumo de carne, leche y yerba tuvo su segundo primer semestre más bajo desde 2015.",
      noMePasa: "Aunque no te toque de cerca, el consumo de carne, leche y yerba cayó 0,8% en el último año.",
      fuente: "IAG en base a INDEC"
    }
  ],
  "19-24": [
    {
      texto: "¿Te pasa o conocés a alguien que hoy trabaje sin aportes, en negro o haciendo changas?",
      mostrarDato: true,
      mePasa: "No es un caso aislado: el 45,2% de los ocupados trabaja sin protección. Desde 2024 se sumaron 626 mil puestos así.",
      noMePasa: "Aunque en tu entorno tengan trabajo protegido, desde 2024 se sumaron 626 mil puestos sin protección.",
      fuente: "IAG en base a EPH-INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien que curse menos materias o falte a clase para no gastar tanto en viajes?",
      mostrarDato: true,
      mePasa: "Tiene explicación: desde fines de 2023 el boleto de tren subió 2.741% y el subte 1.926%.",
      noMePasa: "Aunque no lo veas de cerca, se viaja 20% menos en tren y 19% menos en subte que en 2023.",
      fuente: "IAG en base a CNRT e IDECBA"
    },
    {
      texto: "¿Te pasa o conocés a alguien que sienta que el sueldo le alcanza menos que hace un año?",
      mostrarDato: true,
      mePasa: "No es una sensación: el salario privado registrado perdió 3,9% contra la inflación en el último año.",
      noMePasa: "Aunque en tu entorno rinda igual, el salario privado registrado cayó 3,9% real en el último año.",
      fuente: "IAG en base a SIPA e INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien que haya tenido que pedirle plata prestada a un familiar o amigo para llegar a fin de mes?",
      mostrarDato: true,
      mePasa: "Pasa mucho: el 16,2% de los hogares tuvo que endeudarse con conocidos para llegar a fin de mes.",
      noMePasa: "Aunque no te toque de cerca, 1 de cada 6 hogares tuvo que pedirle plata prestada a un conocido.",
      fuente: "IAG en base a EPH-INDEC"
    }
  ],
  "25-35": [
    {
      texto: "¿Te pasa o conocés a alguien a quien los servicios (luz, gas, agua, transporte) le coman más parte del sueldo que antes?",
      mostrarDato: true,
      mePasa: "No es una sensación: esa canasta ya se lleva el 11% de un sueldo privado, cuando a principios de 2023 era el 6%.",
      noMePasa: "Aunque no lo sientas de cerca, para un sueldo privado promedio el peso de los servicios pasó del 6% al 11%.",
      fuente: "IAG en base a INDEC y SIPA"
    },
    {
      texto: "¿Te pasa o conocés a alguien que haga changas, apps o un segundo trabajo para llegar a fin de mes?",
      mostrarDato: true,
      mePasa: "Es una tendencia fuerte: desde 2024 se sumaron 626 mil puestos sin protección y se perdieron 56 mil protegidos.",
      noMePasa: "Aunque no lo veas de cerca, el 45,2% de los ocupados ya trabaja sin aportes ni continuidad.",
      fuente: "IAG en base a EPH-INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien que haya dejado de comprar carne, leche o yerba, o pasado a segundas marcas?",
      mostrarDato: true,
      mePasa: "Pasa en todo el país: el consumo de básicos tuvo su segundo primer semestre más bajo desde 2015.",
      noMePasa: "Aunque no te toque de cerca, las ventas en supermercados cayeron 2,1% en el último año.",
      fuente: "IAG en base a INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien que haya tenido que financiarse con la tarjeta o sacar un préstamo para llegar a fin de mes?",
      mostrarDato: true,
      mePasa: "No es un caso aislado: el 14,8% de los hogares se endeudó con bancos o tarjetas para llegar a fin de mes.",
      noMePasa: "Aunque en tu entorno estén al día, la morosidad de las personas subió 13 puntos en dos años.",
      fuente: "IAG en base a EPH-INDEC y BCRA"
    }
  ],
  "36-55": [
    {
      texto: "¿Te pasa o conocés a alguien a quien la boleta de luz o gas lo obligó a recortar otros gastos del mes?",
      mostrarDato: true,
      mePasa: "Les pasa a casi todos: la luz subió más de 1.000% en todos los hogares desde fines de 2023 (la inflación fue 336%).",
      noMePasa: "Aunque no lo veas de cerca, para un hogar medio sin subsidio la luz subió 1.798%.",
      fuente: "IAG en base a ENRE e INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien que haya tenido que gastar ahorros, vender algo o endeudarse para llegar a fin de mes?",
      mostrarDato: true,
      mePasa: "Pasa en casi la mitad de los hogares del país: el 47,7% tuvo que hacerlo para llegar a fin de mes.",
      noMePasa: "Aunque no te toque de cerca, casi la mitad de los hogares del país (47,7%) tuvo que hacerlo.",
      fuente: "IAG en base a EPH-INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien que cargue menos nafta o use menos el auto por lo que cuesta?",
      mostrarDato: true,
      mePasa: "Tiene explicación: el impuesto ya es el 20% del precio de la nafta (era 8,9%) y pagamos el litro 23% más caro que en EE.UU.",
      noMePasa: "Aunque no te frene, en el Presupuesto 2027 el impuesto a los combustibles es lo que más sube (+59,3%).",
      fuente: "IAG en base a Secretaría de Energía y OPC"
    },
    {
      texto: "¿Te pasa o conocés a alguien que haya perdido su empleo en blanco en el último tiempo?",
      mostrarDato: true,
      mePasa: "No es un caso aislado: desde noviembre de 2023 se pierden 276 empleos privados registrados por día.",
      noMePasa: "Aunque en tu entorno sigan con trabajo, ya se perdieron 265.765 empleos privados registrados desde nov. 2023.",
      fuente: "IAG en base a SIPA"
    }
  ],
  "56+": [
    {
      texto: "¿Te pasa o conocés a alguien que haya tenido que usar ahorros para pagar gastos del mes?",
      mostrarDato: true,
      mePasa: "No es un caso aislado: el 36% de los hogares (3,7 millones) tuvo que gastar ahorros para llegar a fin de mes.",
      noMePasa: "Aunque no te toque de cerca, hoy hay 568 mil hogares más que en 2023 que sí tuvieron que gastar ahorros.",
      fuente: "IAG en base a EPH-INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien que haya recortado el uso de la luz o el gas por miedo a la boleta?",
      mostrarDato: true,
      mePasa: "Tiene explicación: el gas en hogares de ingresos bajos subió 763% y la garrafa 871% (la inflación fue 336%).",
      noMePasa: "Aunque no te toque de cerca, los servicios ya se llevan el 11% de un sueldo privado (a principios de 2023 era el 6%).",
      fuente: "IAG en base a ENARGAS e INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien que compre menos carne, leche o yerba que antes?",
      mostrarDato: true,
      mePasa: "Pasa en todo el país: el consumo de básicos tuvo su segundo primer semestre más bajo desde 2015.",
      noMePasa: "Aunque no lo veas de cerca, el consumo de lácteos, carne y yerba cayó 0,8% en el último año.",
      fuente: "IAG en base a INDEC"
    },
    {
      texto: "¿Te pasa o conocés a alguien que haya tenido que pedirle una mano a hijos o familiares para llegar a fin de mes?",
      mostrarDato: true,
      mePasa: "Pasa mucho: el 16,2% de los hogares tuvo que pedirle plata a familiares o conocidos para llegar a fin de mes.",
      noMePasa: "Aunque no te toque de cerca, 1 de cada 6 hogares tuvo que pedirle plata a un conocido.",
      fuente: "IAG en base a EPH-INDEC"
    }
  ]
};

// 2. BANCO SIN DATO (Tus preguntas cotidianas originales, pasan rápido sin frenar)
const bancoSinDato: Record<string, string[]> = {
  "13-18": [
    "¿Te pasa o conocés a alguien que haya tenido que dejar un deporte o club porque la cuota se volvió muy cara?",
    "¿Te pasa o conocés a alguien que haya cambiado las salidas del finde por plazas o casas porque salir te liquida la plata?",
    "¿Te pasa o conocés a alguien que esté estirando el uso de las mismas zapatillas o ropa porque comprar algo nuevo hoy es imposible?",
    "¿Te pasa o conocés a alguien que ande con la pantalla del celular rota o la batería muriendo porque arreglarlo cuesta una fortuna?",
    "¿Te pasa o conocés a alguien que haya cancelado suscripciones de música o series porque dejó de ser prioridad?",
    "¿Te pasa o conocés a alguien que haya pateado la compra de un juego o tecnología porque con los aumentos es imposible pedirlo en casa?"
  ],
  "19-24": [
    "¿Te pasa o conocés a alguien que haya tenido que elegir muchísimo a qué recitales o salidas ir, descartando planes que antes hacía sin pensar?",
    "¿Te pasa o conocés a alguien para quien la idea de irse a vivir solo quedó totalmente cajoneada por lo que cuesta un alquiler?",
    "¿Te pasa o conocés a alguien que haya empezado a vestirse con ropa de feria o segunda mano porque comprar ropa nueva se volvió imposible?",
    "¿Te pasa o conocés a alguien que haya tenido que aceptar un laburo con sueldo bajo porque necesitaba plata urgente?",
    "¿Te pasa o conocés a alguien de tu edad que haya tenido que volver a vivir con su familia por los aumentos?"
  ],
  "25-35": [
    "¿Te pasa o conocés a alguien que haya tenido que dejar en la góndola gustos que antes eran intocables, como un buen café o ciertos quesos?",
    "¿Te pasa o conocés a alguien que haya pausado proyectos como planear vacaciones, arreglar el auto o mudarse?",
    "¿Te pasa o conocés a alguien que haya reducido muchísimo las salidas a comer afuera?",
    "¿Te pasa o conocés a alguien que haya dejado de comprar ropa o gastar en un hobby porque cualquier gasto extra lo deja en rojo?",
    "¿Te pasa o conocés a alguien que haya dado de baja plataformas de streaming porque el gasto ahoga?"
  ],
  "36-55": [
    "¿Te pasa o conocés a alguien que haya dejado en pausa los arreglos de la casa por humedad o pintura porque los materiales son un lujo?",
    "¿Te pasa o conocés a alguien que haya tenido que dejar en la góndola gustos que antes eran intocables, como un buen café o ciertos quesos?",
    "¿Te pasa o conocés a alguien que haya descartado o acortado la idea de irse de vacaciones?",
    "¿Te pasa o conocés a alguien que mire con miedo el resumen de la tarjeta y termine pagando solo el mínimo?",
    "¿Te pasa o conocés a alguien que haya tenido que atar con alambre un electrodoméstico o el auto para no endeudarse en el taller?"
  ],
  "56+": [
    "¿Te pasa o conocés a alguien que haya tenido que empezar a elegir qué medicamento comprar o cambiar por una marca más barata?",
    "¿Te pasa o conocés a alguien que haya dejado de juntarse a tomar un café o comer afuera porque cualquier salida implica un gasto?",
    "¿Te pasa o conocés a alguien que haya tenido que dejar en la góndola gustos que antes eran intocables, como un buen café o ciertos quesos?",
    "¿Te pasa o conocés a alguien a quien le cancelaron descuentos en la farmacia y de golpe tuvo que pagar de bolsillo?",
    "¿Te pasa o conocés a alguien que haya dejado de usar el auto por el costo de la nafta?"
  ]
};

// 3. TARJETAS DE GANANCIA (1 por sesión, siempre con dato, NO suma al puntaje)
const obtenerTarjetasGanancia = (edad: string): Pregunta[] => {
  const esJoven = edad === "13-18";
  return [
    {
      texto: esJoven ? "¿En tu familia compraron dólares para ahorrar en los últimos meses?" : "¿Compraste dólares para ahorrar en los últimos meses?",
      esGanancia: true,
      mostrarDato: true,
      mePasa: "Estás del lado que pudo ahorrar: desde el fin del cepo, las personas compran USD 3.000 millones por mes para guardar.",
      noMePasa: "No sos parte de los que guardan USD 3.000 millones por mes. Mientras tanto, 3,7 millones de hogares gastaron sus ahorros.",
      fuente: "IAG en base a BCRA y EPH-INDEC"
    },
    {
      texto: esJoven ? "¿En tu familia cambiaron el auto o compraron un 0 km este año?" : "¿Cambiaste el auto o compraste un 0 km este año?",
      esGanancia: true,
      mostrarDato: true,
      mePasa: "Estás del lado que sigue consumiendo: autos e inmuebles suben 8,5%, mientras carne, leche y yerba caen.",
      noMePasa: "La mayoría tampoco. El consumo se parte en dos: autos e inmuebles suben 8,5%, mientras carne, leche y yerba caen 0,8%.",
      fuente: "IAG en base a INDEC"
    },
    ...(esJoven
      ? []
      : [
          {
            texto: "¿Pagás Bienes Personales?",
            esGanancia: true,
            mostrarDato: true,
            mePasa: "Estás del lado que ganó: la baja de Bienes Personales le costó al Estado $2,8 billones en 2025, más que todo el recorte a universidades.",
            noMePasa: "No sos parte del 2% más rico al que le bajaron Bienes Personales. A ellos les bajaron el impuesto; a vos te subieron el de la nafta al 20%.",
            fuente: "IAG en base a ARCA y OPC"
          }
        ])
  ];
};

function LogoFijo() {
  return (
    <div className="fixed bottom-3 sm:bottom-5 inset-x-0 flex justify-center z-40 pointer-events-none select-none">
      <img
        src="/logo.png"
        alt="MDF"
        className="h-12 sm:h-16 md:h-20 w-auto opacity-95 drop-shadow-lg"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

export default function Home() {
  const [pantalla, setPantalla] = useState("formulario");
  const [datos, setDatos] = useState({
    nombre: "",
    edad: "",
    telefono: "",
    localidad: "",
    email: ""
  });

  const [preguntasJuego, setPreguntasJuego] = useState<Pregunta[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [feedbackActual, setFeedbackActual] = useState<{
    texto: string;
    fuente: string;
  } | null>(null);

  const manejarCambio = (e: any) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const comenzarJuego = (e: any) => {
    e.preventDefault();

    // 1. Sorteamos 2 preguntas de pérdida CON DATO (IAG)
    const conDato = [...(bancoConDato[datos.edad] || [])]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);

    // 2. Sorteamos 2 preguntas de pérdida SIN DATO (tuyas cotidianas)
    const sinDato: Pregunta[] = [...(bancoSinDato[datos.edad] || [])]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2)
      .map((texto) => ({
        texto,
        esGanancia: false,
        mostrarDato: false
      }));

    // 3. Sorteamos 1 tarjeta de GANANCIA (siempre con dato)
    const ganancias = obtenerTarjetasGanancia(datos.edad);
    const gananciaElegida = ganancias[Math.floor(Math.random() * ganancias.length)];

    // 4. Mezclamos las 5 (total: 3 con dato, 2 rápidas sin dato)
    const mazoFinal = [...conDato, ...sinDato, gananciaElegida].sort(() => 0.5 - Math.random());

    setPreguntasJuego(mazoFinal);
    setIndiceActual(0);
    setPuntaje(0);
    setFeedbackActual(null);
    setPantalla("juego");
  };

  const calcularMensajeFinal = (pts: number) => {
    if (pts === 0) {
      return "Estás en la mitad que todavía llega a fin de mes sin gastar ahorros ni endeudarse. La otra mitad (47,7% de los hogares) no. ¿Nos ayudás a cambiarlo?";
    } else if (pts >= 1 && pts <= 2) {
      return "Venís esquivando los golpes, pero el ajuste te pisa los talones: desde fines de 2023 se pierden 276 empleos registrados por día. Es hora de cambiar el rumbo.";
    } else {
      return "No te falta esfuerzo: la mitad más pobre paga el 36% de su ingreso en impuestos y el 10% más rico, el 26%. Y a los que más tienen les bajaron Bienes Personales. Debemos ponerle un freno a Milei.";
    }
  };

  const finalizarYEnviar = (puntajeFinal: number) => {
    const resultadoTexto = calcularMensajeFinal(puntajeFinal);

    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: datos.nombre,
        edad: datos.edad,
        telefono: datos.telefono,
        localidad: datos.localidad,
        email: datos.email,
        puntaje: puntajeFinal,
        resultado: resultadoTexto
      })
    }).catch((err) => console.error("Error guardando datos:", err));

    setPantalla("resultado");
  };

  const avanzar = (puntajeActualizado: number) => {
    setFeedbackActual(null);
    if (indiceActual < 4) {
      setIndiceActual(indiceActual + 1);
    } else {
      finalizarYEnviar(puntajeActualizado);
    }
  };

  const responder = (mePasa: boolean) => {
    const preguntaActual = preguntasJuego[indiceActual];
    // La tarjeta de ganancia NO suma al puntaje de vulnerabilidad (0 a 4)
    const nuevoPuntaje = mePasa && !preguntaActual.esGanancia ? puntaje + 1 : puntaje;
    setPuntaje(nuevoPuntaje);

    if (preguntaActual.mostrarDato && preguntaActual.mePasa && preguntaActual.noMePasa) {
      setFeedbackActual({
        texto: mePasa ? preguntaActual.mePasa : preguntaActual.noMePasa,
        fuente: preguntaActual.fuente || "IAG"
      });
    } else {
      avanzar(nuevoPuntaje);
    }
  };

  if (pantalla === "formulario") {
    return (
      <main
        className="h-dvh w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-4"
        style={{ backgroundImage: "url('/fondo-limpio.jpg')" }}
      >
        <div className="bg-black/70 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-md border border-white/20 mb-14">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Me pasa o No me pasa</h1>
          <form onSubmit={comenzarJuego} className="flex flex-col gap-3.5">
            <input
              type="text"
              name="nombre"
              placeholder="Tu Nombre completo"
              required
              className="p-3 rounded-lg bg-white text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={manejarCambio}
            />
            <select
              name="edad"
              required
              className="p-3 rounded-lg bg-white text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={manejarCambio}
            >
              <option value="">Seleccioná tu edad...</option>
              <option value="13-18">13 - 18 años</option>
              <option value="19-24">19 - 24 años</option>
              <option value="25-35">25 - 35 años</option>
              <option value="36-55">36 - 55 años</option>
              <option value="56+">56+ años</option>
            </select>
            <input
              type="tel"
              name="telefono"
              placeholder="Tu Teléfono"
              required
              className="p-3 rounded-lg bg-white text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={manejarCambio}
            />
            <input
              type="text"
              name="localidad"
              placeholder="Tu Localidad"
              required
              className="p-3 rounded-lg bg-white text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={manejarCambio}
            />
            <input
              type="email"
              name="email"
              placeholder="Tu Email (Opcional)"
              className="p-3 rounded-lg bg-white text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={manejarCambio}
            />
            <button
              type="submit"
              className="mt-3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all shadow-lg"
            >
              Comenzar
            </button>
          </form>
        </div>
        <LogoFijo />
      </main>
    );
  }

  if (pantalla === "juego") {
    return (
      <main
        className="h-dvh w-full bg-cover bg-center bg-no-repeat flex flex-col items-center p-4 sm:p-6 relative overflow-hidden"
        style={{ backgroundImage: "url('/fondo-limpio.jpg')" }}
      >
        <div className="absolute top-4 right-4 text-white font-bold bg-black/50 px-4 py-2 rounded-full border border-white/20 z-20">
          {indiceActual + 1} / 5
        </div>

        <div className="flex-1 w-full flex flex-col items-center justify-center gap-6 sm:gap-10 pb-24 sm:pb-28">
          {/* TARJETA DE PREGUNTA (SIEMPRE IGUAL, NO CAMBIA DE PANTALLA) */}
          <div className="w-full max-w-[92vw] sm:max-w-[540px]">
            <div className="rounded-2xl border border-cyan-100/40 bg-gradient-to-br from-cyan-400/10 via-white/10 to-cyan-300/10 backdrop-blur-md shadow-[0_0_45px_rgba(103,232,249,0.25)] px-6 py-6 sm:px-10 sm:py-8">
              <h2 className="text-white font-bold text-center leading-snug drop-shadow-md text-[clamp(0.95rem,3.4vw,1.35rem)] sm:text-[clamp(1rem,1.7vw,1.4rem)]">
                {preguntasJuego[indiceActual]?.texto}
              </h2>
            </div>
          </div>

          {/* ZONA INFERIOR: BOTONES O RECUADRO COMPACTO CON EL DATO */}
          {feedbackActual ? (
            <div className="w-full max-w-[92vw] sm:max-w-[540px] flex flex-col items-center gap-5">
              <div className="w-full rounded-xl border border-cyan-300/40 bg-black/55 backdrop-blur-md px-5 py-4 sm:px-7 sm:py-5 text-center shadow-lg">
                <p className="text-cyan-100 font-semibold text-sm sm:text-lg leading-snug">
                  {feedbackActual.texto}
                </p>
                <span className="block text-[11px] sm:text-xs text-gray-300/80 mt-2">
                  Fuente: {feedbackActual.fuente}
                </span>
              </div>

              <button
                onClick={() => avanzar(puntaje)}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold py-3 px-10 rounded-full text-base sm:text-lg shadow-xl transition-transform active:scale-95"
              >
                {indiceActual < 4 ? "Siguiente pregunta →" : "Ver resultado →"}
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-6 md:gap-20 w-full">
              <button
                onClick={() => responder(false)}
                className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[160px] md:h-[160px] aspect-square flex-shrink-0 hover:scale-105 transition-transform active:scale-95"
              >
                <img
                  src="/NO ME PASA.png"
                  alt="No me pasa"
                  draggable={false}
                  className="w-full h-full object-contain drop-shadow-2xl select-none pointer-events-none"
                />
              </button>
              <button
                onClick={() => responder(true)}
                className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[160px] md:h-[160px] aspect-square flex-shrink-0 hover:scale-105 transition-transform active:scale-95"
              >
                <img
                  src="/NO ME PASA (1).png"
                  alt="Me pasa"
                  draggable={false}
                  className="w-full h-full object-contain drop-shadow-2xl select-none pointer-events-none"
                />
              </button>
            </div>
          )}
        </div>

        <LogoFijo />
      </main>
    );
  }

  if (pantalla === "resultado") {
    return (
      <main
        className="h-dvh w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-4"
        style={{ backgroundImage: "url('/fondo-limpio.jpg')" }}
      >
        <div className="bg-black/80 p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-lg backdrop-blur-md border border-white/30 text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 uppercase tracking-wider">
            Resultado
          </h2>
          <p className="text-lg sm:text-2xl text-gray-200 font-medium leading-relaxed italic mb-8">
            "{calcularMensajeFinal(puntaje)}"
          </p>
          <button
            onClick={() => setPantalla("formulario")}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
          >
            Volver al inicio
          </button>
          <img
            src="/logo.png"
            alt="MDF"
            className="h-12 sm:h-14 w-auto mt-8 opacity-95"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </main>
    );
  }
}