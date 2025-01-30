document.addEventListener('DOMContentLoaded', function() {
    // Aca es para cargar categorías desde la base de datos
    fetch('http://localhost:8080/categorias')
        .then(response => response.json())
        .then(data => {
            const categoriaSelect = document.getElementById('categoria');
            data.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.idCategoria;
                option.text = categoria.nombre;
                categoriaSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar las categorías:', error));
});

const usuario = JSON.parse(sessionStorage.getItem('UsuarioActual'));
if (usuario) {
    if (usuario.idRol == 2) {
        document.getElementById('menuUsuario1').hidden = true;
        document.getElementById('menuUsuario2').hidden = true;
    }
}

function procesarCreacionProducto(event) {
    event.preventDefault();

    var select = document.getElementById('categoria');
    var opcionSeleccionada = select.options[select.selectedIndex];
    var categoriaId = opcionSeleccionada.value;
    const productoNombre = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;
    const precioCompra = document.getElementById('precioCompra').value;
    const precioVenta = document.getElementById('precioVenta').value;

    console.log({
        categoriaId: categoriaId,
        productoNombre: productoNombre,
        cantidad: cantidad,
        precioCompra: precioCompra,
        precioVenta: precioVenta
    });

    // Aca es para confirmar la solicitud al servidor para crear el producto
    fetch('http://localhost:8080/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idCategoria: categoriaId,
            producto: productoNombre,
            cantidad: cantidad,
            precioCompra: precioCompra,
            precioVenta: precioVenta
        })
    })
    .then(response => {
        console.log(response);
        if (response.ok) {
            alert("Producto creado exitosamente");
            window.location.href = "Productos.html";
        } else {
            return response.json().then(errorData => {
                console.error('Error en la respuesta:', errorData);
                alert("Error al crear el producto: " + (errorData.message || "Error desconocido"));
            });
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert("Ocurrió un error al crear el producto");
    });
}
