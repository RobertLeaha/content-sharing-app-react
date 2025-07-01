// Utility functions pentru gestionarea cărților în localStorage

export const saveBook = (bookData) => {
  try {
    // Obține cărțile existente
    const existingBooks = getBooks();

    // Creează o carte nouă cu ID unic și data publicării
    const newBook = {
      id: Date.now(),
      ...bookData,
      publishDate: new Date().toISOString().split("T")[0],
      views: 0,
      rating: 0,
      author: "Tu", // Poate fi înlocuit cu numele utilizatorului autentificat
    };

    // Adaugă cartea nouă la lista existentă
    const updatedBooks = [...existingBooks, newBook];

    // Salvează în localStorage
    localStorage.setItem("userBooks", JSON.stringify(updatedBooks));

    return newBook;
  } catch (error) {
    console.error("Eroare la salvarea cărții:", error);
    return null;
  }
};

export const getBooks = () => {
  try {
    const books = localStorage.getItem("userBooks");
    return books ? JSON.parse(books) : [];
  } catch (error) {
    console.error("Eroare la citirea cărților:", error);
    return [];
  }
};

export const deleteBook = (bookId) => {
  try {
    const existingBooks = getBooks();
    const updatedBooks = existingBooks.filter((book) => book.id !== bookId);
    localStorage.setItem("userBooks", JSON.stringify(updatedBooks));
    return true;
  } catch (error) {
    console.error("Eroare la ștergerea cărții:", error);
    return false;
  }
};

export const updateBook = (bookId, updatedData) => {
  try {
    const existingBooks = getBooks();
    const updatedBooks = existingBooks.map((book) =>
      book.id === bookId ? { ...book, ...updatedData } : book
    );
    localStorage.setItem("userBooks", JSON.stringify(updatedBooks));
    return true;
  } catch (error) {
    console.error("Eroare la actualizarea cărții:", error);
    return false;
  }
};
