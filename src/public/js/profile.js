document.querySelector("#singout").addEventListener("click", () => {
    window.localStorage.removeItem("token");
    window.location.href = '/';
})

document.addEventListener("DOMContentLoaded", async () => {
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const addressElement = document.getElementById('address');

    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/';
        return;
    }

    try {
        const response = await fetch('/auth/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }); // Ruta que devuelve los datos del usuario
        const userData = await response.json();

        if (response.ok) {
            // Asignar los datos del usuario a los elementos HTML
            nameElement.textContent = userData.name || "No disponible";
            emailElement.textContent = userData.email || "No disponible";
            phoneElement.textContent = userData.phone || "No disponible";
            addressElement.textContent = userData.address || "No disponible";
        } else {
            console.error("Error al obtener los datos del usuario:", userData.message);
            alert("Error al cargar los datos del perfil.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Hubo un problema al cargar los datos del perfil.");
    }
});
