---
inclusion: manual
---

# Capturar una lección

Este archivo solo se carga cuando la persona escribe `#capturar-leccion` en el chat,
normalmente al terminar una tarea. Su objetivo es proponer una entrada para la base de
conocimiento del equipo. **No publica nada**: deja un borrador que alguien revisa.

## Qué hacer

1. Revisa lo que ocurrió en esta conversación y decide si hay una lección que valga la pena.
   Vale la pena si cumple las tres condiciones:
   - afecta a más de una persona del equipo,
   - se repitió o fue costosa de descubrir,
   - se puede verificar (hay un comando, una prueba o un archivo que lo confirma).
2. Si no cumple, dilo en una frase y **no escribas nada**. Una base con pocas entradas buenas
   sirve más que una con muchas dudosas.
3. Si cumple, crea `docs/conocimiento/borradores/AAAA-MM-DD-tema.md` usando esta plantilla:

#[[file:docs/conocimiento/_plantilla.md]]

4. Escribe en español, de forma concreta y breve. Describe la lección, no copies la conversación.
5. Deja `estado: borrador`. No modifiques `.kiro/steering/`, las entradas de
   `docs/conocimiento/lecciones/` ni ningún archivo fuera de `docs/conocimiento/borradores/`.

## Qué nunca incluir

- Credenciales, claves, tokens ni cadenas de conexión.
- Datos personales ni información de clientes.
- Fragmentos de la conversación que no hagan falta para entender la lección.

Si la lección depende de uno de esos datos, generalízala. Si no se puede generalizar, descártala.

## Al terminar

Resume en dos o tres líneas qué escribiste y recuerda a la persona que debe revisar el borrador
y abrir un PR para que el equipo lo evalúe.
