import { obtenerDatos } from './modulos/usuarios.mjs';
import { escribirJson, leerJson } from './modulos/archivos.mjs';

try {
    const usuariosFormateados = await obtenerDatos();

    await escribirJson(usuariosFormateados);

    const usuariosLeidos = await leerJson();

    console.log('Usuarios leídos desde el archivo:');
    console.log(usuariosLeidos);

} catch (error) {
    console.error('Error al procesar los usuarios:', error.message);
}