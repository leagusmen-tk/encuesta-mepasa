"use client";
import { useState } from "react";

// BASE DE DATOS DE PREGUNTAS
const bancoDePreguntas: any = {
  "13-18": [
    "¿Te pasa o escuchaste que alguien pensó en aflojar con la escuela o buscar una changa porque en la casa la plata no alcanza?",
    "¿Te pasa o escuchaste que el costo del pasaje limita las salidas y a veces prefieren no salir para no gastar en bondi o tren?",
    "¿Te pasa o escuchaste que comprar en el kiosco de la escuela ya no es de todos los días y ahora hay que llevarse algo de casa o no comer hasta volver?",
    "¿Te pasa o escuchaste que alguien tuvo que dejar un deporte o club, o cambiarse a un lugar más barato, porque la cuota se volvió muy cara?",
    "¿Te pasa o escuchaste que las salidas del finde cambiaron y ahora se juntan en plazas o casas porque ir a otro lado te liquida la plata?",
    "¿Te pasa o escuchaste que tuvieron que patear la compra de un juego o algo de tecnología porque con los aumentos es imposible pedirlo en casa?",
    "¿Te pasa o escuchaste que están estirando el uso de las mismas zapatillas o ropa porque pedir algo nuevo hoy es un dolor de cabeza económico?",
    "¿Te pasa o escuchaste que cancelaron suscripciones de música o series y se bancan las publicidades porque pagarlo dejó de ser prioridad?",
    "¿Te pasa o escuchaste que andan con la pantalla del celular rota o la batería muriendo y aprendieron a convivir con eso porque arreglarlo cuesta una fortuna?",
    "¿Te pasa o escuchaste que empezaron a esquivar las fotocopias del colegio arreglándose con fotos en el celular o copiando a mano para ahorrar unos pesos?"
  ],
  "19-24": [
    "¿Te pasa o escuchaste que alguien tuvo que aceptar un laburo con un sueldo bajo porque necesitaba plata urgente y no podía ponerse exquisito?",
    "¿Te pasa o escuchaste que alguien tuvo que cursar menos materias o hacer malabares con los horarios de la facultad para no gastar tanto en transporte?",
    "¿Te pasa o escuchaste que la idea de irse a vivir solo quedó totalmente cajoneada por lo que cuesta sostener un alquiler?",
    "¿Te pasa o escuchaste que, por más que manden CVs, las opciones de trabajo rápido se reducen a agarrar cualquier cosa?",
    "¿Te pasa o escuchaste que tuvieron que elegir muchísimo a qué recitales o salidas ir, descartando planes que antes hacían sin pensar?",
    "¿Te pasa o escuchaste que alguien de tu edad tuvo que volver a vivir con su familia, o asumió que no le va a quedar otra si todo sigue subiendo?",
    "¿Te pasa o escuchaste que empezaron a vestirse con ropa de feria o segunda mano y dejaron de comprar ropa nueva?",
    "¿Te pasa o escuchaste que, ante la falta de laburo o para bancar los estudios, la única salida rápida fue bajarse una app de delivery o transporte?"
  ],
  "25-35": [
    "¿Te pasa o escuchaste que alguien pensó en la próxima actualización del alquiler y asumió que va a tener que tarjetear gastos o achicarse para sobrevivir?",
    "¿Te pasa o escuchaste que las compras cambiaron y tuvieron que dejar en la góndola gustos que antes eran intocables, como un buen café o ciertos quesos?",
    "¿Te pasa o escuchaste que con el aumento del monotributo la plata del laburo rinde cada vez menos?",
    "¿Te pasa o escuchaste que alguien pateó la consulta del veterinario, atrasó la pipeta o le cambió el alimento a su mascota por uno más barato?",
    "¿Te pasa o escuchaste que pausaron proyectos como planear vacaciones, arreglar el auto o mudarse, porque económicamente es difícil?",
    "¿Te pasa o escuchaste que tuvieron que dar de baja plataformas de streaming o cancelar suscripciones porque el gasto ahoga?",
    "¿Te pasa o escuchaste que se redujeron las salidas a comer?",
    "¿Te pasa o escuchaste que dejaron de comprar ropa, o gastar en un hobby porque cualquier gasto extra los deja en rojo a fin de mes?",
    "¿Te pasa o escuchaste que alguien tuvo que empezar a meter horas extra manejando un Uber o de delivery después de su laburo principal solo para llegar a fin de mes?"
  ],
  "36-55": [
    "¿Te pasa o escuchaste que alguien recibió la factura de luz o gas y tuvo que recalcular los gastos del mes o tarjetear para pagarla?",
    "¿Te pasa o escuchaste que alguien tuvo que cambiar a sus hijos de actividad o directamente suspenderla por el costo de la cuota?",
    "¿Te pasa o escuchaste que se mira con miedo el resumen de la tarjeta y se paga solo el mínimo?",
    "¿Te pasa o escuchaste que tuvieron que atar con alambre un electrodoméstico o el auto porque meterlo al taller significa endeudarse por meses?",
    "¿Te pasa o escuchaste que alguien bajó la cobertura del seguro, prepaga o internet porque está muy caro?",
    "¿Te pasa o escuchaste que alguien tuvo que buscar changas, vender cosas o hacer horas extras porque el sueldo ya no cubre los gastos fijos?",
    "¿Te pasa o escuchaste que dejaron en pausa los arreglos de la casa por humedad o pintura porque comprar los materiales hoy es un lujo?",
    "¿Te pasa o escuchaste que las compras cambiaron y tuvieron que dejar en la góndola gustos que antes eran intocables, como un buen café o ciertos quesos?",
    "¿Te pasa o escuchaste que descartaron o acortaron la idea de irse de vacaciones?",
    "¿Te pasa o escuchaste que alguien tuvo que empezar a ayudar económicamente a sus padres jubilados o pagarles algún remedio?",
    "¿Te pasa o escuchaste que alguien, además de su trabajo, tuvo que salir a manejar para una app para poder mantener la casa y pagar las tarifas?"
  ],
  "56+": [
    "¿Te pasa o escuchaste que alguien tuvo que empezar a elegir qué medicamento comprar, cuál estirar o cambiar por una marca más barata?",
    "¿Te pasa o escuchaste que alguien tuvo que pedirle una mano a sus hijos o familiares para llegar a fin de mes, o usar ahorros que tenía guardados?",
    "¿Te pasa o escuchaste que cancelaron descuentos en la farmacia o en la obra social y de golpe hay que pagar de bolsillo plata que no estaba contemplada?",
    "¿Te pasa o escuchaste que tuvieron que gastar ahorros para pagar la tarjeta o servicios?",
    "¿Te pasa o escuchaste que alguien empezó a acumular deudas para poder usar esa plata en el supermercado o en la farmacia?",
    "¿Te pasa o escuchaste que pasaron frío en invierno o calor en verano por terror a lo que pueda llegar en la boleta?",
    "¿Te pasa o escuchaste que alguien tuvo que dejar de usar el auto por el costo de la nafta?",
    "¿Te pasa o escuchaste que las compras cambiaron y tuvieron que dejar en la góndola gustos que antes eran intocables, como un buen café o ciertos quesos?",
    "¿Te pasa o escuchaste que dejaron de juntarse a tomar un café o comer afuera porque cualquier salida implica un gasto?",
    "¿Te pasa o escuchaste que algún hijo o nieto tuvo que salir a manejar un Uber o hacer repartos fuera de hora porque con su trabajo ya no le alcanza para mantener a su familia?"
  ]
};

// Logo fijo, siempre visible, siempre en el mismo lugar.
// Si tenés el isotipo "MDF" como PNG transparente, ponelo en /public/logo.png
// y esto lo va a mostrar solo. Si esa imagen no existe, mostramos el texto
// "MDF" como respaldo para que nunca quede un hueco vacío.
function LogoFijo() {
  return (
    <div className="fixed bottom-3 sm:bottom-5 inset-x-0 flex justify-center z-40 pointer-events-none select-none">
      <img
        src="/logo.png"
        alt="MDF"
        className="h-12 sm:h-16 md:h-20 w-auto opacity-95 drop-shadow-lg"
        onError={(e) => {
          // Si no existe /public/logo.png, ocultamos la img rota
          // y dejamos el texto de respaldo que está debajo.
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

export default function Home() {
  const [pantalla, setPantalla] = useState("formulario");
  const [datos, setDatos] = useState({ nombre: "", edad: "", telefono: "", email: "" });

  const [preguntasJuego, setPreguntasJuego] = useState<string[]>([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);

  const manejarCambio = (e: any) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const comenzarJuego = (e: any) => {
    e.preventDefault();
    const preguntasDeSuEdad = bancoDePreguntas[datos.edad] || [];
    const preguntasMezcladas = [...preguntasDeSuEdad]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    setPreguntasJuego(preguntasMezcladas);
    setIndiceActual(0);
    setPuntaje(0);
    setPantalla("juego");
  };

  const responder = (mePasa: boolean) => {
    if (mePasa) {
      setPuntaje(puntaje + 1);
    }
    if (indiceActual < 4) {
      setIndiceActual(indiceActual + 1);
    } else {
      setPantalla("resultado");
    }
  };

  let mensajeFinal = "";
  if (puntaje === 0) {
    mensajeFinal = "Sos parte de ese 1% de la población que logra mantener su día a día frente al ajuste.";
  } else if (puntaje >= 1 && puntaje <= 2) {
    mensajeFinal = "Venís esquivando los golpes, pero el ajuste te pisa los talones: es hora de cambiar el rumbo.";
  } else {
    mensajeFinal = "No te falta esfuerzo: debemos ponerle un freno a Milei.";
  }

  if (pantalla === "formulario") {
    return (
      <main
        className="h-dvh w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-4"
        style={{ backgroundImage: "url('/fondo-limpio.jpg')" }}
      >
        <div className="bg-black/70 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-md border border-white/20">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Me pasa o No me pasa</h1>
          <form onSubmit={comenzarJuego} className="flex flex-col gap-4">
           <input
              type="text" name="nombre" placeholder="Nombre completo" required
              className="p-3 rounded-lg bg-white text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={manejarCambio}
            />
            <select
              name="edad" required
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
              type="tel" name="telefono" placeholder="Tu Teléfono" required
              className="p-3 rounded-lg bg-white text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={manejarCambio}
            />
            <input
              type="email" name="email" placeholder="Tu Email (Opcional)"
              className="p-3 rounded-lg bg-white text-black font-semibold outline-none focus:ring-2 focus:ring-blue-500"
              onChange={manejarCambio}
            />
            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all shadow-lg"
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

        {/*
          Este bloque ocupa todo el alto disponible (flex-1) y centra su
          contenido. pb-24 deja SIEMPRE un colchón libre arriba del logo
          fijo, así el contenido nunca lo puede llegar a tapar, sin
          importar cuánto crezca la tarjeta con preguntas largas.
        */}
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-10 md:gap-14 pb-28 sm:pb-32">

          {/*
            CAMBIO DE ESTRATEGIA: en vez de tratar de encajar el texto
            adentro de cuadro.png (que no podíamos ver ni medir, y por eso
            cada ajuste era prueba y error), el "vidrio" ahora se dibuja
            con CSS puro: blur + borde + gradiente. Esta caja SIEMPRE
            crece lo que el texto necesite (no tiene alto fijo), así que
            es matemáticamente imposible que el texto se desborde o quede
            afuera. Funciona igual con una pregunta corta que con una de
            200 caracteres.
          */}
          <div className="w-full max-w-[92vw] sm:max-w-[520px]">
            <div className="rounded-2xl border border-cyan-100/40 bg-gradient-to-br from-cyan-400/10 via-white/10 to-cyan-300/10 backdrop-blur-md shadow-[0_0_45px_rgba(103,232,249,0.25)] px-6 py-7 sm:px-10 sm:py-9">
              <h2 className="text-white font-bold text-center leading-snug drop-shadow-md text-[clamp(0.95rem,3.4vw,1.35rem)] sm:text-[clamp(1rem,1.7vw,1.4rem)]">
                {preguntasJuego[indiceActual]}
              </h2>
            </div>
          </div>

          {/* BOTONES: mismo box cuadrado estricto para los dos, sin importar el
              margen transparente propio de cada PNG (object-contain los centra) */}
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
        <div className="bg-black/80 p-10 rounded-3xl shadow-2xl w-full max-w-lg backdrop-blur-md border border-white/30 text-center flex flex-col items-center">
          <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-wider">Resultado</h2>
          <p className="text-2xl text-gray-200 font-medium leading-relaxed italic mb-8">
            "{mensajeFinal}"
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