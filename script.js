const flowersContainer = document.getElementById("flowers");
const messageElement = document.getElementById("message");
const countElement = document.getElementById("count");
const welcome = document.getElementById("welcome");

const flowerTypes = [
  {
    className: "rose",
    messages: [
      "Você é mais forte do que imagina. 🌹",
      "Meu carinho por você floresce todos os dias.",
      "Mesmo nos dias difíceis, eu continuo acreditando em você.",
      "Você merece todo o amor e carinho do mundo."
    ]
  },

  {
    className: "sunflower",
    messages: [
      "Continue procurando a luz, mesmo nos dias difíceis. 🌻",
      "Eu acredito na sua força.",
      "Você ilumina a vida de quem está ao seu lado.",
      "Dias melhores ainda vão florescer."
    ]
  },

  {
    className: "tulip",
    messages: [
      "Um passo de cada vez. Você consegue. 🌷",
      "Todo recomeço pode trazer algo bonito.",
      "Não tenha medo de continuar.",
      "Eu estarei torcendo por você."
    ]
  },

  {
    className: "orchid",
    messages: [
      "Sua força é linda, até quando você não percebe.",
      "Você é muito mais forte do que pensa. 🌺",
      "Admiro a pessoa que você é.",
      "Continue florescendo do seu jeito."
    ]
  },

  {
    className: "lily",
    messages: [
      "Respira. Você não precisa resolver tudo hoje. 🤍",
      "Que seu coração encontre um pouco de paz.",
      "Você também merece descansar.",
      "Estou aqui, mesmo nos dias difíceis."
    ]
  },

  {
    className: "carnation",
    messages: [
      "Continue. Mesmo devagar, você está avançando. 🌸",
      "Você já conseguiu chegar tão longe.",
      "Não desista de você.",
      "Sua determinação me inspira."
    ]
  },

  {
    className: "daisy",
    messages: [
      "Que hoje encontre um motivo para sorrir. 🌼",
      "Você merece dias leves.",
      "Que nunca faltem motivos para florescer.",
      "Pequenas coisas também podem deixar o coração feliz."
    ]
  },

  {
    className: "violet",
    messages: [
      "Você é muito querida. Nunca se esqueça disso. 💜",
      "Meu carinho está sempre com você.",
      "Você não precisa ser forte o tempo inteiro.",
      "Se precisar de um abraço, este jardim é seu."
    ]
  }
];

let flowerCount =
  Number(localStorage.getItem("flowerCount")) || 0;

countElement.textContent = flowerCount;

let messageTimer = null;


/* ---------------------------
   ESCOLHER ITEM ALEATÓRIO
---------------------------- */

function random(array) {
  return array[
    Math.floor(Math.random() * array.length)
  ];
}


/* ---------------------------
   CRIAR FLOR
---------------------------- */

function createFlower(x, y) {

  const type = random(flowerTypes);

  const flower = document.createElement("div");

  flower.className =
    `flower ${type.className}`;

  /*
    Cada flor possui uma pequena variação
    para o jardim não parecer repetitivo.
  */

  const size =
    0.72 + Math.random() * 0.48;

  const rotation =
    -5 + Math.random() * 10;

  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;

  flower.innerHTML = `
    <div
      class="stem"
      style="
        transform: rotate(${rotation}deg);
        height: ${65 + Math.random() * 25}px;
      "
    ></div>

    <div class="leaf left"></div>
    <div class="leaf right"></div>

    <div
      class="head"
      style="transform: scale(${size})"
    ></div>
  `;

  flowersContainer.appendChild(flower);

  flowerCount++;

  countElement.textContent =
    flowerCount;

  localStorage.setItem(
    "flowerCount",
    flowerCount
  );

  showMessage(
    random(type.messages)
  );

  /*
    Depois do primeiro toque,
    o texto inicial desaparece.
  */

  welcome.classList.add("hidden");
}


/* ---------------------------
   MENSAGENS
---------------------------- */

function showMessage(text) {

  messageElement.textContent = text;

  messageElement.classList.add(
    "visible"
  );

  clearTimeout(messageTimer);

  messageTimer = setTimeout(() => {

    messageElement.classList.remove(
      "visible"
    );

  }, 3200);
}


/* ---------------------------
   TOQUE NA TELA
---------------------------- */

document.addEventListener(
  "pointerdown",
  function(event) {

    /*
      Ignora alguns elementos de interface.
    */

    if (
      event.target.closest("#counter")
    ) {
      return;
    }

    let x = event.clientX;
    let y = event.clientY;

    /*
      A flor precisa nascer no campo.
      Se ela tocar muito perto da parte
      superior, colocamos a flor um pouco
      mais para baixo.
    */

    const flowerHeight = 100;

    if (y < flowerHeight) {
      y = flowerHeight;
    }

    /*
      Pequena variação para que as flores
      não fiquem todas exatamente alinhadas.
    */

    x +=
      Math.random() * 18 - 9;

    y +=
      Math.random() * 12 - 6;

    createFlower(x, y);
  }
);


/* ---------------------------
   VAGALUMES
---------------------------- */

function createFireflies() {

  for (let i = 0; i < 22; i++) {

    const firefly =
      document.createElement("div");

    firefly.className =
      "firefly";

    firefly.style.left =
      `${Math.random() * 100}%`;

    firefly.style.top =
      `${Math.random() * 100}%`;

    firefly.style.animationDelay =
      `${Math.random() * 5}s`;

    document.getElementById(
      "garden"
    ).appendChild(firefly);
  }
}

createFireflies();


/* ---------------------------
   PRIMEIRA MENSAGEM
---------------------------- */

setTimeout(() => {

  showMessage(
    "Toque em qualquer lugar e faça nascer uma flor. 🌱"
  );

}, 1800);
