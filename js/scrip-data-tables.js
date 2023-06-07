var inventario = [
    {
        "id": "001",
        "producto": "Refresco",
        "categoria": "Bebidas",
        "existencia": 15,
        "precio": 19.99,
        "foto": "assets/img/bebidas.jpg",
        "orden": 10
    },
    {
        "id": "002",
        "producto": "Cereal Kellogs",
        "categoria": "Cereal",
        "existencia": 20,
        "precio": 39.99,
        "foto": "assets/img/cereales.jpg",
        "orden": 30
    },
    {
        "id": "003",
        "producto": "Atún",
        "categoria": "Enlatados",
        "existencia": 8,
        "precio": 79.99,
        "foto": "assets/img/enlatados.jpg",
        "orden": 10
    },
    {
        "id": "004",
        "producto": "Cheetos",
        "categoria": "Frituras",
        "existencia": 16,
        "precio": 12.99,
        "foto": "assets/img/cheetos.jpg",
        "orden": 12
    },
    {
        "id": "005",
        "producto": "Aceite Nutrioli",
        "categoria": "Cocina",
        "existencia": 20,
        "precio": 49.99,
        "foto": "assets/img/nutrioli.png",
        "orden": 16
    },
    {
        "id": "006",
        "producto": "Lechera",
        "categoria": "Enlatados",
        "existencia": 8,
        "precio": 17.99,
        "foto": "assets/img/enlatados.jpg",
        "orden": 8
    }
];

$(document).ready(function () {
    var tabla = $('#example').DataTable({
        data: inventario,
        columns: [
            {title: 'Clave', data:'id'},
            {title: 'Producto', data:'producto'},
            {title: 'Categoria', data: 'categoria'},
            {title: 'Existencia', data: 'existencia'},
            {title: 'Precio', data: 'precio'},
            {title: 'Foto', data: 'foto'},
            {title: 'Nivel de reorden', data: 'orden'},
            {
                title: 'Acciones',
                data:null,
                render: (data, type)=>{
                    return `
                    <button class="btn btn-outline-info">Detalles</button>
                    <button class="btn btn-outline-primary">Editar</button>
                    <button class="btn btn-outline-danger">Eliminar</button>`;
                }
            },
        ],
        "createdRow": function(row, data){
            var exis = data.existencia;
            var orden = data.orden;

            if(orden > exis){
                $(row).addClass("table-danger");
                $(row).addClass("border-dark");
            }

            if(orden == exis){
                $(row).addClass("table-warning");
                $(row).addClass("border-dark");
            }
        },
        responsive: true,
        columnDefs:[
            {responsivePriority: 1, targets:[1,-1]},
            {responsivePriority: 2, targets:[0,-2]},
            {responsivePriority: 3, targets:[2,3,4]},
            {responsivePriority: 4, targets:[-3]},
        ]
    });
});