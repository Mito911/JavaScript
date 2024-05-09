document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const container = document.querySelector('.slides-container');
    const dotsContainer = document.querySelector('.dots');
    let currentIndex = 0;
    let autoSlideInterval;
    const slideIntervalTime = 5000; // Czas w milisekundach pomiędzy automatycznymi przejściami
  
    function createDots() {
      slides.forEach((slide, index) => {
        const dot = document.createElement('button');
        dot.textContent = index + 1;
        dot.addEventListener('click', () => {
          moveToSlide(index);
        });
        dotsContainer.appendChild(dot);
      });
    }
  
    function setupAutoSlide() {
      clearInterval(autoSlideInterval); // Zatrzymaj poprzedni interwał, jeśli istnieje
      autoSlideInterval = setInterval(() => {
        moveToSlide(currentIndex + 1);
      }, slideIntervalTime);
    }
  
    function moveToSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }
      const currentSlide = slides[currentIndex];
      const nextSlide = slides[index];
      currentSlide.classList.add('slide-anim-out');
      nextSlide.classList.add('slide-anim-in');
  
      setTimeout(() => { // Oczekiwanie na zakończenie animacji
        container.style.transform = `translateX(-${index * 100}%)`;
        currentSlide.classList.remove('slide-anim-out');
        nextSlide.classList.remove('slide-anim-in');
        currentIndex = index;
        updateDots();
      }, 500); // Czas trwania animacji w CSS to 0.5s
  
      setupAutoSlide(); // Restart automatycznego przewijania po ręcznej zmianie slajdu
    }
  
    function updateDots() {
      dotsContainer.childNodes.forEach((dot, index) => {
        dot.style.opacity = index === currentIndex ? '1' : '0.5';
      });
    }
  
    document.getElementById('next').addEventListener('click', () => {
      moveToSlide(currentIndex + 1);
    });
  
    document.getElementById('prev').addEventListener('click', () => {
      moveToSlide(currentIndex - 1);
    });
  
    createDots();
    moveToSlide(0); // Ustaw początkowy slajd i zainicjuj kropki
    setupAutoSlide(); // Rozpocznij automatyczne przewijanie slajdów
  });
  