export const saveBook = (bookData) => {
  try {
    const existingBooks = getBooks();
    const newBook = {
      id: Date.now(),
      ...bookData,
      publishDate: new Date().toISOString().split("T")[0],
      views: Math.floor(Math.random() * 1000),
      rating: (Math.random() * 2 + 3).toFixed(1),
      author: "Tu",
      genre: {
        slug: bookData.genre,
        name: getGenreName(bookData.genre),
      },
      cover: "/placeholder.svg?height=300&width=200",
    };

    const updatedBooks = [...existingBooks, newBook];
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

const getGenreName = (slug) => {
  const genreMap = {
    action: "Acțiune",
    adventure: "Aventură",
    drama: "Dramă",
    fantasy: "Fantasy",
    horror: "Horror",
    mystery: "Mister",
    romance: "Romantism",
    sf: "Sci-Fi",
    thriller: "Thriller",
  };
  return genreMap[slug] || slug;
};
