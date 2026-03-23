async function cargarCumples() {
    try {
        // Añadimos un timestamp para evitar el caché
        const respuesta = await fetch('data.json?v=' + Date.now());
        const datos = await respuesta.json();
        const contenedor = document.getElementById('contenedor-cumples');

        contenedor.innerHTML = ''; // Limpiar antes de cargar

        datos.forEach(persona => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'card';
            
            tarjeta.innerHTML = `
                <img src="${persona.foto}" 
                     alt="${persona.nombre}" 
                     class="foto-perfil" 
                     style="border-color: ${persona.color}">
                <h3>${persona.nombre}</h3>
                <p>${persona.parentesco}</p>
                <span class="fecha">🎂 ${persona.fecha}</span>
                <small>Interés: ${persona.interes}</small>
            `;
            contenedor.appendChild(tarjeta);
        });
    } catch (error) {
        console.error("Error cargando los datos:", error);
    }
}

// Ejecutar al cargar la página
window.onload = cargarCumples;