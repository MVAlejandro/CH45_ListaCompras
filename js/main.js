
// Insertar el id de los elementos de html
const btnAgregar = document.getElementById("btnAgregar");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");


// Función para validar la cantidad
function validarCantidad(){
    // Validar que no esté vacío el campo
    if (txtNumber.value.length == 0){
        return false;
    } // => FIN length == 0

    // Validar que es un número
    if (isNaN(txtNumber.value)){
        return false;
    } // => FIN isNaN

    if (Number(txtNumber.value) <= 0){
        return false;
    } // => FIN value <=0

    return true;
} // => FIN validarCantidad


// Ponerle el listener al botón con una función
btnAgregar.addEventListener("click", function (event){
    // Evitar que el botón realice su acción por defecto
    event.preventDefault();
        // Acciones a realizar al tocar el botón
        txtName.style.border = ""
        txtNumber.style.border = ""
        alertValidacionesTexto.innerHTML = "";
        alertValidaciones.style.display = "none";


// Validación de los campos introducidos
    // Validación del nombre de producto (longitud mayor a 3 caracteres)
    if(txtName.value.length < 3){
        txtName.style.border = "solid red medium"
        alertValidacionesTexto.innerHTML = "El <strong>Nombre</strong> no es correcto.</br>";
        alertValidaciones.style.display = "block";
        // return false;
    } // => FIN length < 3

    // Validación de la cantidad
    // += en texto sirve para concatenar
    if(! validarCantidad()){
        txtNumber.style.border = "solid red medium"
        alertValidacionesTexto.innerHTML += "La <strong>Cantidad</strong> no es correcta.</br>";
        alertValidaciones.style.display = "block";
    } // => FIN ! validarCantidad (not validarCantidad)

}) // => FIN addEventListener de btnAgregar


// Evento para quitar espacios después de validar
// blur es cuando un campo pierde el foco, se sale del campo
txtName.addEventListener("blur", function(event){
    txtName.value = txtName.value.trim();
}) // => FIN addEventListener blur de txtName

txtNumber.addEventListener("blur", function(event){
    txtNumber.value = txtNumber.value.trim();
}) // => FIN addEventListener blur de txtNumber