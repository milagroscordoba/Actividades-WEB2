# Uso de IA para aclarar conceptos

## Tema elegido

Módulos en JavaScript.

## Prompt

Soy una estudiante de nivel terciario de Analista de Sistemas y estoy realizando una actividad de Aplicaciones Web 2 con JavaScript y Node.js. Quiero entender qué es un módulo, para qué sirve y cómo se utilizan `import` y `export`. Actuá como un profesor y explicámelo de manera clara, breve y paso a paso. Incluí un ejemplo sencillo de una aplicación separada en módulos: uno para consultar una API y otro para leer y escribir archivos JSON. Explicá cómo se conectan desde `index.mjs` y qué ventaja tiene esta organización.

## Respuesta de la IA

Un **módulo en JavaScript es un archivo que agrupa código relacionado**, como funciones para consultar una API o trabajar con archivos. Permite dividir una aplicación en partes más fáciles de entender y mantener.

En esta actividad usamos archivos `.mjs`, que Node.js reconoce como módulos ECMAScript.

### 1. ¿Cómo funcionan export e import?

- `export` permite que una función o variable esté disponible para otros archivos.
- `import` permite utilizar lo que otro módulo exportó.

Las funciones y variables de un módulo no quedan disponibles automáticamente en los demás: debemos exportarlas e importarlas.

### 2. Módulo para consultar la API: modulos/usuarios.mjs

```javascript
export async function obtenerDatos() {
    const respuesta = await fetch('https://api.escuelajs.co/api/v1/users');

    if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    return await respuesta.json();
}
```

La función consulta la API y devuelve los usuarios. Al tener `export`, podemos importarla desde el archivo principal.

También podríamos escribir `export { obtenerDatos };` por separado, como hicimos en la actividad.

### 3. Módulo para escribir y leer JSON: modulos/archivos.mjs

```javascript
import fsp from 'node:fs/promises';
import path from 'node:path';

const ruta = path.join(process.cwd(), 'usuarios.json');

export async function escribirJson(datos) {
    const texto = JSON.stringify(datos, null, 2);
    await fsp.writeFile(ruta, texto, 'utf-8');
}

export async function leerJson() {
    const texto = await fsp.readFile(ruta, 'utf-8');
    return JSON.parse(texto);
}
```

Este módulo utiliza dos módulos incluidos en Node.js:

- `fs/promises` para escribir y leer archivos.
- `path` para construir la ruta.

`JSON.stringify()` convierte los datos en texto JSON para guardarlos. `JSON.parse()` convierte el texto leído nuevamente en datos de JavaScript.

### 4. Archivo principal: index.mjs

```javascript
import { obtenerDatos } from './modulos/usuarios.mjs';
import { escribirJson, leerJson } from './modulos/archivos.mjs';

try {
    const usuarios = await obtenerDatos();

    await escribirJson(usuarios);

    const usuariosLeidos = await leerJson();

    console.log(usuariosLeidos);
} catch (error) {
    console.error('Ocurrió un error:', error.message);
}
```

`index.mjs` coordina el proceso: llama a la función que obtiene los usuarios, luego a la que los guarda y finalmente a la que los lee. `await` permite esperar cada operación antes de continuar.

Este ejemplo guarda todos los campos de la API. En la actividad, además, usamos `.map()` dentro de `obtenerDatos()` para conservar únicamente `id`, `email` y `name`.

### 5. ¿Qué ventaja tiene separar el código?

Cada archivo tiene una responsabilidad clara. Si cambiamos la API, modificamos `usuarios.mjs`; si cambiamos cómo guardamos los archivos, modificamos `archivos.mjs`.

Además, esta organización permite reutilizar las funciones y encontrar errores con mayor facilidad.