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

const proveedor = JSON.parse(sessionStorage.getItem('proveedorActual'))
//document.getElementById('id').value = proveedor.id
document.getElementById('nit').value = proveedor.nit
document.getElementById('nombre').value = proveedor.nombre
document.getElementById('direccion').value = proveedor.direccion
document.getElementById('contacto').value = proveedor.contacto
document.getElementById('email').value = proveedor.email

function actProveedor(evento){
    evento.preventDefault();
    var id = proveedor.id
    var nit = document.getElementById('nit').value
    var nombre = document.getElementById('nombre').value
    var direccion = document.getElementById('direccion').value
    var contacto = document.getElementById('contacto').value
    var email = document.getElementById('email').value

    const provdata = {
        idProveedor : id,
        nit : nit,
        nombre : nombre,
        direccion : direccion,
        contacto : contacto,
        email : email
    };

    if (confirm('¿Estás seguro de que deseas actualizar este proveedor?')) {
        fetch(`http://localhost:8080/proveedores`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(provdata)
        })
        .then(response => {
            if (response.ok) {
                alert("Proveedor actualizado exitosamente");
                window.location.href = "Proveedores.html";
            } else {
                return response.json().then(errorData => {
                    console.error('Error en la respuesta:', errorData);
                    alert("Error al actualizar el proveedor: " + (errorData.message || "Error desconocido"));
                });
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert("Ocurrió un error al actualizar el proveedor");
        });
    }
}
