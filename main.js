// ------------  Creando FUNCION CONSTRUCTORA  ----------------

function Equipo(id, nombre, precio, memoria, color, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.memoria = memoria;
    this.color = color;
    this.imagen = imagen;
}

// ---------------  Creando Objetos con la Funcion Constructora  --------------

const iPhX = new Equipo("iphone x", "iPhone X", 300, "Almacenamiento: 128gb", "Color: Azul", "./assets/iphonex-main.jpg");
const iPh11 = new Equipo("iphone 11","iPhone 11", 400, "Almacenamiento: 128gb", "Color: Gris Espacial", "./assets/iphone11-main.webp");
const iPh11Pro = new Equipo("iphone 11 pro","iPhone 11 Pro", 430, "Almacenamiento: 128gb", "Color: Gris Espacial", "./assets/iphone11-main.webp");
const iPh11ProMax = new Equipo("iphone 11 pro max","iPhone 11 Pro MAX", 490, "Almacenamiento: 128gb", "Color: Gris Espacial", "./assets/iphone11-main.webp");
const iPh12 = new Equipo("iphone 12","iPhone 12", 510, "Almacenamiento: 256gb", "Color: Rojo", "./assets/iphone12-main.jpg");
const iPh12Pro = new Equipo("iphone 12 pro","iPhone 12 Pro", 570, "Almacenamiento: 512gb", "Color: Blanco", "./assets/iphone13-pro-main.jpg");
const iPh13 = new Equipo("iphone 13","iPhone 13", 630, "Almacenamiento: 512gb", "Color: Blanco", "./assets/iphone13-pro-main.jpg");
const iPh13Pro = new Equipo("iphone 13 pro","iPhone 13 Pro", 680, "Almacenamiento: 512gb", "Color: Blanco", "./assets/iphone13-pro-main.jpg");
const iPh13ProMax = new Equipo("iphone 13 pro Max","iPhone 13 Pro MAX", 720, "Almacenamiento: 512gb", "Color: Blanco", "./assets/iphone13-pro-main.jpg");

// ------------------  Creando Array de Objetos  --------------------

const stockEquipos = [iPhX, iPh11, iPh11Pro, iPh11ProMax, iPh12, iPh12Pro, iPh13, iPh13Pro, iPh13ProMax];


const plantillaCard = '<div class="card-main"><img src="" alt="Producto"><h2 class="infoNombre">Nombre del Producto</h2><p class="infoPrecio">Precio: $99.99</p><p class="infoMemoria">Memoria: 128GB</p><p class="infoColor">Color: Negro</p><button class="boton-comprar agregar-carrito">Comprar</button>'

const resultadoDiv = document.querySelector("#stock");

// Mostrar x DOM cada Equipo que hay en el array
stockEquipos.forEach(equipo => {
  
  const cardDiv = document.createElement("div");
  cardDiv.innerHTML = plantillaCard;

  cardDiv.querySelector("img").src = equipo.imagen;
  cardDiv.querySelector(".infoNombre").textContent = equipo.nombre;
  cardDiv.querySelector(".infoPrecio").textContent = `Precio: $${equipo.precio}`;
  cardDiv.querySelector(".infoMemoria").textContent = equipo.memoria;
  cardDiv.querySelector(".infoColor").textContent = equipo.color;

  
  resultadoDiv.appendChild(cardDiv);
});

// Funcion para filtrar Stock por nombre de Equipo

function buscarDisponibilidad() {
    const nombreCelular = document.getElementById("buscadorInput").value;
    const equipoEncontrado = stockEquipos.find(celular => celular.id === nombreCelular);

    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = equipoEncontrado
        ? `<div class="card-main">
            <img src="${equipoEncontrado.imagen}" alt="Producto">
            <h2 class="infoNombre">${equipoEncontrado.nombre}</h2>
            <p class="infoPrecio">Precio: $${equipoEncontrado.precio}</p>
            <p class="infoMemoria">${equipoEncontrado.memoria}</p>
            <p class="infoColor">${equipoEncontrado.color}</p>
            <button class="boton-comprar agregar-carrito">Comprar</button>
          </div>`
        : `No se encontró el celular ${nombreCelular} en el stock.`;
}

document.getElementById("botonBusqueda").addEventListener("click", buscarDisponibilidad);

let carrito = [];

let precioDolar; 

fetch("https://api.bluelytics.com.ar/v2/latest")
.then(response => response.json())
.then(data => {
    precioDolar = data.blue.value_avg;
    restauraCarritoLS();
}).catch(error => {
    console.error("Error al obtener la cotización:", error);
});

function agregarCarrito(producto) {
    carrito = [...carrito, producto]; 
    return producto.precio;
}

function guardaCarritoLS() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function restauraCarritoLS() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
        actualizarNumerito();
    }
}
restauraCarritoLS();

function actualizarNumerito() {
    const numeritoElement = document.getElementById("numerito");
    numeritoElement.textContent = carrito.length.toString();
}


function calcularPreciofinal() {
    return  carrito.reduce((total, producto) => total + parseInt(producto.precio), 0);
}

function calcularPrecioFinalDolar() {
    const precioFinal = calcularPreciofinal();
    return precioFinal * precioDolar;
}

function botonEliminar(index) {
    const eliminarProducto = document.createElement("button");
    eliminarProducto.classList.add("btn", "btn-danger", "eliminar-producto");
    eliminarProducto.type = "button";
    eliminarProducto.dataset.index = index;
    eliminarProducto.textContent = "Eliminar";
    return eliminarProducto;
}

function actualizarCarrito() {
    const contenidoCarrito = document.querySelector(".offcanvas-body");
    contenidoCarrito.innerHTML = "";

    const precioTotalHTML = carrito.length
        ? `<h3>Precio Total en U$D: $${calcularPreciofinal()}</h3>`
        : "<h2>El carrito está vacío.</h2>";

    const precioTotalDolarHTML = carrito.length
        ? `<h4>Precio Total en Pesos: $${calcularPrecioFinalDolar()}</h4>`
        : "";

    contenidoCarrito.innerHTML = `${precioTotalHTML}${precioTotalDolarHTML}`;

    if (carrito.length) {
        carrito.forEach((producto, index) => {

            // Info producto
            const infoProductoAgregado = document.createElement("p");
            infoProductoAgregado.textContent = `${producto.nombre} - $${producto.precio}`;
            contenidoCarrito.appendChild(infoProductoAgregado);

            // Boton eliminar
            const eliminarProducto = botonEliminar(index);
            contenidoCarrito.appendChild(eliminarProducto);
        });
    }
}


function msjActualizacion() {
    Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'El carrito se ha actualizado!',
        showConfirmButton: false,
        timer: 500
      })
}

// Agregar carrito desde resultado de busqueda

document.getElementById("resultado").addEventListener("click", function(event) {
    const target = event.target;

    if (target.classList.contains("agregar-carrito")) {
        const card = target.closest(".card-main");
        const nombre = card.querySelector(".infoNombre").textContent;
        const equipoEncontrado = stockEquipos.find(celular => celular.nombre === nombre);

        if (equipoEncontrado) {
            agregarCarrito(equipoEncontrado);
            msjActualizacion();
            guardaCarritoLS();
            actualizarCarrito();
            actualizarNumerito();
        }
    }
});

// Agregar carrito desde el div de stock

document.getElementById("stock").addEventListener("click", function(event) {
    const target = event.target;

    if (target.classList.contains("agregar-carrito")) {
        const card = target.closest(".card-main");
        const nombre = card.querySelector(".infoNombre").textContent;
        const equipoEncontrado = stockEquipos.find(celular => celular.nombre === nombre);

        if (equipoEncontrado) {
            agregarCarrito(equipoEncontrado);
            msjActualizacion();
            guardaCarritoLS();
            actualizarCarrito();
            actualizarNumerito ();
        }
    }
});


// Eliminar un producto del carrito
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
        }).then((result) => {
            if (result.isConfirmed) {
                return new Promise((resolve) => {
                    const index = parseInt(target.dataset.index);
                    if (!isNaN(index) && index >= 0 && index < carrito.length) {
                        carrito.splice(index, 1);
                        msjActualizacion(`Se eliminó un producto del carrito.`);
                        guardaCarritoLS();
                        actualizarCarrito();
                        actualizarNumerito();
                        resolve();
                    }
                });
            }
        });
    }
});
