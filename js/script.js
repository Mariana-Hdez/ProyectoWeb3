
var inventario = [
    {
        "clave": "001",
        "producto": "Refresco",
        "categoria": "Bebidas",
        "existencia": 15,
        "precio": 19.99,
        "foto": "bebidas.jpg",
        "nivel_reorden": 10
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
    },
    {
        "clave": "004",
        "producto": "Cheetos",
        "categoria": "Frituras",
        "existencia": 16,
        "precio": 12.99,
        "foto": "cheetos.jpg",
        "nivel_reorden": 12
    },
    {
        "clave": "005",
        "producto": "Aceite Nutrioli",
        "categoria": "Cocina",
        "existencia": 20,
        "precio": 49.99,
        "foto": "Cocina.jpg",
        "nivel_reorden": 16
    },
    {
        "clave": "006",
        "producto": "Lechera",
        "categoria": "Enlatados",
        "existencia": 8,
        "precio": 17.99,
        "foto": "enlatados.jpg",
        "nivel_reorden": 8
    }
];

function generarListaInventario() {
    var inventarioTable = document.getElementById("inventory-list");

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
        var detalleBtn = document.createElement("button");
        detalleBtn.textContent = "Detalle";
        detalleBtn.className = "btn";
        detalleBtn.classList.add("btn-outline-info");
        detalleBtn.onclick = mostrarDetalle.bind(null, producto);
        accionesCell.appendChild(detalleBtn);

        var editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.className = "btn";
        editarBtn.classList.add("btn-outline-primary");
        editarBtn.onclick = editarProducto.bind(null, i);
        accionesCell.appendChild(editarBtn);

        var eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.className = "btn";
        eliminarBtn.classList.add("btn-outline-danger");
        eliminarBtn.onclick = eliminarProducto.bind(null, i);
        accionesCell.appendChild(eliminarBtn);

        row.appendChild(accionesCell);

        if(producto.existencia < producto.nivel_reorden){
            row.classList.add("table-danger");
            row.classList.add("border-dark");
        }else if(producto.existencia == producto.nivel_reorden){
            row.classList.add("table-warning");
            row.classList.add("border-dark");
        }

        inventarioTable.appendChild(row);
    }
}

function mostrarFormulario() {
    var formulario = document.getElementById("formulario");
    formulario.style.display = "block";

    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.style.display = "none";
}

function cancelarFormulario() {
    var formulario = document.getElementById("formulario");
    formulario.style.display = "none";
    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.style.display = "block";
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
    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.style.display = "block";
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

    alert(detalle);
}

window.addEventListener("load", generarListaInventario);
