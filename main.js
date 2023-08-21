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
const iPh11Pro = new Equipo("iphone 11 pro", "$125000", "Almacenamiento: 128gb", "Color: Gris Espacial", "./assets/iphone11-main.webp");
const iPh11ProMax = new Equipo("iphone 11 pro max", "$130000", "Almacenamiento: 128gb", "Color: Gris Espacial", "./assets/iphone11-main.webp");
const iPh12 = new Equipo("iphone 12", "$180000", "Almacenamiento: 256gb", "Color: Rojo", "./assets/iphone12-main.jpg");
const iPh12Pro = new Equipo("iphone 12 pro", "$195000", "Almacenamiento: 512gb", "Color: Blanco", "./assets/iphone13-pro-main.jpg");
const iPh13 = new Equipo("iphone 13", "$205000", "Almacenamiento: 512gb", "Color: Blanco", "./assets/iphone13-pro-main.jpg");
const iPh13Pro = new Equipo("iphone 13 pro", "$250000", "Almacenamiento: 512gb", "Color: Blanco", "./assets/iphone13-pro-main.jpg");
const iPh13ProMax = new Equipo("iphone 13 pro Max", "$280000", "Almacenamiento: 512gb", "Color: Blanco", "./assets/iphone13-pro-main.jpg");

// ------------------  Creando Array de Objetos  --------------------

const stockEquipos = [iPhX, iPh11, iPh11Pro, iPh11ProMax, iPh12, iPh12Pro, iPh13, iPh13Pro, iPh13ProMax];


const plantillaCard = '<div class="card-main"><img src="" alt="Producto"><h2 class="infoNombre">Nombre del Producto</h2><p class="infoPrecio">Precio: $99.99</p><p class="infoMemoria">Memoria: 128GB</p><p class="infoColor">Color: Negro</p><button class="boton-comprar agregar-carrito">Comprar</button><button class="btn btn-primary mostrar-carrito" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Mostrar Carrito</button></div>'

// Obtén el elemento donde deseas mostrar las tarjetas (por ejemplo, un div con el id "resultado")
const resultadoDiv = document.querySelector("#resultado");

// Recorre el array de objetos y crea las tarjetas para cada uno
stockEquipos.forEach(equipo => {
  // Crea un div y establece la plantilla HTML
  const cardDiv = document.createElement("div");
  cardDiv.innerHTML = plantillaCard;

  // Actualiza los elementos dentro de la plantilla con los datos del objeto
  cardDiv.querySelector("img").src = equipo.imagen;
  cardDiv.querySelector(".infoNombre").textContent = equipo.nombre;
  cardDiv.querySelector(".infoPrecio").textContent = `Precio: ${equipo.precio}`;
  cardDiv.querySelector(".infoMemoria").textContent = equipo.memoria;
  cardDiv.querySelector(".infoColor").textContent = equipo.color;

  // Agrega la tarjeta completa al div donde deseas mostrar los resultados
  resultadoDiv.appendChild(cardDiv);
});

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
        cardElement.querySelector(".infoNombre").textContent = equipoEncontrado.nombre;
        cardElement.querySelector(".infoPrecio").textContent = equipoEncontrado.precio;
        cardElement.querySelector(".infoMemoria").textContent = equipoEncontrado.memoria;
        cardElement.querySelector(".infoColor").textContent = equipoEncontrado.color;
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

let carrito = [];

// Función para guardar el carrito en el localStorage
function guardaCarritoLS() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Llamada para restaurar el carrito del local storage
function restauraCarritoLS() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Restaura el carrito al cargar la página
restauraCarritoLS();


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

    if (target.classList.contains("agregar-carrito")) {
        const card = target.closest(".card-main");
        const nombre = card.querySelector(".infoNombre").textContent;
        const equipoEncontrado = stockEquipos.find(celular => celular.nombre === nombre);

        if (equipoEncontrado) {
            agregarCarrito(equipoEncontrado);
            msjActualizacion(`Se agregó ${equipoEncontrado.nombre} al carrito.`);
            guardaCarritoLS();
            actualizarCarrito();
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
                msjActualizacion(`Se eliminó un producto del carrito.`);
                guardaCarritoLS();
                actualizarCarrito();
            }
        });
    }
});
