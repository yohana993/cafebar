document.addEventListener('DOMContentLoaded', function() {
    // Para cargar roles desde la base de datos
    fetch('http://localhost:8080/roles')
        .then(response => response.json())
        .then(data => {
            const roleSelect = document.getElementById('rol');
            data.forEach(role => {
                const option = document.createElement('option');
                option.value = role.idRol;
                option.text = role.nombre;
                roleSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los roles:', error));
});

const usuario = JSON.parse(sessionStorage.getItem('UsuarioActual'));
if (usuario) {
    if (usuario.idRol == 2) {
        document.getElementById('menuUsuario1').hidden = true;
        document.getElementById('menuUsuario2').hidden = true;
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

function procesarCreacionUsuario(event) {
    event.preventDefault();
    
    const nombres = document.getElementById('nombres').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const documento = document.getElementById('documento').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const idRol = document.getElementById('rol').value;

    if (!nombres || !apellidos || !documento || !email || !idRol) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    // Validar que el idRol esté en la lista de opciones del select
    const roleSelect = document.getElementById('rol');
    const validRole = Array.from(roleSelect.options).some(option => option.value == idRol);

    if (!validRole) {
        alert("Por favor, selecciona un rol válido de la lista.");
        return;
    }

    const usuarioData = {
        nombres: nombres,
        apellidos: apellidos,
        documento: documento,
        email: email,
        telefono: telefono,
        idRol: idRol
    };

    console.log(usuarioData);

    fetch('http://localhost:8080/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            alert("Usuario creado exitosamente");
            window.location.href = "Usuarios.html";
        } else {
            return response.json().then(errorData => {
                console.error('Error en la respuesta:', errorData);
                alert("Error al crear el usuario: " + (errorData.message || "Error desconocido"));
            });
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert("Ocurrió un error al crear el usuario");
    });
}
