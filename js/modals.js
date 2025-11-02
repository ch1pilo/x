
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
                    <h2 class="modal-title" id="modalTitle">Título de la Piedra</h2>
                    <p class="modal-description" id="modalDescription">Descripción de la piedra aparecerá aquí.</p>
                    <div class="modal-project-info">
                        <h3>Project Status</h3>
                        <p id="modalProjectStatus">Implemented in the Project</p>
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
        document.body.style.overflow = 'hidden';
    }
    
    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
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
    const stoneCards = document.querySelectorAll('.stone-card');
    
    stoneCards.forEach(card => {
        card.addEventListener('click', function() {
            // Obtener datos específicos de esta tarjeta
            const title = this.getAttribute('data-stone-title');
            const description = this.getAttribute('data-stone-description');
            const imageSrc = this.getAttribute('data-stone-image');
            
            // Abrir modal con los datos específicos
            openModal(title, description, imageSrc);
        });
    });
});