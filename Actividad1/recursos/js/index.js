async function obtenerDatos() {
  // Obtiene el contenedor donde se mostrarán los productos.
  const contenedor = document.getElementById('contenedor');

  try {
    // Realiza una petición para obtener el archivo JSON.
    const respuesta = await fetch('recursos/datos/productos.json');

    // Verifica si la respuesta fue satisfactoria.
    if (respuesta.ok) {
      const productos = await respuesta.json();

      contenedor.innerHTML = '';

      // Recorre los productos y los muestra en el contenedor.
      productos.forEach(producto => {
        contenedor.innerHTML += `
          <article class="producto">
            <h3 class="nombre">${producto.nombre}</h3>
            <p class="precio" value="${producto.precio}">Precio: $${producto.precio}</p>
            <p class="stock" value="${producto.stock}">Stock: ${producto.stock}</p>
          </article>
        `;
      });

      // Muestra un mensaje de carga exitosa.
      contenedor.innerHTML += '<p class="mensajeExito">¡Productos cargados con éxito!</p>';

    } else {
      // Muestra un mensaje si ocurre un error.
      contenedor.innerHTML = '<p class="mensaje error">Ocurrió un error al cargar los productos.</p>';
    }

  } catch (error) {
    // Captura errores durante la petición.
    console.log(error);

    // Muestra un mensaje de error de conexión.
    contenedor.innerHTML = '<p class="mensaje error">Ocurrió un error de conexión.</p>';
  }
}

// Ejecuta la función.
obtenerDatos();