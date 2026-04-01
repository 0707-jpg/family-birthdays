async function cargarCumples() {
    try {
        const respuesta = await fetch('data.json?v=' + Date.now());
        const datos = await respuesta.json();
        const contenedor = document.getElementById('cumple-container');
        
        if (!contenedor) return;
        contenedor.innerHTML = '';

        const hoy = new Date();

        datos.forEach(persona => {
            const [mes, dia] = persona.fecha.split('-');
            let proximo = new Date(hoy.getFullYear(), mes - 1, dia);
            
            if (proximo < hoy && hoy.toDateString() !== proximo.toDateString()) {
                proximo.setFullYear(hoy.getFullYear() + 1);
            }

            const diff = Math.ceil((proximo - hoy) / (1000 * 60 * 60 * 24));
            const esHoy = diff === 0;

            // Validar color (añadir # si falta)
            let colorHex = persona.color;
            if (!colorHex.startsWith('#')) {
                colorHex = '#' + colorHex;
            }

            const tarjeta = document.createElement('div');
            tarjeta.className = 'card p-8 rounded-3xl flex flex-col items-center text-center relative mb-4';

            // Construir contenido
            tarjeta.innerHTML = `
                <div class="mb-4">
                    <img src="${persona.foto}" 
                         class="foto-perfil mx-auto" 
                         style="border: 5px solid ${colorHex}; width: 180px; height: 180px; border-radius: 50%; object-fit: cover;"
                         onerror="this.src='https://ui-avatars.com/api/?name=${persona.nombre}'">
                    <h2 class="text-3xl font-black mt-3 text-white">${persona.nombre}</h2>
                </div>
                <p class="text-gray-400 text-sm italic mb-6">"${persona.frase || '¡Felicidades!'}"</p>
                <div class="flex flex-col items-center justify-center bg-white/10 w-full py-6 rounded-2xl mb-6">
                    <span class="text-7xl font-black ${esHoy ? 'text-yellow-400 animate-bounce' : 'text-white'}" style="font-size: 4rem;">
                        ${esHoy ? '¡HOY!' : diff}
                    </span>
                    <p class="text-gray-400 font-bold text-xs uppercase mt-1">Días faltantes</p>
                </div>
            `;

            // Crear Botón Robusto
            const btn = document.createElement('a');
            btn.href = `https://wa.me/?text=${encodeURIComponent('¡Feliz cumple ' + persona.nombre + '! ✨')}`;
            btn.target = "_blank";
            btn.innerText = "ENVIAR SALUDO 📱";
            
            // Estilos de emergencia para que se vea SÍ O SÍ
            Object.assign(btn.style, {
                display: "block",
                width: "100%",
                padding: "15px",
                backgroundColor: colorHex,
                color: "white",
                borderRadius: "15px",
                fontWeight: "bold",
                textDecoration: "none",
                marginTop: "10px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                border: colorHex === "#000000" ? "1px solid white" : "none" // Si es negro, le pone borde blanco
            });

            tarjeta.appendChild(btn);
            contenedor.appendChild(tarjeta);
        });

    } catch (e) {
        console.error("Error en la carga:", e);
    }
}

document.addEventListener('DOMContentLoaded', cargarCumples);