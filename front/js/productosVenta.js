document.addEventListener('DOMContentLoaded', function() {
    // Aca es para cargar categorías desde la base de datos
    fetch('http://localhost:8080/categorias')
        .then(response => response.json())
        .then(data => {
            const categoriaSelect = document.getElementById('categoria1');
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
else
    window.location.href = "Inicio.html";

document.getElementById('cerrarSesion').addEventListener('click', function() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        sessionStorage.removeItem('UsuarioActual');
        window.location.href = 'inicio.html';
    }
});

var select = document.getElementById('categoria1');

document.getElementById('categoria1').addEventListener('change', function(){
    var opcionSeleccionada = select.options[select.selectedIndex];   
    var categoriaId = opcionSeleccionada.value;
    var productoSelect = document.getElementById('producto1');
    productoSelect.innerHTML = '<option value="0">Seleccione un producto</option>'; // Limpiar productos anteriores

    if (categoriaId != '0') {
        // Aca es para cargar productos de la categoría seleccionada
        fetch(`http://localhost:8080/productos/ProductoporCategoria/${categoriaId}`)
            .then(response => response.json())
            .then(data => {
                data.forEach(producto => {
                    var option = document.createElement('option');
                    option.value = producto.idProducto;
                    option.text = producto.producto;
                    productoSelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error al cargar los productos:', error));
    }
} );

function procesarSalidaProducto(event) {
    event.preventDefault();

    var selectProducto = document.getElementById('producto1');
    var opcionSeleccionadaProducto = selectProducto.options[selectProducto.selectedIndex];   
    var productoId = opcionSeleccionadaProducto.value;

    const cantidad = document.getElementById('cantidad').value;

    console.log({
        productoId: productoId,
        cantidad: cantidad
    });

    // Aca es para confirmar la solicitud al servidor para registrar la salida del producto
    fetch('http://localhost:8080/ventas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            idProducto: productoId,
            cantidad: cantidad,
            idUsuario: usuario.idUsuario

        })
    })
    .then(response => {
        console.log(response); 
        if (response.ok) {
            alert("Venta de producto registrada exitosamente");
            window.location.href = "Productos.html";
        } else {
            return response.json().then(errorData => {
                console.error('Error en la respuesta:', errorData);
                alert("Error al registrar la venta del producto: " + (errorData.message || "Error desconocido"));
            });
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert("Ocurrió un error al registrar la venta del producto");
    });
}
