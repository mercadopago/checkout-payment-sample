// Función para calcular el costo de envío basado en el código postal
function calcularCostoEnvio(codigoPostal) {
    const costosEnvio = {
           "5521": 1200,
           "5501": 1300,
           "5500": 1400,
           "5539": 1550,
           "5507": 1700,
           "5600": 0,
           "5613": 0,
           "5620": 0,
           "5515": 1000,
    };

    // Si el código postal está en la lista, devuelve el costo, si no, da un costo estándar
    return costosEnvio[codigoPostal] || "Código postal no encontrado";
}

// Función para validar el código postal
function validarCodigoPostal(codigoPostal) {
    if (!/^\d{4}$/.test(codigoPostal)) { // RegEx para verificar que sean exactamente 4 dígitos
        throw new Error("El código postal debe tener exactamente 4 dígitos numéricos.");
    }
}

// Función principal que usa el sistema de envío
function procesarEnvio() {
    //Se obtiene el valor del input de codigo postal
    const codigoPostalInput = document.getElementById("codigoPostal").value;
    // Referencias a los elementos donde se mostraran los mensajes de costo y error
    const errorMensaje = document.getElementById("errorMensaje");
    const costoEnvioElemento = document.getElementById("costoEnvio");

    // Se oculta el mensaje de error y limpiar el mensaje de costo en cada nuevo intento
    errorMensaje.style.display = "none";
    costoEnvioElemento.textContent = "";

    try {
        // Llama a la funcion de validacion del codigo postal
        validarCodigoPostal(codigoPostalInput);
        // Si es valido se obtiene el costo para el codigo ingresado
        const costo = calcularCostoEnvio(codigoPostalInput);
        

        if (typeof costo === "string") {
            //Si el codigo No esta en la lista se muestra el mensaje de error.
            errorMensaje.textContent = costo;
            errorMensaje.style.display = "block";
        } else {
            // Si el codigo es valido y esta en la lista, muestra el costo en "costoEnvio"
            costoEnvioElemento.textContent = `Costo de envio: $${costo}`;
        }
    } catch (error) {
        // Si la validacion falla, muestra el mensaje de error.
        errorMensaje.textContent = error.message;
        errorMensaje.style.display = "block";
    }
}