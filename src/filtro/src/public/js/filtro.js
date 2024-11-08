// Simulador de filtro 
document.getElementById('button').addEventListener('click', function() {
    buscarProductos(); // Llama a la función buscarProductos
});
document.getElementById('filtro').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        buscarProductos();
    }
});

function buscarProductos() {
    const busqueda = document.getElementById('filtro').value.toLowerCase(); // 'busqueda' a 'filtro'
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto => {
        const nombreProducto = producto.querySelector('h3').textContent.toLowerCase();
        if (nombreProducto.includes(busqueda)) {
            producto.style.display = 'block'; // Muestra el producto
        } else {
            producto.style.display = 'none'; // Oculta el producto
        }
    });
}