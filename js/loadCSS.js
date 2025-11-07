// loadCSS.js - Cargador de CSS no crítico
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = function() {
        this.media = 'all';
    };
    document.head.appendChild(link);
}

// Cargar CSS cuando la página esté lista
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        loadCSS('css/styleNuevo.css');
        loadCSS('css/stylejs.css');
        loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    });
} else {
    loadCSS('css/styleNuevo.css');
    loadCSS('css/stylejs.css');
    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
}