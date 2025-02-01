document.getElementById('btnIngresar').addEventListener('click', function () {
    document.getElementById('mensajeBienvenida').style.display = 'none'; // Ocultar mensaje de bienvenida
    document.getElementById('loginContainer').style.display = 'block'; // Mostrar formulario de inicio de sesión
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío del formulario
    const usuarioIngresado = document.getElementById('username').value;
    const contrasenaIngresada = document.getElementById('password').value;

    // solicitud al backend en lugar de validación local
    fetch('http://localhost:8080/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: usuarioIngresado,
            contrasena: contrasenaIngresada
        })
    })
    .then(response => response.json())
    .then(result=>{
        if (result){
            sessionStorage.setItem('UsuarioActual', JSON.stringify(result));
            window.location.href = "Menu.html";
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert('Usuario y/o contraseña incorrectos, Intenta de nuevo.');
    });
});
