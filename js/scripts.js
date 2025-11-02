document.addEventListener('DOMContentLoaded', function() {
    const carruselContainer = document.querySelector('.carrusel-container');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.carrusel-control.prev');
    const nextButton = document.querySelector('.carrusel-control.next');
    let currentSlide = 0;
    const totalSlides = 4;
    
    // Función para actualizar el carrusel
    function updateCarrusel() {
        carruselContainer.style.transform = `translateX(-${currentSlide * 25}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Navegación con indicadores
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            currentSlide = parseInt(this.getAttribute('data-slide'));
            updateCarrusel();
        });
    });
    
    // Botón siguiente
    nextButton.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarrusel();
    });
    
    // Botón anterior
    prevButton.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarrusel();
    });
    
    // Carrusel automático (opcional)
    let autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarrusel();
    }, 5000);
    
    // Pausar carrusel automático al interactuar
    carruselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    carruselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarrusel();
        }, 5000);
    });
});

// Para animar elementos al hacer scroll con diferentes direcciones
function revealOnScroll() {
    const revealLeft = document.querySelectorAll('.reveal-from-left');
    const revealRight = document.querySelectorAll('.reveal-from-right');
    const revealBottom = document.querySelectorAll('.reveal-from-bottom');
    
    const windowHeight = window.innerHeight;
    const triggerPoint = 100; // Pixels antes de que el elemento entre en vista

    // Animación desde la IZQUIERDA
    revealLeft.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - triggerPoint) {
            element.classList.add('active');
        }
    });

    // Animación desde la DERECHA
    revealRight.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - triggerPoint) {
            element.classList.add('active');
        }
    });

    // Animación desde ABAJO
    revealBottom.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - triggerPoint) {
            element.classList.add('active');
        }
    });
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* aparicion de elementos al hacer scroll */

// Contadores animados para el banner de estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Velocidad de la animación
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Efectos hover mejorados para tarjetas
function enhanceCardInteractions() {
    const cards = document.querySelectorAll('.value-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializar todas las funcionalidades cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    enhanceCardInteractions();
    // Reiniciar contadores al hacer scroll (para demostración)
    let counted = false;
    window.addEventListener('scroll', function() {
        const statsSection = document.querySelector('.stats-banner');
        const screenPosition = window.innerHeight / 1.3;

        if (screenPosition && !counted) {
            animateCounters();
            counted = true;
        }
    });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


/*menu de hamburguesa */

// === 1. SELECCIONAR ELEMENTOS ===
const botonMenu = document.getElementById('mobile-menu');
const menu = document.querySelector('.nav');
const enlacesMenu = document.querySelectorAll('.nav-link');

// === 2. FUNCIÓN PRINCIPAL ===
function toggleMenu() {
    // Alterna entre abierto/cerrado
    botonMenu.classList.toggle('active');
    menu.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Bloquea/desbloquea scroll
}

// === 3. EVENTOS ===

// A. Click en el botón hamburguesa
botonMenu.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que el click se propague
    toggleMenu();
});

// B. Cerrar menú al hacer clic en un enlace
enlacesMenu.forEach(enlace => {
    enlace.addEventListener('click', () => {
        botonMenu.classList.remove('active');
        menu.classList.remove('active');
                document.body.classList.remove('no-scroll');
    });
});

// C. Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !botonMenu.contains(e.target)) {
        botonMenu.classList.remove('active');
        menu.classList.remove('active');
                document.body.classList.remove('no-scroll');
    }
});

// D. Cerrar menú al redimensionar (si vuelve a desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        botonMenu.classList.remove('active');
        menu.classList.remove('active');
                document.body.classList.remove('no-scroll');
    }
});

// Modal para mostrar detalles de piedras
document.addEventListener('DOMContentLoaded', function() {
    // Crear el modal en el DOM
    const modalHTML = `
        <div class="modal-overlay" id="stoneModal">
            <div class="stone-modal">
                <button class="modal-close" id="modalClose">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-image">
                    <img id="modalImage" src="" alt="">
                </div>
                <div class="modal-content">
                    <h2 class="modal-title" id="modalTitle"></h2>
                    <p class="modal-description" id="modalDescription"></p>
                    <div class="modal-project-info">
                        <h3>Estado del Proyecto</h3>
                        <p id="modalProjectStatus">Aplicada en proyecto</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insertar el modal en el body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Referencias a elementos del modal
    const modal = document.getElementById('stoneModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalProjectStatus = document.getElementById('modalProjectStatus');
    
    // Función para abrir el modal
    function openModal(title, description, imageSrc) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalImage.src = imageSrc;
        modalImage.alt = title;
        modalProjectStatus.textContent = "Aplicada en proyecto";
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    }
    
    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll del body
    }
    
    // Evento para cerrar modal
    modalClose.addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Asignar eventos a las tarjetas de piedras
    const stoneCards = document.querySelectorAll('.conten_project, .feature-card');
    
    stoneCards.forEach(card => {
        card.addEventListener('click', function() {
            // Obtener datos de la tarjeta
            let title, description, imageSrc;
            
            if (this.classList.contains('conten_project')) {
                // Para las tarjetas grandes de piedras
                title = this.querySelector('h2').textContent;
                description = this.querySelector('p').textContent;
                imageSrc = this.querySelector('img').src;
            } else if (this.classList.contains('feature-card')) {
                // Para las tarjetas de características
                title = this.querySelector('.feature-title').textContent;
                description = this.querySelector('.feature-description').textContent;
                // Usar una imagen por defecto o la de la sección
                imageSrc = document.querySelector('.engineered-image img').src;
            }
            
            // Abrir modal con los datos
            openModal(title, description, imageSrc);
        });
    });
});