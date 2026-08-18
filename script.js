const flowerTypes = [
  {
    name: "rosa",
    messages: [
      "Você é mais forte do que imagina. 🌹",
      "Meu carinho por você floresce todos os dias. 🌹",
      "Mesmo nos dias difíceis, continue acreditando em você. 🌹",
      "Você nunca precisa esquecer o quanto é especial. 🌹"
    ]
  },
  {
    name: "sunflower",
    messages: [
      "Que você sempre encontre um pouquinho de luz, mesmo nos dias nublados. 🌻",
      "Continue olhando para frente. Dias melhores virão. 🌻",
      "Você ilumina a vida de quem tem a sorte de estar ao seu lado. 🌻",
      "Eu acredito na sua força. 🌻"
    ]
  },
  {
    name: "tulip",
    messages: [
      "Todo recomeço pode esconder uma coisa linda. 🌷",
      "Você merece carinho, paz e dias leves. 🌷",
      "Não tenha medo de recomeçar. Eu acredito em você. 🌷",
      "Um passo de cada vez. Você vai conseguir. 🌷"
    ]
  },
  {
    name: "orchid",
    messages: [
      "Sua força é linda, até quando você não consegue enxergá-la. 🌺",
      "Você é admirável exatamente por ser quem é. 🌺",
      "Nem toda força precisa fazer barulho. A sua está aí. 🌺",
      "Cuide de você com o mesmo carinho que oferece aos outros. 🌺"
    ]
  },
  {
    name: "lily",
    messages: [
      "Respira. Você não precisa resolver tudo hoje. 🤍",
      "Que seu coração encontre um pouco de paz hoje. 🤍",
      "Você merece descansar sem sentir culpa. 🤍",
      "Estou torcendo por você, sempre. 🤍"
    ]
  },
  {
    name: "carnation",
    messages: [
      "Continue. Mesmo devagar, você continua avançando. 🌸",
      "Eu sei que você consegue atravessar essa fase. 🌸",
      "Você já superou tanta coisa. Não duvide da sua força. 🌸",
      "Quando estiver cansada, lembre-se de que você não está sozinha. 🌸"
    ]
  },
  {
    name: "daisy",
    messages: [
      "Espero que hoje você encontre um motivo para sorrir. 🌼",
      "Coisas pequenas também podem deixar o coração feliz. 🌼",
      "Você merece muitos momentos leves e felizes. 🌼",
      "Que nunca faltem motivos para florescer. 🌼"
    ]
  },
  {
    name: "violet",
    messages: [
      "Você é muito querida. Nunca se esqueça disso. 💜",
      "Meu carinho por você está aqui, mesmo nos dias difíceis. 💜",
      "Você não precisa ser forte o tempo inteiro. 💜",
      "Se precisar de um abraço, imagine este jardim te abraçando. 💜"
    ]
  }
];

const garden = document.getElementById("garden");
const message = document.getElementById("message");
const flowerCountElement = document.getElementById("flowerCount");

let flowerCount = Number(localStorage.getItem("flowerCount")) || 0;

flowerCountElement.textContent = flowerCount;

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createFlower(x, y) {
  const type = randomItem(flowerTypes);

  const flower = document.createElement("div");
  flower.className = `flower ${type.name}`;

  const size = 0.75 + Math.random() * 0.65;

  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;
  flower.style.transformOrigin = "bottom center";

  flower.innerHTML = `
    <div class="flower-inner" style="transform: scale(${size})">
      <div class="head"></div>
      <div class="stem"></div>
      <div class="leaf left"></div>
      <div class="leaf right"></div>
    </div>
  `;

  garden.appendChild(flower);

  flowerCount++;
  flowerCountElement.textContent = flowerCount;

  localStorage.setItem("flowerCount", flowerCount);

  showMessage(randomItem(type.messages));
}

let messageTimeout;

function showMessage(text) {
  message.textContent = text;
  message.classList.add("show");

  clearTimeout(messageTimeout);

  messageTimeout = setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

/*
 * Cada toque na tela cria uma flor.
 * pointerdown funciona tanto no celular quanto no computador.
 */

document.addEventListener("pointerdown", (event) => {
  // Não cria flor quando o toque acontece no contador.
  if (event.target.closest("#counter")) {
    return;
  }

  const x = event.clientX;
  const y = event.clientY;

  // A flor nasce no ponto tocado.
  createFlower(x, y);

  // Pequenas partículas de carinho.
  createHearts(x, y);
});


function createHearts(x, y) {
  const heartCount = 3;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");

    heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

    heart.style.position = "fixed";
    heart.style.left = `${x + (Math.random() * 40 - 20)}px`;
    heart.style.top = `${y}px`;
    heart.style.zIndex = "150";
    heart.style.color = Math.random() > 0.5 ? "#ff6b81" : "#d98cff";
    heart.style.fontSize = `${14 + Math.random() * 10}px`;
    heart.style.pointerEvents = "none";
    heart.style.transition = "all 1.2s ease";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
      heart.style.transform = `
        translate(
          ${(Math.random() * 80) - 40}px,
          -${50 + Math.random() * 80}px
        )
        rotate(${Math.random() * 40 - 20}deg)
      `;

      heart.style.opacity = "0";
    });

    setTimeout(() => {
      heart.remove();
    }, 1300);
  }
}


/*
 * Faz algumas flores surgirem automaticamente
 * quando o jardim é aberto pela primeira vez.
 */

if (!localStorage.getItem("gardenStarted")) {
  localStorage.setItem("gardenStarted", "true");

  setTimeout(() => {
    const initialFlowers = 6;

    for (let i = 0; i < initialFlowers; i++) {
      const x = 30 + Math.random() * (window.innerWidth - 60);
      const y =
        window.innerHeight * 0.66 +
        Math.random() * window.innerHeight * 0.28;

      createFlower(x, y);
    }

    showMessage(
      "Este jardim começa pequeno... mas pode crescer infinitamente com você. 💕"
    );
  }, 500);
}
