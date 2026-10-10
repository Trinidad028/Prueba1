
// fondo
let fondo;
let tiempoFondo = 0;

// personaje
let Pj = [];
let posXPersonaje = 50;
let velocidadPersonaje = 2;

// Control de pausa
let tiempoDetenidoInicio = 0;
let personajeDetenido = false;
let esperandoEnCentro = false;

// texto
let posYTexto = -50;
let velocidadTexto = 1;

// tiempo y vel
let tiempoInicial;
let intervaloFrame = 150;

function preload() {
  // fondo
  fondo = loadImage("assets/fondocreditos.png");

  // personaje
  for (let i = 1; i < 4; i++) {
    Pj.push(loadImage("assets/Pj-" + i + ".png"));
  }
}

function setup() {
  createCanvas(800, 450);
  tiempoInicial = millis();
}

function draw() {
  background(0);
  tiempoFondo++;
  let tiempoActual = millis() - tiempoInicial;

  if (tiempoActual >= 20000) {
    tiempoInicial = millis();
    tiempoFondo = 0;
    tiempoActual = 0;
  }

  // personaje
  if (!personajeDetenido) {

    if (posXPersonaje < 300) {
      posXPersonaje += velocidadPersonaje;
    } else {

      if (!esperandoEnCentro) {
        tiempoDetenidoInicio = millis();
        esperandoEnCentro = true;
      }


      let tiempoEnEspera = millis() - tiempoDetenidoInicio;
      if (tiempoEnEspera >= 7000) {
        personajeDetenido = true;
      }
    }
  } else {
    posXPersonaje += velocidadPersonaje;
  }

  // texto
  if (posYTexto < 500) {
    posYTexto += velocidadTexto;
  }

  //  Fondo
  dibujarFondo(fondo, 1.5);

  //  Personaje
  if (posXPersonaje < width + 100) {
    dibujarPersonaje(Pj, posXPersonaje, 200, tiempoActual);
  }

  //  Textos deslizantes
  fill(255);
  textSize(32);
  textAlign(CENTER, TOP);

  text("CRÉDITOS", width / 2, posYTexto);
  text("Iara Denise Grossutti (la trini esa no hizo nada)", width / 2, posYTexto + 60);
}

// fondo
function dibujarFondo(img, vel ) {
  let x = -(tiempoFondo * vel) % width;
  image(img, x, 0, width, height);
  image(img, x + width, 0, width, height);
}

// frame
function frameActual(totalFrames, tiempo) {
  return floor((tiempo / intervaloFrame) % totalFrames);
}

// personaje
function dibujarPersonaje(framesArray, posX, posY, tiempo) {
  let frameResultado = frameActual(framesArray.length, tiempo);
  let imgActual = framesArray[frameResultado];

  image(imgActual, posX, posY, imgActual.width / 3, imgActual.height / 3);
}
