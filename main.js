const word = document.querySelector(".word");
const wrongLettersBox = document.querySelector(".wrong-letters");
const playButton = document.querySelector(".popup button");
const resetButton = document.querySelector(".reset-button");
const popup = document.querySelector(".popup");
const notification = document.querySelector(".notification");
const message = document.querySelector(".message");
const revealWord = document.querySelector(".reveal-word");
const parts = document.querySelectorAll(".part");
const vitoriaGif = document.getElementById("vitoria-gif");
const perdeuGif = document.getElementById("perdeu-gif");
const gifContainer = document.querySelector(".gif-container");
const mobileInput = document.getElementById("mobile-input");

const words = [
  "elefante", "rato", "gato", "cachorro", "cobra", "coala", "cavalo", "castor", "crocodilo", "abelha", "alce",
  "aranha", "arara", "avestruz", "bacalhau", "bagre", "baleia", "borboleta", "bezerro", "camelo", "coelho",
  "gazela", "golfinho", "gorila", "hiena", "hamster", "jabuti", "lagarta", "lagosta", "lebre", "lontra",
  "macaco", "raposa", "tartaruga", "pantera", "leão", "tigre", "onça", "gavião", "pinguim", "corvo", "andorinha",
  "beija-flor", "papagaio", "morcego", "urso", "marmota", "paca", "puma", "lobo", "cervo", "bicho-preguiça",
  "zebra", "vaca", "cabrito", "ovelha", "boi", "pato", "galinha", "peru", "cisne", "codorna", "tucano",
  "javali", "toupeira", "cavalo-marinho", "estrela-do-mar", "caranguejo", "jacaré", "iguana", "robalo",
  "truta", "salmonete", "salmão", "tilápia", "piranha", "siri", "panda", "canguru", "bisonte", "cisne", 
  "galo", "andorinha", "cervo", "urso-polar", "morcego", "guaxinim", "bicho-preguiça", "sabiá", "dragão", "camundongo",
  "aranha", "falcão", "vagalume", "raposa", "guará", "tigre-dente-de-sabre", "ocelote", "cervo-almiscarado", "beagle",
  "jacaré", "maria-fumaça", "papagaio-do-mar", "ocelote", "codorna", "burro", "minhoca", "galo", "pavão", "lula"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;

const correctLetters = [];
const wrongLetters = [];

let correctCount = 0; // Contador de vitórias
let wrongCount = 0; // Contador de derrotas

// Preenche automaticamente caracteres especiais
function prefillSpecialCharacters() {
  selectedWord.split("").forEach((char) => {
    if (char === "-") {
      correctLetters.push(char); // Adiciona hífen como já "adivinhado"
    }
  });
}

function displayWord() {
  word.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `<span class="letter">${correctLetters.includes(letter) ? letter : letter === "-" ? "-" : ""}</span>`
      )
      .join("")}`;

  const innerWord = word.textContent.replace(/[ \n]/g, "");

  if (innerWord === selectedWord) {
    correctCount++;
    message.textContent = "Você Ganhou😎🙌!";
    revealWord.textContent = "";
    vitoriaGif.style.display = "block";
    vitoriaGif.play();
    gifContainer.style.display = "block";
    document.querySelector(".correct-count").textContent = `Vitórias: ${correctCount}`;
    playable = false;

    setTimeout(() => {
      popup.style.display = "flex";
      vitoriaGif.style.display = "none";
    }, 1000);
  }
}

function updateWrongLettersBox() {
  wrongLettersBox.innerHTML = `
    ${wrongLetters.map((letter) => `<span>${letter}</span>`).join("")}`;

  parts.forEach((part, index) => {
    const errors = wrongLetters.length;
    part.style.display = index < errors ? "block" : "none";
  });

  if (wrongLetters.length === parts.length) {
    wrongCount++;
    message.textContent = "Você Perdeu já foi melhor😜";
    revealWord.textContent = `Palavra Correta: ${selectedWord}`;

    setTimeout(() => {
      perdeuGif.style.display = "block";
      perdeuGif.play();
      gifContainer.style.display = "block";
      document.querySelector(".wrong-count").textContent = `Derrotas: ${wrongCount}`;
      playable = false;

      setTimeout(() => {
        popup.style.display = "flex";
        perdeuGif.style.display = "none";
      }, 2000);
    }, 2000);
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 2000);
}

function handleInput(letter) {
  if (playable) {
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersBox();
      } else {
        showNotification();
      }
    }
  }
}

// Eventos para teclado físico
document.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    handleInput(e.key.toLowerCase());
  }
});

// Campo de texto para dispositivos móveis
mobileInput.addEventListener("input", (e) => {
  const letter = e.target.value.toLowerCase();
  if (letter.match(/[a-z]/)) {
    handleInput(letter);
    mobileInput.value = ""; // Limpa o campo após digitar
  }
});

// Mostra campo para dispositivos móveis
if (/Mobi|Android/i.test(navigator.userAgent)) {
  mobileInput.style.display = "block";
}

playButton.addEventListener("click", () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  prefillSpecialCharacters();
  displayWord();
  updateWrongLettersBox();
  popup.style.display = "none";
  gifContainer.style.display = "none";
});

resetButton.addEventListener("click", () => {
  correctCount = 0;
  wrongCount = 0;
  document.querySelector(".correct-count").textContent = `Vitórias: ${correctCount}`;
  document.querySelector(".wrong-count").textContent = `Derrotas: ${wrongCount}`;
  playButton.click();
});

// Inicializa o jogo
prefillSpecialCharacters();
displayWord();
