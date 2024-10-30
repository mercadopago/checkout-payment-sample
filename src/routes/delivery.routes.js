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
    const codigoPostalInput = document.getElementById("codigoPostal").value;

    try {
        validarCodigoPostal(codigoPostalInput);
        const costoEnvio = calcularCostoEnvio(codigoPostalInput);
        
        if (typeof costoEnvio === "string") {
            alert(costoEnvio); // Mensaje si el código no está en la lista
        } else {
            alert(`El costo de envío para el código postal ${codigoPostalInput} es: $${costoEnvio}`);
        }
    } catch (error) {
        alert(error.message); // Muestra el error de validación
    }
}

// Ejemplo de botón en el HTML
// <input type="text" id="codigoPostal" placeholder="Ingresa tu código postal">
// <button onclick="procesarEnvio()">Calcular Envío</button>