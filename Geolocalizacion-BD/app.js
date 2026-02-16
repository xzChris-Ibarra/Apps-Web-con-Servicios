const outGeo = document.getElementById("out-geo");
const outUsers = document.getElementById("out-users");

//iniciar la cadena de servicios
navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    
    try {
        //SERVICIO 1: Nominatim (Obtener Ciudad)
        const resGeo = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const dataGeo = await resGeo.json();
        const ciudad = dataGeo.address.city || dataGeo.address.town || "Desconocida";

        outGeo.innerHTML = `<strong>Coordenadas:</strong> ${latitude}, ${longitude}<br>
                            <strong>Ciudad Detectada:</strong> ${ciudad}`;

        //SERVICIO 2: JSONPlaceholder (Obtener Usuarios)
        const resUsers = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await resUsers.json();

        //CRITERIO: Filtrado por coincidencia de inicial
        outUsers.innerHTML = ""; // Limpiar
        const inicialCiudad = ciudad.charAt(0).toUpperCase();

        users.forEach(user => {
            const inicialUser = user.name.charAt(0).toUpperCase();
            const esCercano = inicialCiudad === inicialUser;

            const div = document.createElement("div");
            div.className = `user-card ${esCercano ? 'cercano' : 'remoto'}`;
            div.innerHTML = `
                <strong>${user.name}</strong> (${user.email}) <br>
                <span class="badge ${esCercano ? 'bg-success' : 'bg-primary'}">
                    ${esCercano ? 'Técnico en tu Zona' : 'Soporte Remoto'}
                </span>
            `;
            outUsers.appendChild(div);
        });

    } catch (err) {
        outUsers.textContent = "Error al conectar con los servicios.";
    }
}, (err) => {
    outGeo.textContent = "Acceso a GPS denegado.";
});