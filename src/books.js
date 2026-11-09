export function findBook(db, isbn) {
  return db.books.find((b) => b.isbn === isbn);
}

export function addBook(db, { isbn, title, author, copies = 1 }) {
  if (!isbn || !title) {
    throw new Error("Faltan datos del libro");
  }
  if (findBook(db, isbn)) {
    throw new Error("El libro ya existe");
  }
  db.books.push({ isbn, title, author, copies });
  return db;
}

// Ejemplares que siguen en la biblioteca: total menos los préstamos activos.
export function availableCopies(db, isbn) {
  const book = findBook(db, isbn);
  if (!book) {
    throw new Error("Libro no encontrado");
  }
  const lent = db.loans.filter((l) => l.isbn === isbn && !l.returned).length;
  return book.copies - lent;
}
