// Servidor MCP mínimo para el ejercicio 7. Habla JSON-RPC 2.0 por stdio, un mensaje
// por línea, y expone dos herramientas de solo lectura sobre los datos sintéticos.
// No usa red ni credenciales: lee data/biblioteca.json y nada más.
import { createInterface } from "node:readline";
import { load } from "../src/store.js";
import { availableCopies } from "../src/books.js";
import { activeLoans } from "../src/loans.js";

const TOOLS = [
  {
    name: "buscar_libro",
    description:
      "Busca libros por parte del título o del autor y muestra los ejemplares libres.",
    inputSchema: {
      type: "object",
      properties: { texto: { type: "string", description: "Texto a buscar" } },
      required: ["texto"],
    },
  },
  {
    name: "prestamos_activos",
    description: "Lista los préstamos activos de un socio.",
    inputSchema: {
      type: "object",
      properties: {
        socio: { type: "string", description: "Identificador del socio, por ejemplo S001" },
      },
      required: ["socio"],
    },
  },
];

function callTool(name, args = {}) {
  const db = load();

  if (name === "buscar_libro") {
    const texto = String(args.texto ?? "").toLowerCase();
    const found = db.books.filter(
      (b) =>
        b.title.toLowerCase().includes(texto) || b.author.toLowerCase().includes(texto),
    );
    if (found.length === 0) return "No hay libros que coincidan.";
    return found
      .map((b) => `${b.isbn}  ${b.title}  (${availableCopies(db, b.isbn)}/${b.copies} libres)`)
      .join("\n");
  }

  if (name === "prestamos_activos") {
    const loans = activeLoans(db, String(args.socio ?? ""));
    if (loans.length === 0) return "El socio no tiene préstamos activos.";
    return loans.map((l) => `${l.isbn}  vence el ${l.dueDate}`).join("\n");
  }

  throw new Error(`Herramienta desconocida: ${name}`);
}

function send(message) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", ...message }) + "\n");
}

const lines = createInterface({ input: process.stdin });

lines.on("line", (line) => {
  if (!line.trim()) return;

  let msg;
  try {
    msg = JSON.parse(line);
  } catch {
    return;
  }

  // Las notificaciones (sin id) no se responden.
  if (msg.id === undefined) return;

  switch (msg.method) {
    case "initialize":
      send({
        id: msg.id,
        result: {
          protocolVersion: msg.params?.protocolVersion ?? "2024-11-05",
          capabilities: { tools: {} },
          serverInfo: { name: "biblioteca", version: "1.0.0" },
        },
      });
      break;
    case "ping":
      send({ id: msg.id, result: {} });
      break;
    case "tools/list":
      send({ id: msg.id, result: { tools: TOOLS } });
      break;
    case "tools/call":
      try {
        const text = callTool(msg.params?.name, msg.params?.arguments);
        send({ id: msg.id, result: { content: [{ type: "text", text }] } });
      } catch (error) {
        send({
          id: msg.id,
          result: { content: [{ type: "text", text: error.message }], isError: true },
        });
      }
      break;
    default:
      send({ id: msg.id, error: { code: -32601, message: "Método no soportado" } });
  }
});
