// Base de datos mínima y nueva para cada prueba (datos sintéticos).
export function makeDb() {
  return {
    books: [
      { isbn: "9780000000011", title: "Libro A", author: "Autora A", copies: 2 },
      { isbn: "9780000000028", title: "Libro B", author: "Autor B", copies: 1 },
      { isbn: "9780000000035", title: "Libro C", author: "Autora C", copies: 1 },
      { isbn: "9780000000042", title: "Libro D", author: "Autor D", copies: 1 },
    ],
    members: [{ id: "S001", name: "Socia de prueba" }],
    loans: [],
  };
}
