document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppForm();
});

function initWhatsAppForm() {
    const contactForm = document.getElementById('contact-form');
    console.log('Formulario encontrado:', contactForm); // DEBUG
    
    if (!contactForm) {
        console.log('Formulario no encontrado');
        return;
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulario enviado'); // DEBUG
        
        // Obtener valores del formulario
        const getValue = (id) => {
            const element = document.getElementById(id);
            console.log(`Buscando ${id}:`, element, 'Valor:', element ? element.value : 'no encontrado'); // DEBUG
            return element ? element.value.trim() : '';
        };
        
        const firstName = getValue('firstName');
        const lastName = getValue('lastName');
        const email = getValue('email');
        const phone = getValue('phone');
        const subject = getValue('subject');
        const service = getValue('service');
        const message = getValue('message');
        
        console.log('Valores obtenidos:', { firstName, lastName, email, phone, subject, service, message }); // DEBUG
        
        // Validaciones básicas
        if (!firstName || !lastName || !email || !phone || !subject || !service || !message) {
            console.log('Validación fallida'); // DEBUG
            alert('Please fill in all required fields: First Name, Last Name, Email, Phone, Subject, Service, and Message');
            return;
        }
        
        console.log('Validación pasada, creando mensaje WhatsApp...'); // DEBUG
        
        // Crear mensaje para WhatsApp
        let whatsappMessage = `*New Contact from Prime Build Works:*%0A%0A`;
        whatsappMessage += `*Name:* ${firstName} ${lastName}%0A`;
        whatsappMessage += `*Email:* ${email}%0A`;
        whatsappMessage += `*Phone:* ${phone}%0A`;
        whatsappMessage += `*Subject:* ${subject}%0A`;
        whatsappMessage += `*Service Needed:* ${service}%0A%0A`;
        whatsappMessage += `*Project Details:*%0A${message}%0A%0A`;
        whatsappMessage += `---%0A*Sent from Prime Build Works Website*`;
        
        // Número de WhatsApp
        const whatsappNumber = '584246018457';
        
        // Crear URL de WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        console.log('URL de WhatsApp:', whatsappURL); // DEBUG
        
        // Abrir en nueva pestaña
        window.open(whatsappURL, '_blank');
        
        // Mostrar mensaje de confirmación
        alert('Thank you for your message! You will be redirected to WhatsApp to complete the sending.');
        
        // Limpiar formulario
        contactForm.reset();
        
        console.log('Proceso completado'); // DEBUG
    });
    
    console.log('Event listener agregado al formulario'); // DEBUG
}