// Exporto la función para usarla desde index.mjs
export { obtenerDatos };

// Obtengo los usuarios y conservo los campos solicitados
async function obtenerDatos() {
    const respuesta = await fetch('https://api.escuelajs.co/api/v1/users');

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    const usuariosFormateados = datos.map((usuario) => {
        const usuarioCambiado = {
            id: usuario.id,
            email: usuario.email,
            name: usuario.name
        };

        return usuarioCambiado;
    });

    return usuariosFormateados;
}