// Fecha de inicio de la relación
const startDate = new Date("2021-11-30T20:35:00");

// Elementos del temporizador
const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateTimer() {
  const now = new Date();
  const elapsed = now - startDate;

  const years = Math.floor(elapsed / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor((elapsed % (365.25 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
  const days = Math.floor((elapsed % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
  const hours = Math.floor((elapsed % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((elapsed % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((elapsed % (60 * 1000)) / 1000);

  yearsEl.textContent = years;
  monthsEl.textContent = months;
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

// Actualizar cada segundo
setInterval(updateTimer, 1000);

const messages = [
    "Tu sonrisa ilumina mis días.",
    "La forma en que siempre encuentras algo bueno en todo.",
    "Cómo haces que cada momento sea inolvidable.",
    "Tus abrazos son mi lugar favorito.",
    "Tu risa es la melodía que alegra mi corazón."
];

let currentIndex = 0;
const messageList = document.getElementById("message-list");

function updateMessage() {
    messageList.innerHTML = `<li>${messages[currentIndex]}</li>`;
    currentIndex = (currentIndex + 1) % messages.length;
}

setInterval(updateMessage, 5000); // Cambia cada 5 segundos
updateMessage();
