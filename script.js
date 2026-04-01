async function cargarCumples() {
    try {
        const respuesta = await fetch('data.json?v=' + Date.now());
        const datos = await respuesta.json();
        const contenedor = document.getElementById('cumple-container');
        
        if (!contenedor) return;
        contenedor.innerHTML = '';
        const hoy = new Date();

        datos.forEach(persona => {
            // Arreglo de color y fechas
            let colorHex = persona.color.startsWith('#') ? persona.color : '#' + persona.color;
            if (colorHex === "#000000") colorHex = "#444444";

            const [mes, dia] = persona.fecha.split('-');
            let proximo = new Date(hoy.getFullYear(), parseInt(mes) - 1, parseInt(dia));
            if (proximo < hoy && hoy.toDateString() !== proximo.toDateString()) {
                proximo.setFullYear(hoy.getFullYear() + 1);
            }
            const diff = Math.ceil((proximo - hoy) / (1000 * 60 * 60 * 24));
            const esHoy = diff === 0;

            // --- NUEVA LÓGICA DE ALERTA ---
            let textoAlerta = "";
            if (esHoy) {
                textoAlerta = `🚨 ¡ALERTA DE CUMPLEAÑOS! 🚨\n\nHoy es el cumpleaños de *${persona.nombre}*. ¡No olvides saludar! 🎂🎈`;
            } else if (diff <= 7) {
                textoAlerta = `⚠️ ¡AVISO DE PROXIMIDAD! ⚠️\n\nEl cumpleaños de *${persona.nombre}* es en solo *${diff} días* (${persona.fecha}). ¡Vayan preparando la sorpresa! 🎁✨`;
            } else {
                textoAlerta = `Pre-alerta: Falta poco para el cumple de ${persona.nombre}. Es el ${persona.fecha}.`;
            }

            const urlWA = `https://wa.me/?text=${encodeURIComponent(textoAlerta)}`;

            const tarjeta = document.createElement('div');
            tarjeta.className = 'card p-8 rounded-3xl flex flex-col items-center text-center mb-4 shadow-2xl bg-white/5 backdrop-blur-md border border-white/10';
            
            tarjeta.innerHTML = `
                <div class="mb-4">
                    <img src="${persona.foto}" 
                         class="mx-auto" 
                         style="border: 5px solid ${colorHex}; width: 180px; height: 180px; border-radius: 50%; object-fit: cover;"
                         onerror="this.src='https://ui-avatars.com/api/?name=${persona.nombre}'">
                    <h2 class="text-3xl font-black mt-3 text-white">${persona.nombre}</h2>
                </div>
                
                <div class="flex flex-col items-center justify-center bg-white/10 w-full py-6 rounded-2xl mb-8">
                    <span class="text-7xl font-black ${esHoy ? 'text-yellow-400 animate-bounce' : 'text-white'}" style="font-size: 4rem;">
                        ${esHoy ? '¡HOY!' : diff}
                    </span>
                    <span class="text-gray-400 font-bold text-xs uppercase mt-1">Días para el evento</span>
                </div>

                <a href="${urlWA}" target="_blank" 
                   style="background-color: ${colorHex}; display: block; width: 100%; padding: 15px; border-radius: 15px; color: white; font-weight: bold; text-decoration: none; text-align: center;">
                   📢 ENVIAR ALERTA
                </a>
            `;
            contenedor.appendChild(tarjeta);
        });
    } catch (e) { console.error(e); }
}
document.addEventListener('DOMContentLoaded', cargarCumples);