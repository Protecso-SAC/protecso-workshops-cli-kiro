import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Archivo JSON que hace de base de datos. Se puede cambiar con BIBLIOTECA_DATA.
export const DATA_FILE =
  process.env.BIBLIOTECA_DATA ??
  fileURLToPath(new URL("../data/biblioteca.json", import.meta.url));

export function load(file = DATA_FILE) {
  return JSON.parse(readFileSync(file, "utf8"));
}

export function save(db, file = DATA_FILE) {
  writeFileSync(file, JSON.stringify(db, null, 2) + "\n");
}
