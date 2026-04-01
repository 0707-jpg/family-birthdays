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

            const tarjeta = document.createElement('div');
            // Añadimos 'relative' y 'z-10' para que el botón no quede debajo del cristal
            tarjeta.className = 'card p-8 rounded-3xl transform transition hover:scale-105 flex flex-col items-center text-center relative z-10';

            const urlWA = `https://wa.me/?text=${encodeURIComponent('¡Feliz cumple ' + persona.nombre + '!')}`;

            tarjeta.innerHTML = `
                <div class="mb-4">
                    <img src="${persona.foto}" 
                         class="foto-perfil mx-auto" 
                         style="border-color: ${persona.color}"
                         onerror="this.src='https://ui-avatars.com/api/?name=${persona.nombre}'">
                    <h2 class="text-3xl font-black mt-3 text-white">${persona.nombre}</h2>
                </div>
                
                <p class="text-gray-400 text-sm italic mb-6">"${persona.frase}"</p>
                
                <div class="flex flex-col items-center justify-center bg-white/10 w-full py-6 rounded-2xl mb-6">
                    <span class="text-7xl font-black ${esHoy ? 'text-yellow-400 animate-bounce' : 'text-white'}">
                        ${esHoy ? '¡HOY!' : diff}
                    </span>
                    <span class="text-gray-500 font-bold text-sm uppercase mt-1">
                        ${esHoy ? 'ES EL DÍA' : 'días faltantes'}
                    </span>
                </div>

                <a href="${urlWA}" target="_blank" 
                   class="block w-full py-4 rounded-xl font-bold text-white uppercase text-center"
                   style="background-color: ${persona.color} !important; display: block !important; min-height: 50px !important; visibility: visible !important; opacity: 1 !important;">
                   ENVIAR SALUDO 📱
                </a>
            `;
            contenedor.appendChild(tarjeta);
        });
    } catch (e) { console.error("Error crítico:", e); }
}
window.onload = cargarCumples;