# ActivitySheetFillerBack

Aplicación backend en Node.js para rellenar la hoja de actividad semanal de prácticas y generar un documento Word descargable.

## Generacion de la hoja de actividad con docx-templates

Este proyecto usa la libreria `docx-templates` para transformar una plantilla `wordTemplate.docx` en un archivo final con los datos semanales de cada alumno.


### 1. Donde se genera el documento

La generacion se divide en dos partes:

1. Preparacion de datos en `src/services/weeklyLogs.service.js` (`downloadWord`).
2. Render de plantilla en `src/utils/createWord.js` (`createWordDocument`).

`createWordDocument` hace lo siguiente:

1. Carga `wordTemplate.docx` desde la raiz del proyecto.
2. Valida que el archivo exista.
3. Llama a `createReport({ template, data })`.
4. Devuelve un `Buffer` con el `.docx` final.

### 2. Estructura de datos que recibe la plantilla

La plantilla se rellena con este objeto:

```js
{
	name: "Nombre",
	lastname: "Apellido",
	internship_period: "01/09/2026 - 05/09/2026",
	daily_logs: [
		{ date: "01/09/2026", tasks: "Tareas del lunes" },
		{ date: "02/09/2026", tasks: "Tareas del martes" }
	]
}
```

### 3. Como escribir la plantilla wordTemplate.docx

Dentro del `.docx`, puedes usar comandos de `docx-templates` para insertar variables y recorrer listas.

Consultar la documentación para mas detalle. 



Notas importantes:

1. Respeta exactamente los nombres de propiedades (`name`, `lastname`, `internship_period`, `daily_logs`).
2. En los bucles, usa el mismo alias al cerrar (`log` en `END-FOR log`).
3. Guarda la plantilla como `wordTemplate.docx` en la raiz del backend.

### 4. Endpoint de descarga en este proyecto

Ruta protegida por token:

```http
GET /weekly-logs/:id/download-word
```

El controlador configura cabeceras para descarga:

1. `Content-Disposition: attachment; filename=hoja_actividad.docx`
2. `Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document`

Despues responde con el `Buffer` generado por `docx-templates`.

### 5. Flujo completo de ejemplo

1. El frontend guarda/actualiza `daily_logs` de una semana.
2. El cliente llama `GET /weekly-logs/:id/download-word` con JWT.
3. El servicio obtiene semana, practicas y alumno desde MongoDB.
4. Se construye `wordData` con fechas formateadas y tareas.
5. `createWordDocument` renderiza la plantilla y devuelve el `.docx`.
6. El navegador descarga `hoja_actividad.docx`.



