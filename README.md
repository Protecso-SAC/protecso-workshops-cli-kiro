# protecso-workshops-cli-kiro

Repositorio de práctica de la **capacitación de Kiro** de los
[Workshops Protecso](https://workshop.protecso.io/). Es una CLI pequeña de préstamos de
biblioteca, con pruebas y **datos sintéticos** (nombres, libros e ISBN inventados),
pensada para equivocarse sin consecuencias. Es público: no contiene datos de clientes.

Los ejercicios están en la guía publicada, no en este repositorio:

- Guía: <https://workshop.protecso.io/kiro/00-mapa/>
- Nivel 1 · Ejercicio 1, chat y contexto:
  <https://workshop.protecso.io/kiro/nivel-1/03-chat-y-contexto/>
- Nivel 1 · Ejercicio 2, cambio pequeño con verificación:
  <https://workshop.protecso.io/kiro/nivel-1/04-cambio-pequeno/>

## Requisitos

Solo `git` y `docker`. Node corre dentro del contenedor, así que no hay que instalarlo.
En macOS, si el daemon de Docker no está activo, `make` intenta arrancar Colima.

## Uso

```bash
make help     # lista los comandos
make test     # construye la imagen y corre las pruebas (11 en verde al empezar)
make run ARGS="list"   # ejecuta la CLI
```

## En Windows

Hay dos formas de trabajar, según lo que ya uses:

| Opción | Cuándo | Cómo |
| ------ | ------ | ---- |
| **WSL2 con Docker Desktop** | Ya trabajas con WSL | Abre la terminal de tu distribución y usa `make`, igual que en macOS y Linux. Clona el repositorio dentro del sistema de archivos de WSL, no en `/mnt/c` |
| **PowerShell** | No usas WSL | Usa `tasks.ps1`, el equivalente del `Makefile`. Solo necesitas Git y Docker Desktop |

Equivalencias:

| `make` | PowerShell |
| ------ | ---------- |
| `make help` | `.\tasks.ps1 help` |
| `make docker-up` | `.\tasks.ps1 docker-up` |
| `make build` | `.\tasks.ps1 build` |
| `make test` | `.\tasks.ps1 test` |
| `make run ARGS="list"` | `.\tasks.ps1 run list` |
| `make shell` | `.\tasks.ps1 shell` |

Si PowerShell bloquea la ejecución del script, permite los scripts locales una vez:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

o ejecútalo sin cambiar la política: `powershell -ExecutionPolicy Bypass -File .\tasks.ps1 test`.

`.gitattributes` fuerza saltos de línea LF. Sin eso, Git en Windows puede convertirlos a
CRLF, y entonces `bin/ensure-docker.sh` falla en WSL y `git apply` rechaza el parche del
ejercicio 5.

## Comandos de la CLI

```text
list                                   Lista los libros y sus ejemplares libres
add <isbn> <título> <autor> [copias]   Agrega un libro
lend <isbn> <socio>                    Registra un préstamo
return <isbn> <socio>                  Registra una devolución
```

## Estructura

```text
src/
  index.js     Entrada de la CLI
  books.js     Libros: alta y ejemplares disponibles
  loans.js     Préstamos: reglas de préstamo y devolución
  store.js     Lectura y escritura del archivo JSON
test/          Pruebas (node:test, sin dependencias)
data/          Datos sintéticos (biblioteca.json)
docs/          Backlog de requerimientos para los ejercicios
ejercicios/    Material de apoyo de los ejercicios (ejercicio 5: cambio a revisar)
mcp/           Servidor MCP local y sintético para el ejercicio 7
bin/           Script que verifica Docker (macOS y Linux)
Makefile       Comandos para macOS, Linux y WSL
tasks.ps1      El mismo conjunto de comandos para PowerShell en Windows
```

## Ejercicios por nivel

| Nivel | Ejercicios | Material del repositorio |
| ----- | ---------- | ------------------------ |
| 1 | 1 Chat y contexto, 2 Cambio pequeño | `src/`, `test/` |
| 2 | 3 Steering, 4 Spec, 5 Revisión | `docs/backlog.md`, `ejercicios/05-revision/` |
| 3 | 6 Hooks, 7 MCP y límites, 8 Delegar, 9 Integrador | `mcp/`, `docs/backlog.md` |

Los pasos de cada ejercicio están en la guía publicada.

## Estado inicial

El repositorio parte con **11 pruebas en verde**. Si dejas de ver ese resultado después de
un cambio, lo causó ese cambio. Para volver al punto de partida:

```bash
git restore .
```

Si Kiro creó archivos nuevos, `git status` los muestra como no rastreados y hay que
borrarlos a mano.

## Cómo se usa en la capacitación

Cada ejercicio parte de este mismo estado. El repositorio **no** incluye reglas de
steering ni specs: las escribes tú en los niveles siguientes.
