document.addEventListener('DOMContentLoaded', () => {
    // Obtener la lista de contactos al cargar la página
    fetchContacts();
    
    // Agregar evento submit al formulario
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;

        // Crear objeto de contacto
        const nuevoContacto = {
            nombre,
            apellido,
            telefono
        };

        fetch('http://www.raydelto.org/agenda.php', {
            method: 'POST',
            //headers: {
            //'Content-Type': 'application/json'
            //},
            body: JSON.stringify(nuevoContacto)
        })
        .then(response => {
            if (response.ok) {
                // Borrar los datos de los campos de texto
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('telefono').value = '';

                return response.json();
            } else {
                console.error('Error en la solicitud HTTP:', response.status);
                throw new Error('Error en la solicitud HTTP');
            }
        })
        .then(data => {
            console.log('Contacto guardado:', data);
        })
        .catch(error => {
            console.error('Error al agregar contacto:', error);
        });
    });

    function fetchContacts() {
        fetch('http://www.raydelto.org/agenda.php')
        .then(response => response.json())
        .then(data => {
            const contactList = document.getElementById('contactList');
            contactList.innerHTML = '';

            data.forEach(contact => {
                const listItem = document.createElement('li');
                listItem.textContent = `${contact.nombre} ${contact.apellido} - Teléfono: ${contact.telefono}`;
                contactList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error al obtener la lista de contactos:', error));
    }
});
