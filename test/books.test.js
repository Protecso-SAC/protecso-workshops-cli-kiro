import { test } from "node:test";
import assert from "node:assert/strict";
import { addBook, availableCopies, findBook } from "../src/books.js";
import { makeDb } from "./fixtures.js";

test("addBook agrega un libro nuevo", () => {
  const db = makeDb();
  addBook(db, { isbn: "9780000000059", title: "Libro E", author: "Autora E" });
  assert.equal(findBook(db, "9780000000059").title, "Libro E");
});

test("addBook rechaza un ISBN repetido", () => {
  const db = makeDb();
  assert.throws(
    () => addBook(db, { isbn: "9780000000011", title: "Otro" }),
    /ya existe/,
  );
});

test("addBook exige ISBN y título", () => {
  const db = makeDb();
  assert.throws(() => addBook(db, { title: "Sin ISBN" }), /Faltan datos/);
});

test("availableCopies descuenta los préstamos activos", () => {
  const db = makeDb();
  db.loans.push({ isbn: "9780000000011", memberId: "S001", dueDate: "2026-01-20", returned: false });
  assert.equal(availableCopies(db, "9780000000011"), 1);
});

test("availableCopies ignora los préstamos devueltos", () => {
  const db = makeDb();
  db.loans.push({ isbn: "9780000000011", memberId: "S001", dueDate: "2026-01-20", returned: true });
  assert.equal(availableCopies(db, "9780000000011"), 2);
});
