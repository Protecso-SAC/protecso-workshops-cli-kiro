import { availableCopies } from "./books.js";

export const MAX_LOANS_PER_MEMBER = 3;
export const LOAN_DAYS = 14;

export function activeLoans(db, memberId) {
  return db.loans.filter((l) => l.memberId === memberId && !l.returned);
}

// `today` llega como "AAAA-MM-DD" para que la función sea fácil de probar.
export function lendBook(db, { isbn, memberId, today }) {
  if (!db.members.some((m) => m.id === memberId)) {
    throw new Error("Socio no encontrado");
  }
  if (availableCopies(db, isbn) <= 0) {
    throw new Error("No hay ejemplares disponibles");
  }
  if (activeLoans(db, memberId).length >= MAX_LOANS_PER_MEMBER) {
    throw new Error("El socio alcanzó el máximo de préstamos");
  }
  const due = new Date(today);
  due.setUTCDate(due.getUTCDate() + LOAN_DAYS);
  db.loans.push({
    isbn,
    memberId,
    dueDate: due.toISOString().slice(0, 10),
    returned: false,
  });
  return db;
}

export function returnBook(db, { isbn, memberId }) {
  const loan = db.loans.find(
    (l) => l.isbn === isbn && l.memberId === memberId && !l.returned,
  );
  if (!loan) {
    throw new Error("No hay un préstamo activo para ese libro y socio");
  }
  loan.returned = true;
  return db;
}
