// ------------  Creando FUNCION CONSTRUCTORA  ----------------

function Equipo(nombre, precio, memoria, stock) {

    this.nombre = nombre
    this.precio = precio
    this.memoria = memoria
    this.stock = stock

}

// ---------------  Creando Objetos con la Funcion Constructora  --------------

const iPhX = new Equipo ("iphone x", 90000, "128gb", 3)
const iPh11 = new Equipo ("iphone 11", 115000, "128gb", 2)
const iPh12 = new Equipo ("iphone 12", 180000, "256gb", 1)
const iPh13Pro = new Equipo ("iphone 13 pro", 250000, "512gb", 2)

// ------------------  Creando Array de Objetos  --------------------

const stockEquipos = [iPhX, iPh11, iPh12, iPh13Pro]


alert ("Bienvenido a iShop, la tienda de productos Apple")

let seleccionUsuario = prompt("Desea ingresar como Cliente o Administrador? Escriba la respuesta en el siguiente campo").toLowerCase()

while (seleccionUsuario) {
    if (seleccionUsuario == "cliente"){
        
        let decisionCliente = confirm ("¿Desea buscar algun equipo en especifico?") 
        if(decisionCliente == true) {
            const equipoBuscado = prompt("Ingrese el nombre y modelo del equipo que desea buscar:").toLocaleLowerCase()
            const equipoEncontrado = []
            for (let i = 0; i < stockEquipos.length; i++) {
                if (stockEquipos[i].nombre == equipoBuscado) {
                    equipoEncontrado.push(stockEquipos[i])
                }
            }
            if (equipoEncontrado.length > 0) {
                console.table(equipoEncontrado)
                alert("Felicitaciones! El equipo " + equipoBuscado + " se encuentra disponible")
            } else {
                alert("No contamos con el equipo " + equipoBuscado + " en nuestro stock, o no ha ingresado un valor valido, en ese caso reintente la busqueda.")
            }
        }else {
            alert("A continuación le mostraremos la lista de stock disponible en iShop")
            console.table(stockEquipos[0])
            console.table(stockEquipos[1])
            console.table(stockEquipos[2])
            console.table(stockEquipos[3])
        }
    }else if(seleccionUsuario == "administrador" || seleccionUsuario == "admin") {

        alert("Bienvenido, a continuacion vamos a verificar su identidad con su nombre de usuario y contraseña, recuerdes que tiene solo 3 intentos")

        // Creando funcion para ingreso de usuario con limite de intentos.
        function ingresoAdmin() {

            // Usuario y contraseña 
            const usuarioAdmin = "administrador"
            const contraseniaAdmin = "soyadmin123"
             
            let intentos = 3
          
            while (intentos > 0) {
              const usuario = prompt("Ingrese su nombre de usuario")
              const contrasenia = prompt("Ingrese su contraseña")
          
              if (usuario === usuarioAdmin && contrasenia === contraseniaAdmin) {
                alert("¡Validacion de administrador exitosa! A continuacion vas a poder agregar equipos a la lista de stock")
                  
                // Función para agregar un nuevo producto
                function ingresoEquipo() {
                    const nombre = prompt("Ingrese el nombre del producto:");
                    const precio = parseFloat(prompt("Ingrese el precio del producto:"));
                    const memoria = prompt("Ingrese la memoria del producto:");
                    const stock = parseInt(prompt("Ingrese el stock del producto:"));
                  
                    const ingresoEquipo = new Equipo(nombre, precio, memoria, stock);
  
                    const stockCopia = stockEquipos.slice();
                    stockCopia.push(ingresoEquipo);
  
                    alert("¡Equipo agregado satisfactoriamente! Por consola va a poder ver el stock actual actualizado");
                    
                    const fechaHoraActual = new Date().toLocaleString()

                    console.log("Stock actualizado el " + fechaHoraActual, stockCopia);
                    console.table(stockCopia[4])
                  }
                  
                  ingresoEquipo();
                  
                return
              } else {
                intentos--
                alert("Usuario o contraseña incorrectos. Le quedan " + intentos + " intentos.")
              }
            }
          
            alert("Ha agotado el número de intentos permitidos. Por favor, inténtelo más tarde.")
          }
          
          ingresoAdmin();
    }break
}














