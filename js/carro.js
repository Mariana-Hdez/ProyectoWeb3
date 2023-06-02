
var inventario = [
    {
        "clave": "001",
        "producto": "Refresco",
        "categoria": "Bebidas",
        "existencia": 10,
        "precio": 19.99,
        "foto": "bebidas.jpg",
        "nivel_reorden": 15
    },
    {
        "clave": "002",
        "producto": "Cereal Kellogs",
        "categoria": "Cereal",
        "existencia": 20,
        "precio": 39.99,
        "foto": "cereales.jpg",
        "nivel_reorden": 30
    },
    {
        "clave": "003",
        "producto": "Atún",
        "categoria": "Enlatados",
        "existencia": 8,
        "precio": 79.99,
        "foto": "enlatados.jpg",
        "nivel_reorden": 10
    }
];

function generarListaInventario() {
    var inventarioTable = document.getElementById("carrin");

    // Limpiar la tabla antes de volver a generarla
    while (inventarioTable.firstChild) {
        inventarioTable.removeChild(inventarioTable.firstChild);
    }

    for (var i = 0; i < inventario.length; i++) {
        var producto = inventario[i];
        var row = document.createElement("tr");

        var claveCell = document.createElement("td");
        claveCell.textContent = producto.clave;
        row.appendChild(claveCell);

        var productoCell = document.createElement("td");
        productoCell.textContent = producto.producto;
        row.appendChild(productoCell);

        var categoriaCell = document.createElement("td");
        categoriaCell.textContent = producto.categoria;
        row.appendChild(categoriaCell);

        var existenciaCell = document.createElement("td");
        existenciaCell.textContent = producto.existencia;
        existenciaCell.classList.add('existencias');
        row.appendChild(existenciaCell);

        var precioCell = document.createElement("td");
        precioCell.textContent = producto.precio;
        row.appendChild(precioCell);

        var fotoCell = document.createElement("td");
        fotoCell.innerHTML = '<img src="' + producto.foto + '" alt="' + producto.producto + '" width="50">';
        row.appendChild(fotoCell);

        var nivelReordenCell = document.createElement("td");
        nivelReordenCell.textContent = producto.nivel_reorden;
        row.appendChild(nivelReordenCell);

        var accionesCell = document.createElement("td");
        var carritoBtn = document.createElement("button");
        carritoBtn.textContent = "Añadir al carrito";
        carritoBtn.onclick = mostrarDetalle.bind(null, producto);
        accionesCell.appendChild(carritoBtn);


        row.appendChild(accionesCell);

        if (producto.nivel_reorden > producto.existencia) {
            row.classList.add("low-stock");
        }

        inventarioTable.appendChild(row);
    }
}

function mostrarFormulario() {
    var formulario = document.getElementById("formulario");
    formulario.style.display = "block";
}

function cancelarFormulario() {
    var formulario = document.getElementById("formulario");
    formulario.style.display = "none";
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById("clave").value = "";
    document.getElementById("producto").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("existencia").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("foto").value = "";
    document.getElementById("nivel_reorden").value = "";
}

function agregarProducto() {
    var clave = document.getElementById("clave").value;
    var producto = document.getElementById("producto").value;
    var categoria = document.getElementById("categoria").value;
    var existencia = parseInt(document.getElementById("existencia").value);
    var precio = parseFloat(document.getElementById("precio").value);
    var foto = document.getElementById("foto").value;
    var nivelReorden = parseInt(document.getElementById("nivel_reorden").value);

    var nuevoProducto = {
        "clave": clave,
        "producto": producto,
        "categoria": categoria,
        "existencia": existencia,
        "precio": precio,
        "foto": foto,
        "nivel_reorden": nivelReorden
    };

    inventario.push(nuevoProducto);
    generarListaInventario();
    cancelarFormulario();
}

function editarProducto(indice) {
    var producto = inventario[indice];
    document.getElementById("clave").value = producto.clave;
    document.getElementById("producto").value = producto.producto;
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("existencia").value = producto.existencia;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("foto").value = producto.foto;
    document.getElementById("nivel_reorden").value = producto.nivel_reorden;

    var formulario = document.getElementById("formulario");
    formulario.style.display = "block";

    var agregarBtn = document.createElement("button");
    agregarBtn.textContent = "Guardar";
    agregarBtn.onclick = function() {
        guardarProducto(indice);
    };

    var cancelarBtn = document.createElement("button");
    cancelarBtn.textContent = "Cancelar";
    cancelarBtn.onclick = cancelarFormulario;

    var accionesCell = document.getElementById("acciones-cell");
    accionesCell.innerHTML = "";
    accionesCell.appendChild(agregarBtn);
    accionesCell.appendChild(cancelarBtn);
}

function guardarProducto(indice) {
    var clave = document.getElementById("clave").value;
    var producto = document.getElementById("producto").value;
    var categoria = document.getElementById("categoria").value;
    var existencia = parseInt(document.getElementById("existencia").value);
    var precio = parseFloat(document.getElementById("precio").value);
    var foto = document.getElementById("foto").value;
    var nivelReorden = parseInt(document.getElementById("nivel_reorden").value);

    var productoEditado = {
        "clave": clave,
        "producto": producto,
        "categoria": categoria,
        "existencia": existencia,
        "precio": precio,
        "foto": foto,
        "nivel_reorden": nivelReorden
    };

    inventario[indice] = productoEditado;
    generarListaInventario();
    cancelarFormulario();
}

function eliminarProducto(indice) {
    inventario.splice(indice, 1);
    generarListaInventario();
}

function mostrarDetalle(producto) {
    var detalle = "Producto: " + producto.producto + "\n";
    detalle += "Existencia: " + producto.existencia + "\n";
    detalle += "Precio: $" + producto.precio + "\n";
    detalle += "Categoría: " + producto.categoria + "\n";
    detalle += "Nivel de reorden: " + producto.nivel_reorden + "\n";

    producto.existencia  = document.getElementById("existencias");  // Obtener el elemento de la celda
    alert(producto.existencia);

    alert(detalle);
}

window.addEventListener("load", generarListaInventario);
