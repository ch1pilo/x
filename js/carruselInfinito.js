// Carrusel infinito para la sección de renovaciones
document.addEventListener('DOMContentLoaded', function() {
    const renovationCarousel = document.querySelector('.carrusel_renovation');
    
    if (renovationCarousel) {
        initRenovationCarousel();
    }
});

function initRenovationCarousel() {
    const container = document.querySelector('.carrusel_renovation-container');
    const items = document.querySelectorAll('.carrusel_renovation-item');
    const prevBtn = document.querySelector('.carrusel_renovation-btn.prev');
    const nextBtn = document.querySelector('.carrusel_renovation-btn.next');
    const indicators = document.querySelectorAll('.carrusel_renovation-indicator');
    
    let currentIndex = 0;
    let autoSlideInterval;
    const slideInterval = 5000; // 5 segundos
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Función para ir a slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Función para slide siguiente
    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Función para slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
        resetAutoSlide();
    }
    
    // Función para iniciar auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, slideInterval);
    }
    
    // Función para resetear auto slide
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
    
    // Pausar auto slide al hacer hover
    renovationCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    renovationCarousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
    
    // Iniciar auto slide
    startAutoSlide();
    
    // Soporte para touch en dispositivos móviles
    let startX = 0;
    let endX = 0;
    
    renovationCarousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    renovationCarousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            // Swipe izquierda - siguiente slide
            nextSlide();
        } else if (endX - startX > swipeThreshold) {
            // Swipe derecha - slide anterior
            prevSlide();
        }
    }
}