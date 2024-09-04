
//* Insertar el id de los elementos de html
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

// Declaración de variables
// Bandera = al ser true permite agregar los datos a la tabla
let isValid = true;
let contador = 0;
let precio = 0;
let costoTotal = 0;
let totalProductos = 0;
// Arreglo vacío, puede ser también new Array()
let datos = [];


//* Función para validar la cantidad
function validarCantidad(){
    // Validar que no esté vacío el campo
    if (txtNumber.value.length == 0){
        return false;
    } // => FIN length == 0

    // Validar que es un número
    if (isNaN(txtNumber.value)){
        return false;
    } // => FIN isNaN

    // Validar que es mayor a 0
    if (Number(txtNumber.value) <= 0){
        return false;
    } // => FIN value <=0

    return true;
} // => FIN validarCantidad



// Función para poner precio al azar
function getPrecio(){
    return Math.round((Math.random()*10000))/100;
} // => FIN getPrecio



//* Ponerle el listener al botón con una función
btnAgregar.addEventListener("click", function (event){
    // Evitar que el botón realice su acción por defecto
    event.preventDefault();
        // Acciones a realizar al tocar el botón
        txtName.style.border = ""
        txtNumber.style.border = ""
        alertValidacionesTexto.innerHTML = "";
        alertValidaciones.style.display = "none";
        isValid = true;

//* Validación de los campos introducidos
    // Validación del nombre de producto (longitud mayor a 3 caracteres)
    if(txtName.value.length < 3){
        txtName.style.border = "solid red medium"
        alertValidacionesTexto.innerHTML = "El <strong>Nombre</strong> no es correcto.</br>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } // => FIN length < 3

    // Validación de la cantidad
    // += en texto sirve para concatenar
    if(! validarCantidad()){
        txtNumber.style.border = "solid red medium"
        alertValidacionesTexto.innerHTML += "La <strong>Cantidad</strong> no es correcta.</br>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } // => FIN ! validarCantidad (not validarCantidad)

    // Si se cumplen los requerimientos, realizar las siguientes acciones:
    if(isValid){
        // Introducir todos los datos en la tabla, después de las validaciones
        contador++;
        precio = getPrecio();
        let row = `<tr>
                    <td>${contador}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`

        // Convertir el objeto con los datos a string para guardarlos en localStorage
        let elemento = {"contador": contador, "nombre": txtName.value, "cantidad": txtNumber.value, "precio": precio};
        datos.push(elemento);
        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);

        // Sumar precios
        costoTotal += precio * Number(txtNumber.value);
        totalProductos += Number(txtNumber.value)
        contadorProductos.innerText = contador;
        productosTotal.innerText = totalProductos;
        precioTotal.innerText = "$" + costoTotal.toFixed(2);

        // Guardar los datos en localStorage
        localStorage.setItem("contador", contador);
        localStorage.setItem("totalProductos", totalProductos);
        localStorage.setItem("costoTotal", costoTotal);

        // Reiniciar los valores y dejar focus en nombre
        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();

    } // => FIN isValid

}) // => FIN addEventListener de btnAgregar


btnClear.addEventListener("click", function(event){
    // Limpiar el valor de los campos
    txtName.value = "";
    txtNumber.value = "";
    // Limpiar el localStorage (clear limpia todo, removeItem solo elementos especificados)
    localStorage.clear();
    // Limpiar la tabla
    cuerpoTabla.innerHTML = "";

    // Reiniciar las variables contador, costoTotal y totalProductos
    contador = 0;
    costoTotal = 0;
    totalProductos = 0;
    // Asignar las variables a los divs
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalProductos;
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    // Ocultar la alerta
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    // Quitar los bordes
    txtName.style.border = ""
    txtNumber.style.border = ""
    // Poner el focus en txtName
    txtName.focus();
}) // => FIN addEventListener de btnClear


//* Evento para quitar espacios después de validar
// blur es cuando un campo pierde el foco, se sale del campo
txtName.addEventListener("blur", function(event){
    txtName.value = txtName.value.trim();
}) // => FIN addEventListener blur de txtName

txtNumber.addEventListener("blur", function(event){
    txtNumber.value = txtNumber.value.trim();
}) // => FIN addEventListener blur de txtNumber


// Acción a realizar al cargar la ventana, espera a que cargue tdo el contenido
window.addEventListener("load", function(){
    if (this.localStorage.getItem("contador") != null){
        contador = Number(this.localStorage.getItem("contador"));
    } // => FIN !null contador
    if (this.localStorage.getItem("totalProductos") != null){
        totalProductos = Number(this.localStorage.getItem("totalProductos"));
    } // => FIN !null totalProductos
    if (this.localStorage.getItem("costoTotal") != null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    } // => FIN !null costoTotal
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalProductos;
    precioTotal.innerText = "$" + costoTotal.toFixed(2);
    if (this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    } // => FIN !null datos
    datos.forEach(r => {
        let row = `<tr>
                        <td>${r.contador}</td>
                        <td>${r.nombre}</td>
                        <td>${r.cantidad}</td>
                        <td>${r.precio}</td>
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    })

}) // => FIN window load