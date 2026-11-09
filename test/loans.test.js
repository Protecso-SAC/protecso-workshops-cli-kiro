import { test } from "node:test";
import assert from "node:assert/strict";
import { lendBook, returnBook, activeLoans, LOAN_DAYS } from "../src/loans.js";
import { makeDb } from "./fixtures.js";

const TODAY = "2026-01-10";

test("lendBook registra el préstamo con fecha de vencimiento a 14 días", () => {
  const db = makeDb();
  lendBook(db, { isbn: "9780000000011", memberId: "S001", today: TODAY });
  assert.equal(LOAN_DAYS, 14);
  assert.equal(db.loans[0].dueDate, "2026-01-24");
  assert.equal(db.loans[0].returned, false);
});

test("lendBook rechaza un socio inexistente", () => {
  const db = makeDb();
  assert.throws(
    () => lendBook(db, { isbn: "9780000000011", memberId: "S999", today: TODAY }),
    /Socio no encontrado/,
  );
});

test("lendBook rechaza si no quedan ejemplares", () => {
  const db = makeDb();
  lendBook(db, { isbn: "9780000000028", memberId: "S001", today: TODAY });
  assert.throws(
    () => lendBook(db, { isbn: "9780000000028", memberId: "S001", today: TODAY }),
    /No hay ejemplares/,
  );
});

test("lendBook limita a 3 préstamos activos por socio", () => {
  const db = makeDb();
  for (const isbn of ["9780000000011", "9780000000028", "9780000000035"]) {
    lendBook(db, { isbn, memberId: "S001", today: TODAY });
  }
  assert.throws(
    () => lendBook(db, { isbn: "9780000000042", memberId: "S001", today: TODAY }),
    /máximo de préstamos/,
  );
});

test("returnBook marca el préstamo como devuelto", () => {
  const db = makeDb();
  lendBook(db, { isbn: "9780000000011", memberId: "S001", today: TODAY });
  returnBook(db, { isbn: "9780000000011", memberId: "S001" });
  assert.equal(activeLoans(db, "S001").length, 0);
});

test("returnBook falla si no había un préstamo activo", () => {
  const db = makeDb();
  assert.throws(
    () => returnBook(db, { isbn: "9780000000011", memberId: "S001" }),
    /No hay un préstamo activo/,
  );
});
