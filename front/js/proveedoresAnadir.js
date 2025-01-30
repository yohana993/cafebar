const usuario = JSON.parse(sessionStorage.getItem('UsuarioActual'))
if (usuario){
    if (usuario.idRol==2){
        document.getElementById('menuUsuario1').hidden = true
        document.getElementById('menuUsuario2').hidden = true
    }
}
else
    window.location.href = "Inicio.html";

document.getElementById('cerrarSesion').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        sessionStorage.removeItem('UsuarioActual');
        window.location.href = 'inicio.html';
    }
});

function CreacionProveedor(event) {
    event.preventDefault();
    const nit = document.getElementById('nit').value;
    const nombre = document.getElementById('nombre').value;
    const contacto = document.getElementById('contacto').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;

    const proveedorData = {
        nit: nit,
        nombre: nombre,
        contacto: contacto,
        email: email,
        direccion: direccion
    };

    console.log(proveedorData);

// Lógica para añadir proveedores
    fetch('http://localhost:8080/proveedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(proveedorData)
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            alert("Proveedor creado exitosamente");
            window.location.href = "Proveedores.html";
        } else {
            return response.json().then(errorData => {
                console.error('Error en la respuesta:', errorData);
                alert("Error al crear el proveedor: " + (errorData.message || "Error desconocido"));
            });
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert('Ocurrió un error al añadir el proveedor.');
    });
}
