const App = {
  currentIndex: 0,

  // Actualizar el carrusel
  updateCarousel() {
      const carousel = document.querySelector('.carousel');
      const items = document.querySelectorAll('.carousel-item');
      const videos = document.querySelectorAll('video');

      videos.forEach((video, index) => {
          if (index === this.currentIndex) {
              video.play(); // Reproducir el video actual
          } else {
              video.pause(); // Pausar los demás videos
          }
      });

      const offset = -this.currentIndex * 100;
      carousel.style.transform = `translateX(${offset}%)`;
  },

  // Ir a la diapositiva anterior
  prevSlide() {
      const items = document.querySelectorAll('.carousel-item');
      this.currentIndex = (this.currentIndex === 0) ? items.length - 1 : this.currentIndex - 1;
      this.updateCarousel();
  },

  // Ir a la siguiente diapositiva
  nextSlide() {
      const items = document.querySelectorAll('.carousel-item');
      this.currentIndex = (this.currentIndex + 1) % items.length;
      this.updateCarousel();
  },

  // Actualizar el temporizador
  updateTimer() {
      const startDate = new Date("2024-07-28T20:35:00");
      const now = new Date();
      const elapsed = now - startDate;

      const years = Math.floor(elapsed / (365.25 * 24 * 60 * 60 * 1000));
      const months = Math.floor((elapsed % (365.25 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
      const days = Math.floor((elapsed % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
      const hours = Math.floor((elapsed % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((elapsed % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((elapsed % (60 * 1000)) / 1000);

      document.getElementById("years").textContent = years;
      document.getElementById("months").textContent = months;
      document.getElementById("days").textContent = days;
      document.getElementById("hours").textContent = hours;
      document.getElementById("minutes").textContent = minutes;
      document.getElementById("seconds").textContent = seconds;
  },

  // Actualizar el mensaje
  updateMessage() {
      const messages = [
          "Tu sonrisa ilumina mis días.",
          "La forma en que siempre encuentras algo bueno en todo.",
          "Cómo haces que cada momento sea inolvidable.",
          "Tus abrazos son mi lugar favorito.",
          "Tu risa es la melodía que alegra mi corazón."
      ];

      const randomIndex = Math.floor(Math.random() * messages.length);
      const messageList = document.getElementById("message-list");
      messageList.innerHTML = `<li>${messages[randomIndex]}</li>`;
  },

  // Inicializar la aplicación
  init() {
      document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
      document.querySelector('.next').addEventListener('click', () => this.nextSlide());

      this.updateCarousel();
      setInterval(() => this.updateTimer(), 1000);
      setInterval(() => this.updateMessage(), 5000);
      this.updateMessage();
  }
};

// Inicializar la aplicación al cargar la página
document.addEventListener('DOMContentLoaded', () => App.init());
