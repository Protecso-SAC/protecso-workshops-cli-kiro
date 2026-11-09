# Backlog de requerimientos

Requerimientos para los ejercicios de la capacitación. Todos usan datos sintéticos.
El estado inicial del repositorio **no** los implementa.

## Ejercicio 2 · Nivel 1 (cambio pequeño)

**Validar el ISBN al agregar un libro.** `addBook` hoy acepta cualquier texto como ISBN.
Debe rechazar los que no tengan exactamente 13 dígitos, con el error `ISBN inválido`.

## Ejercicio 3 · Nivel 2 (steering)

**Buscar libros por texto.** Una función `searchBooks(db, texto)` que devuelva los libros
cuyo título o autor contienen el texto, sin distinguir mayúsculas.

Sirve para ver cómo Kiro ignora las convenciones del equipo hasta que se escriben en un
archivo de steering (mensajes en español, comentarios JSDoc en español, una prueba por
comportamiento).

## Ejercicio 4 · Nivel 2 (spec)

**Renovar un préstamo.** Un socio puede renovar un préstamo activo una sola vez, y la
renovación extiende el vencimiento 7 días más. No se puede renovar un préstamo ya
devuelto ni uno ya renovado.

Pensado para convertirlo en requisitos, diseño y tareas.

## Ejercicio 5 · Nivel 2 (revisión)

El material está en `ejercicios/05-revision/cambio-generado.patch`: una implementación de
`renewLoan` que pasa las pruebas pero no cumple el requerimiento anterior. Se aplica con
`git apply` y se revisa como si lo hubiera generado un agente.

## Ejercicio 7 · Nivel 3 (MCP y límites)

**Consultar libros y préstamos desde el chat.** El servidor de `mcp/server.js` expone
`buscar_libro` y `prestamos_activos`. Los datos son sintéticos y el servidor no usa red.

## Ejercicio 8 · Nivel 3 (delegar)

**Más pruebas para los préstamos.** Cubrir `activeLoans` y los bordes de `lendBook` solo
con archivos de `test/`, sin tocar `src/`.

## Ejercicio 9 · Integrador

**Multa por devolución tardía.** Al devolver un libro después de su vencimiento, se
calcula una multa por cada día de atraso. La tarifa diaria debe ser configurable y la
CLI debe mostrar el monto al registrar la devolución.

Nota: hoy el repositorio **no calcula multas**. El ejercicio 1 usa esa ausencia para
comprobar que el participante detecta cuándo Kiro supone en vez de leer el código.
