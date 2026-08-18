async function obtenerDatos() {
  // Obtiene el contenedor donde se mostrarán los productos.
  const contenedor = document.getElementById('contenedor');

  try {
    // Realiza una petición asíncrona para obtener el archivo JSON.
    const respuesta = await fetch('recursos/datos/productos.json');

    // La propiedad "ok" del objeto Response indica
    // si la respuesta fue satisfactoria.
    if (respuesta.ok) {

      // Convierte el contenido de la respuesta a un objeto JavaScript.
      const productos = await respuesta.json();

      // Limpia el contenido anterior del contenedor.
      contenedor.innerHTML = '';

      // Recorre los productos y genera una tarjeta para cada uno.
      productos.forEach(producto => {
        contenedor.innerHTML += `
          <article class="producto">
            <h3 class="nombre">${producto.nombre}</h3>
            <data class="precio">Precio: $${producto.precio}</data>
            <data class="stock">Stock: ${producto.stock}</data>
          </article>
        `;
      });

      // Muestra un mensaje indicando que los productos fueron cargados correctamente.
      contenedor.innerHTML += `
        <p class="mensajeExito">¡Productos cargados con éxito!</p>
      `;

    } else {
      // Se muestra un mensaje si la respuesta del servidor no fue satisfactoria.
      contenedor.innerHTML = `
        <p class="mensaje error">
          Ocurrió un error al cargar los productos.
        </p>
      `;
    }

  } catch (error) {
    // Captura errores de conexión o problemas al realizar la petición.
    console.log(error);

    // Informa al usuario que no fue posible obtener los datos.
    contenedor.innerHTML = `
      <p class="mensaje error">
        Ocurrió un error de conexión.
      </p>
    `;
  }
}

// Ejecuta la función para comenzar a cargar los productos.
obtenerDatos();