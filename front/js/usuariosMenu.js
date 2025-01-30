const usuario = JSON.parse(sessionStorage.getItem('UsuarioActual'));
if (usuario) {
    if (usuario.idRol == 2) {
        document.getElementById('menuUsuario1').hidden = true;
        document.getElementById('menuUsuario2').hidden = true;
    }
}
