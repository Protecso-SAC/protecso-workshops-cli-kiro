# Base de conocimiento del equipo

Un prototipo de memoria compartida: lo que cada persona aprende trabajando con Kiro se
propone, se revisa y se publica en archivos versionados que todo el equipo comparte.

Es una práctica opcional del Nivel 3 de la capacitación. La guía la explica en
<https://workshop.protecso.io/kiro/nivel-3/04b-base-de-conocimiento/>.

## Ciclo

```text
conversación → #capturar-leccion → borrador → PR → revisión semanal → lección vigente
                                                          │
                                                          └→ steering o ADR, si la regla es de uso diario
```

1. **Capturar.** Al terminar una tarea, la persona escribe `#capturar-leccion` en el chat.
   Kiro redacta un borrador en `borradores/` o dice que no hay nada que valga la pena.
2. **Proponer.** La persona revisa el borrador, lo corrige y abre un PR.
3. **Curar.** En una revisión semanal corta, el equipo decide: promover, dejar como lección
   o descartar.
4. **Usar.** Las lecciones vigentes se consultan con `#file` o `#folder`. Las reglas de uso
   diario se promueven a `.kiro/steering/`.
5. **Podar.** Cada entrada tiene `revisar_en`. Si ya no es cierta, pasa a `obsoleta`.

## Estructura

| Carpeta o archivo | Para qué |
| ----------------- | -------- |
| `_plantilla.md` | Formato de una entrada |
| `borradores/` | Propuestas sin revisar |
| `lecciones/` | Entradas revisadas y vigentes |

El steering de captura está en `.kiro/steering/capturar-leccion.md` y es `manual`: no afecta a
los ejercicios, porque solo se carga cuando se invoca con `#capturar-leccion`.

## Cuándo promover una lección

Una lección merece pasar de borrador a vigente si cumple las tres condiciones:

- afecta a más de una persona,
- se repitió o fue costosa de descubrir,
- se puede verificar.

Si además es una regla que Kiro debe aplicar en cada tarea, se promueve a un archivo de
`.kiro/steering/` con el modo de inclusión que corresponda.

## Seguridad

- Nunca se guardan conversaciones crudas, credenciales, datos personales ni información de clientes.
- Todo pasa por un PR: ninguna entrada se publica sin que otra persona la lea.
- Ante la duda, se descarta.

## Qué no cubre este prototipo

- No busca por significado: la consulta es por archivo o carpeta. Si la base crece, se puede
  agregar un servidor MCP de búsqueda.
- No mide si una entrada se usa. Conviene definir esa medida antes de empezar un piloto real.
- No se probó con un equipo. Es un punto de partida para ajustar.
