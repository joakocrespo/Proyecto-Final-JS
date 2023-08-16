// ------------  Creando FUNCION CONSTRUCTORA  ----------------

function Equipo(nombre, precio, memoria, color, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.memoria = memoria;
    this.color = color;
    this.imagen = imagen;
}

// ---------------  Creando Objetos con la Funcion Constructora  --------------

const iPhX = new Equipo("iphone x", "$90000", "Almacenamiento: 128gb", "Color: Azul", "./assets/iphonex-main.jpg");
const iPh11 = new Equipo("iphone 11", "$115000", "Almacenamiento: 128gb", "Color: Gris Espacial", "./assets/iphone11-main.webp");
const iPh12 = new Equipo("iphone 12", "$180000", "Almacenamiento: 256gb", "Color: Rojo", "./assets/iphone12-main.jpg");
const iPh13Pro = new Equipo("iphone 13 pro", "$250000", "Almacenamiento: 512gb", "Color: Blanco", "./assets/iphone13-pro-main.jpg");

// ------------------  Creando Array de Objetos  --------------------

const stockEquipos = [iPhX, iPh11, iPh12, iPh13Pro];

const plantillaCard = '<div class="card"><img src="" class="card-img-top" alt="..." height="200px"><div class="card-body"><h5 class="card-title" id="infoNombre"></h5><p class="card-text" id="infoPrecio">Precio: </p><p class="card-text" id="infoMemoria"></p><p class="card-text" id="infoColor"></p><button id="agregar-carrito" class="btn btn-primary agregar-carrito" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"aria-controls="offcanvasRight">Agregar al Carrito</button><button  class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"aria-controls="offcanvasRight">Mostrar Carrito</button></div></div>';

// Funcion para filtrar Stock por nombre de Equipo

function buscarDisponibilidad() {
    const nombreCelular = document.getElementById("buscadorInput").value;
    const equipoEncontrado = stockEquipos.find(celular => celular.nombre == nombreCelular);

    if (equipoEncontrado) {
        const resultadoDiv = document.getElementById("resultado");

        // Crear un nuevo elemento para mostrar el resultado
        const cardElement = document.createElement("div");
        cardElement.innerHTML = plantillaCard;

        // Relleno de la card Resultado segun el equipo filtrado
        cardElement.querySelector("#infoNombre").textContent = equipoEncontrado.nombre;
        cardElement.querySelector("#infoPrecio").textContent = equipoEncontrado.precio;
        cardElement.querySelector("#infoMemoria").textContent = equipoEncontrado.memoria;
        cardElement.querySelector("#infoColor").textContent = equipoEncontrado.color;
        cardElement.querySelector("img").setAttribute("src", equipoEncontrado.imagen);

        // Borrar busqueda anterior antes de agregar nueva card
        resultadoDiv.innerHTML = "";

        // Agregando la card con le resultado al DOM
        resultadoDiv.appendChild(cardElement);
    } else {
        document.getElementById("resultado").textContent = `No se encontró el celular ${nombreCelular} en el stock.`;
    }
}

document.getElementById("botonBusqueda").addEventListener("click", buscarDisponibilidad);

// Carrito de compras
const carrito = [];

// Función para agregar al carrito
function agregarCarrito(producto) {
    carrito.push(producto);
}

// Función para calcular el precio total
function calcularPreciofinal() {
    return carrito.reduce((total, producto) => total + parseFloat(producto.precio.substring(1)), 0);
}

// Función para actualizar el contenido del offcanvas
function actualizarCarrito() {
    const offcanvasContent = document.querySelector(".offcanvas-body");
    offcanvasContent.innerHTML = "";

    if (carrito.length === 0) {
        offcanvasContent.innerHTML = "<h2>El carrito está vacío.</h2>";
    } else {
        carrito.forEach((producto, index) => {
            const productInfo = document.createElement("p");
            productInfo.textContent = `${producto.nombre} - ${producto.precio}`;
            offcanvasContent.appendChild(productInfo);

            // Agregar botón de eliminación para cada producto
            const eliminarProducto = botonEliminar(index);
            offcanvasContent.appendChild(eliminarProducto);
        });

        // Mostrar el precio total
        const totalPriceElement = document.createElement("h3");
        totalPriceElement.textContent = `Precio Total: $${calcularPreciofinal().toFixed(2)}`;
        offcanvasContent.appendChild(totalPriceElement);
    }
}

// Función para crear un botón de eliminación para cada producto en el carrito
function botonEliminar(index) {
    const eliminarProducto = document.createElement("button");
    eliminarProducto.classList.add("btn", "btn-danger", "eliminar-producto");
    eliminarProducto.type = "button";
    eliminarProducto.dataset.index = index;
    eliminarProducto.textContent = "Eliminar";
    return eliminarProducto;
}

// Función para guardar el carrito en el localStorage
function guardaCarritoLS() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para mostrar un mensaje de que el carrito se actualizó
function msjActualizacion() {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'El carrito se ha actualizado!',
        showConfirmButton: false,
        timer: 1000
      })
}

// Evento para agregar al carrito desde resultados de búsqueda
document.getElementById("resultado").addEventListener("click", function(event) {
    const target = event.target;

    if (target.id === "agregar-carrito") {
        const card = target.closest(".card");
        const nombre = card.querySelector("#infoNombre").textContent;
        const equipoEncontrado = stockEquipos.find(celular => celular.nombre === nombre);

        if (equipoEncontrado) {
            agregarCarrito(equipoEncontrado);
            actualizarCarrito();
            guardaCarritoLS();
            msjActualizacion(`Se agregó ${equipoEncontrado.nombre} al carrito.`);
        }
    }
});


// Evento para eliminar un producto del carrito
document.querySelector(".offcanvas-body").addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("eliminar-producto")) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'El producto será eliminado del carrito.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        Swal.getPopup().querySelector('.swal2-confirm').addEventListener('click', function() {
            const index = parseInt(target.dataset.index);
            if (!isNaN(index) && index >= 0 && index < carrito.length) {
                carrito.splice(index, 1);
                actualizarCarrito();
                guardaCarritoLS();
                msjActualizacion(`Se eliminó un producto del carrito.`);
            }
        });
    }
});
