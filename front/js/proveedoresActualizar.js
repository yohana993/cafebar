const usuario = JSON.parse(sessionStorage.getItem('UsuarioActual'))
if (usuario){
    if (usuario.idRol==2){
        document.getElementById('menuUsuario1').hidden = true
        document.getElementById('menuUsuario2').hidden = true
    }
}
document.getElementById('addButton').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
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

// function actProveedor(evento){
//     evento.preventdefault();
//     var id = document.getelementbyid('id').value
//     var nit = document.getelementbyid('nit').value
//     var nombre = document.getelementbyid('nombre').value
//     var direccion = document.getelementbyid('direccion').value
//     var contacto = document.getelementbyid('contacto').value
//     var email = document.getelementbyid('email').value

//     const provdata = {
//         id : id,
//         nit : nit,
//         nombre : nombre,
//         direccion : direccion,
//         contacto : contacto,
//         email : email
//     };

if (confirm('¿Estás seguro de que deseas actualizar este proveedor?')) {
    fetch(`http://localhost:8080/proveedores`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(proveedor)
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
