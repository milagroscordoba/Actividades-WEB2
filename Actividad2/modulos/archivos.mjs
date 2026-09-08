import fsp from 'node:fs/promises';
import path from 'node:path';

// Exporto las funciones
export { escribirJson, leerJson };

// Construyo la ruta del archivo
const ruta = path.join(process.cwd(), 'usuarios.json');

// Escribo los usuarios en el archivo
async function escribirJson(usuariosFormateados) {
    const datosEnTexto = JSON.stringify(usuariosFormateados, null, 2);

    await fsp.writeFile(ruta, datosEnTexto, 'utf-8');
}

// Leo los usuarios desde el archivo
async function leerJson() {
    const contenido = await fsp.readFile(ruta, 'utf-8');

    return JSON.parse(contenido);
}