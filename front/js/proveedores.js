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

document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById('addButton');
    const providerTableBody = document.getElementById('providerList');
    let providers = []; // Array para almacenar proveedores

    // Función para actualizar la tabla de proveedores
    function updateProviderTable() {
        providerTableBody.innerHTML = '';
        providers.forEach((provider) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td id="id">${provider.idProveedor}</td>
                <td id="nit">${provider.nit}</td>
                <td id="nombre">${provider.nombre}</td>
                <td id="contacto">${provider.contacto}</td>
                <td id="email">${provider.email}</td>
                <td id="direccion">${provider.direccion}</td>
                <td>
                    <button class="updateBtn" onclick="actualizarProveedores(this)">Actualizar</button>
                    <button class="deleteBtn" onclick="eliminarProveedor(this)">Eliminar</button>
                </td>
            `;
            providerTableBody.appendChild(row);
        });
    }

    

    // Función para cargar los proveedores
    function loadProviders() {
        fetch('http://localhost:8080/proveedores')
            .then(response => response.json())
            .then(data => {
                providers = data;
                updateProviderTable();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al cargar los proveedores.');
            });
    }

    // Cargar proveedores al inicio
    loadProviders();
});

function actualizarProveedores(boton) {
    const fila = boton.closest('tr');
    const proveedorData = {
        id : fila.querySelector('#id').textContent,
        nit : fila.querySelector('#nit').textContent,
        nombre : fila.querySelector('#nombre').textContent,
        contacto : fila.querySelector('#contacto').textContent,
        email : fila.querySelector('#email').textContent,
        direccion : fila.querySelector('#direccion').textContent
    }
    sessionStorage.setItem('proveedorActual', JSON.stringify(proveedorData));
    window.location.href = "Proveedores_Actualizar.html";
}

function eliminarProveedor(boton) {
    const fila = boton.closest('tr');
    const idProveedor = fila.querySelector('#id').textContent;

    if (confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
        fetch(`http://localhost:8080/proveedores/${idProveedor}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Proveedor eliminado exitosamente.');
                window.location.href = "Proveedores.html";
            } else {
                return response.json().then(errorData => {
                    console.error('Error en la respuesta:', errorData);
                    alert("Error al eliminar el proveedor: " + (errorData.message || "Error desconocido"));
                });
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert("Ocurrió un error al eliminar el proveedor");
        });
    }
}
