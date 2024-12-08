// src/app.js

document.getElementById('mascotaForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe de la forma tradicional
    
    // Crear un nuevo FormData para enviar los datos del formulario y la imagen
    const formData = new FormData();
    formData.append('nombre', document.getElementById('nombre').value);
    formData.append('apodo', document.getElementById('apodo').value);
    formData.append('edad', document.getElementById('edad').value);
    formData.append('foto', document.getElementById('foto').files[0]); // Agregar la foto seleccionada

    try {
        const response = await fetch('/api/mascotas', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            alert('Mascota creada exitosamente!');
            console.log(result);
        } else {
            alert('Hubo un error al crear la mascota.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema con la solicitud.');
    }
});
