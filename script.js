const App = {
  currentIndex: 0,
  backgroundMusic: null, // Referencia al audio
  toggleAudioBtn: null, // Referencia al botón para controlar el audio

  // Actualizar el carrusel
  updateCarousel() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const videos = document.querySelectorAll('video');

    videos.forEach((video, index) => {
      if (index === this.currentIndex) {
        video.play(); // Reproducir el video actual
        this.pauseBackgroundMusic(); // Pausar música si el video está en reproducción
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

  // Pausar la música de fondo
  pauseBackgroundMusic() {
    if (!this.backgroundMusic.paused) {
      this.backgroundMusic.pause();
      this.toggleAudioBtn.textContent = "Reanudar Música";
    }
  },

  // Alternar la reproducción de la música de fondo
  toggleBackgroundMusic() {
    if (this.backgroundMusic.paused) {
      this.backgroundMusic.play();
      this.toggleAudioBtn.textContent = "Pausar Música";
    } else {
      this.backgroundMusic.pause();
      this.toggleAudioBtn.textContent = "Reanudar Música";
    }
  },

  // Actualizar el temporizador
  updateTimer() {
    const startDate = new Date("2024-07-28T20:35:00");
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    // Ajuste si los segundos son negativos
    if (seconds < 0) {
      minutes--;
      seconds += 60;
    }

    // Ajuste si los minutos son negativos
    if (minutes < 0) {
      hours--;
      minutes += 60;
    }

    // Ajuste si las horas son negativas
    if (hours < 0) {
      days--;
      hours += 24;
    }

    // Ajuste si los días son negativos
    if (days < 0) {
      months--;
      // Obtener el número de días del mes anterior
      const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += previousMonth.getDate();
    }

    // Ajuste si los meses son negativos
    if (months < 0) {
      years--;
      months += 12;
    }

    // Actualizar en el HTML
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
    // Asignar funciones a botones
    document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
    document.querySelector('.next').addEventListener('click', () => this.nextSlide());

    // Exponer las funciones globalmente (para onclick en el HTML)
    window.prevSlide = this.prevSlide.bind(this);
    window.nextSlide = this.nextSlide.bind(this);

    // Referencias al audio y botón
    this.backgroundMusic = document.getElementById('background-music');
    this.toggleAudioBtn = document.getElementById('toggle-audio');

    // Escuchar el clic del botón para alternar música
    this.toggleAudioBtn.addEventListener('click', () => this.toggleBackgroundMusic());

    // Pausar la música cuando se reproduce un video
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.addEventListener('play', () => this.pauseBackgroundMusic());
      video.addEventListener('pause', () => {
        if (Array.from(videos).every(v => v.paused)) {
          this.backgroundMusic.play();
          this.toggleAudioBtn.textContent = "Pausar Música";
        }
      });
    });

    this.updateCarousel();
    setInterval(() => this.updateTimer(), 1000);
    setInterval(() => this.updateMessage(), 5000);
    this.updateMessage();
  }

};

// Inicializar la aplicación al cargar la página
document.addEventListener('DOMContentLoaded', () => App.init());
