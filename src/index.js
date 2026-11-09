import { load, save } from "./store.js";
import { addBook, availableCopies } from "./books.js";
import { lendBook, returnBook } from "./loans.js";

const USAGE = `Uso:
  list                                   Lista los libros y sus ejemplares libres
  add <isbn> <título> <autor> [copias]   Agrega un libro
  lend <isbn> <socio>                    Registra un préstamo
  return <isbn> <socio>                  Registra una devolución`;

const [command, ...args] = process.argv.slice(2);
const today = new Date().toISOString().slice(0, 10);

try {
  const db = load();

  switch (command) {
    case "list":
      for (const b of db.books) {
        console.log(
          `${b.isbn}  ${b.title}  (${availableCopies(db, b.isbn)}/${b.copies} libres)`,
        );
      }
      break;
    case "add": {
      const [isbn, title, author, copies] = args;
      addBook(db, { isbn, title, author, copies: Number(copies ?? 1) });
      save(db);
      console.log("Libro agregado");
      break;
    }
    case "lend": {
      const [isbn, memberId] = args;
      lendBook(db, { isbn, memberId, today });
      save(db);
      console.log("Préstamo registrado");
      break;
    }
    case "return": {
      const [isbn, memberId] = args;
      returnBook(db, { isbn, memberId });
      save(db);
      console.log("Devolución registrada");
      break;
    }
    default:
      console.log(USAGE);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
}
