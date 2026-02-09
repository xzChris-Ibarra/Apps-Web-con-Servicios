const btnCargar = document.getElementById("btnCargar");
const container = document.getElementById("usuarios-container");

//función asíncrona para consumir la API ya que puede tomar tiempo el llamarle
async function fetchUsers() {
    //limpiar el contenedor y mostrar mensaje de espera
    container.innerHTML = "<p>Conectando con el servicio de base de datos...</p>";

    try {
        //realizar la petición GET al endpoint /users
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        //verificar si la respuesta fue exitosa (Status 200-299)
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        //convertir la respuesta de texto plano a un Objeto JSON
        const users = await response.json();

        //limpiar el mensaje de carga
        container.innerHTML = "";

        //Procesar la informacion
        users.forEach(user => {
            //crear un elemento div para cada usuario
            const userDiv = document.createElement("div");
            userDiv.className = "user-card";

            //inyectar el contenido (Nombre, Correo y Ciudad)
            //la ciudad está anidada en user.address.city
            userDiv.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Correo:</strong> ${user.email}</p>
                <p><strong>Ciudad:</strong> ${user.address.city}</p>
            `;

            //agregar el div al contenedor principal
            container.appendChild(userDiv);
        });

    } catch (error) {
        //si algo falla, mostrar el error en pantalla
        container.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error("Hubo un fallo en la comunicación:", error);
    }
}

//evento del botón para iniciar la descarga
btnCargar.addEventListener("click", fetchUsers);