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

    // Para cargar nombres de usuario desde la base de datos
    fetch('http://localhost:8080/usuarios')
        .then(response => response.json())
        .then(data => {
            const usuarioSelect = document.getElementById('usuarioS'); // Cambiado aquí
            if (usuarioSelect) { // Verificar si el elemento existe
                data.forEach(usuarioLista => {
                    const option = document.createElement('option');
                    option.value = usuarioLista.idUsuario;
                    option.text = usuarioLista.nombreUsuario;
                    usuarioSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Error al cargar los usuarios:', error));
});

const usuario = JSON.parse(sessionStorage.getItem('UsuarioActual'));
if (usuario) {
    if (usuario.idRol == 2) {
        document.getElementById('menuUsuario1').hidden = true;
        document.getElementById('menuUsuario2').hidden = true;
    }
}

// Aca es para confirmar la eliminación de un usuario
function confirmarRegistro() {
    return confirm("¿Está seguro de que desea eliminar este usuario?");
}

function procesarEliminacionUsuario(event) {
    event.preventDefault();

    // Confirmar la eliminación
    if (!confirmarRegistro()) {
        return; // Si el usuario cancela, no continuar
    }

    var selectUsuario = document.getElementById('usuarioS');
    var opcionSeleccionadaUsuario = selectUsuario.options[selectUsuario.selectedIndex];   
    var usuarioId = opcionSeleccionadaUsuario.value;
    
    // Obtener el documento del input correspondiente
    var documento = document.getElementById('id').value;

    var selectRol = document.getElementById('rol');
    var opcionSeleccionadaRol = selectRol.options[selectRol.selectedIndex];   
    var idRol = opcionSeleccionadaRol.value;

    const usuarioData = {
        idUsuario: usuarioId,
        documento: documento,
        idRol: idRol
    };

    console.log(usuarioData);
    
    // Aca es para la solicitud al servidor para eliminar el usuario
    fetch('http://localhost:8080/usuarios/Eliminar', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioData)
    })
    .then(response => {
        if (response.ok) {
            alert("Usuario eliminado exitosamente");
            window.location.href = "Usuarios.html";
        } else {
            return response.json().then(errorData => {
                console.error('Error en la respuesta:', errorData);
                alert("Error al eliminar el usuario: " + (errorData.message || "Error desconocido"));
            });
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert("Ocurrió un error al eliminar el usuario");
    });
}
