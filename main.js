// SIMULADOR DE CATALOGO DE AUTOS CON OPCION DE PAGO, CON EFECTIVO UN DESCUENTO Y CON TARJETA UN RECARGO.

let nombre = prompt("Porfavor Ingrese su nombre")

alert ("Hola " + nombre + "! Bienvenidx a nuestro catalogo de autos usados")
alert ("A continuacion le mostraremos los autos en stock. Porfavor ingrese un número dependiendo el auto que desee")

let pagoEfectivo = 0.20
let pagoTarjeta = 0.15
let precio = 0

function calculadoraEfect (precio,pagoEfectivo,precio) {
    return (precio - (precio * pagoEfectivo))
}
function calculadoraTarjeta (precio,pagoTarjeta,precio){
    return (precio + (precio * pagoTarjeta))
}
let seleccionUsuario = prompt("(1)Ford Escort $2500<->(2)Suzuki Fun $2750<->(3)Chevrolet Corsa $3000")


while (seleccionUsuario) {
    if (seleccionUsuario == 1){
        let metodoPago = prompt("Ha seleccionado Ford Escort, desea pagar en efectivo o con tarjeta? Escriba su respuesta.").toLowerCase()
        if(metodoPago == "efectivo"){
            let precio = 2500
            let compraAuto = confirm("Pagando en efectivo el precio con descuento es el siguiente $" + calculadoraEfect(precio,pagoEfectivo,precio) + " ¿Desea pagar con este medio de pago?")
            if (compraAuto === false){
                metodoPago = prompt("Ha seleccionado Ford Escort, desea pagar en efectivo o con tarjeta? Escriba su respuesta.").toLowerCase()
                if (metodoPago == "tarjeta"){
                    let compraAuto = confirm ("Pagando con tarjeta tiene un recargo del 15%, el precio es el siguiente $" + calculadoraTarjeta(precio,pagoTarjeta,precio) + " ¿Desea pagar con este medio de pago?")
                    if (compraAuto ==true){
                        alert("Muchas gracias por su compra!")
                    }
                    break                    
                }                
            }        
            else if (compraAuto === true){
                alert("Muchas gracias por su compra!")
                break
            }
        }
        else if(metodoPago == "tarjeta") {
            let precio =2500
            let compraAuto = confirm ("Pagando con tarjeta tiene un recargo del 15%, el precio es el siguiente $" + calculadoraTarjeta(precio,pagoTarjeta,precio) + " ¿Desea pagar con este medio de pago?")
            if (compraAuto === false){
                metodoPago = prompt("Ha seleccionado Ford Escort, desea pagar en efectivo o con tarjeta? Escriba su respuesta.").toLowerCase()
                if (metodoPago == "efectivo"){
                    let compraAuto = confirm ("Pagando en efectivo el precio con descuento es el siguiente $" + calculadoraEfect(precio,pagoEfectivo,precio) + " ¿Desea pagar con este medio de pago?")
                    if (compraAuto ==true){
                        alert("Muchas gracias por su compra!")
                    }
                    break                    
                }
                
            }        
            else if (compraAuto === true){
                alert("Muchas gracias por su compra!")
                break
            }
        }
        }
    else if (seleccionUsuario == 2){
        let metodoPago = prompt("Ha seleccionado Suzuki Fun, desea pagar en efectivo o con tarjeta? Escriba su respuesta.").toLowerCase()
        if(metodoPago == "efectivo"){
            let precio = 2750
            let compraAuto = confirm("Pagando en efectivo el precio con descuento es el siguiente $" + calculadoraEfect(precio,pagoEfectivo,precio) + " ¿Desea pagar con este medio de pago?")
            if (compraAuto === false){
                metodoPago = prompt("Ha seleccionado Suzuki Fun, desea pagar en efectivo o con tarjeta? Escriba su respuesta.").toLowerCase()
                
                if (metodoPago == "tarjeta"){
                    let compraAuto = confirm ("Pagando con tarjeta tiene un recargo del 15%, el precio es el siguiente $" + calculadoraTarjeta(precio,pagoTarjeta,precio) + " ¿Desea pagar con este medio de pago?")
                    if (compraAuto ==true){
                        alert("Muchas gracias por su compra!")
                    }
                    break     
                }                
            }        
            else if (compraAuto === true){
                alert("Muchas gracias por su compra!")
                break
            }
        }
        else if(metodoPago == "tarjeta") {
            let precio =2750
            let compraAuto = confirm ("Pagando con tarjeta tiene un recargo del 15%, el precio es el siguiente $" + calculadoraTarjeta(precio,pagoTarjeta,precio) + " ¿Desea pagar con este medio de pago?")
            if (compraAuto === false){
                metodoPago = prompt("Ha seleccionado Suzuki Fun, desea pagar en efectivo o con tarjeta? Escriba su respuesta.").toLowerCase()
                if (metodoPago == "efectivo"){
                    let compraAuto = confirm("Pagando en efectivo el precio con descuento es el siguiente $" + calculadoraEfect(precio,pagoEfectivo,precio) + " ¿Desea pagar con este medio de pago?")
                    if (compraAuto == true){
                        alert("Muchas gracias por su compra!")
                    }
                    break                    
                }
                
            }        
            else if (compraAuto === true){
                alert("Muchas gracias por su compra!")
                break
            }
        }
    }
    else if (seleccionUsuario == 3){
        let metodoPago = prompt("Ha seleccionado Chevrolet Corsa, desea pagar en efectivo o con tarjeta? Escriba su respuesta.").toLowerCase()
        if(metodoPago == "efectivo"){
            let precio = 3000
            let compraAuto = confirm("Pagando en efectivo el precio con descuento es el siguiente $" + calculadoraEfect(precio,pagoEfectivo,precio) + " ¿Desea pagar con este medio de pago?")
            if (compraAuto === false){
                metodoPago = prompt("Ha seleccionado Chevrolet Corsa, desea pagar en efectivo o con tarjeta? Escriba su respuesta.").toLowerCase()
                if (metodoPago == "tarjeta"){
                    let compraAuto = confirm ("Pagando con tarjeta tiene un recargo del 15%, el precio es el siguiente $" + calculadoraTarjeta(precio,pagoTarjeta,precio) + " ¿Desea pagar con este medio de pago?")
                    if (compraAuto ==true){
                        alert("Muchas gracias por su compra!")
                    }
                    break                  
                }                
            }        
            else if (compraAuto === true){
                alert("Muchas gracias por su compra!")
                break
            }
        }
        else if(metodoPago == "tarjeta") {
            let precio =3000
            let compraAuto = confirm ("Pagando con tarjeta tiene un recargo del 15%, el precio es el siguiente $" + calculadoraTarjeta(precio,pagoTarjeta,precio) + " ¿Desea pagar con este medio de pago?")
            if (compraAuto === false){
                metodoPago = prompt("Ha seleccionado Chevrolet Corsa, desea pagar en efectivo o con tarjeta? Escriba su respuesta.").toLowerCase()
                if (metodoPago == "efectivo"){
                    let compraAuto = confirm("Pagando en efectivo el precio con descuento es el siguiente $" + calculadoraEfect(precio,pagoEfectivo,precio) + " ¿Desea pagar con este medio de pago?")
                    if (compraAuto == true){
                        alert("Muchas gracias por su compra!")
                    }
                    break                    
                }
                
            }        
            else if (compraAuto === true){
                alert("Muchas gracias por su compra!")
                break
            }
        }
    }
    else (seleccionUsuario == "" || seleccionUsuario >3); {
        alert ("Tas aburrido genio?")
    }
    break;
}



