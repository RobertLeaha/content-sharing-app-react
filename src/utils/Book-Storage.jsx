import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  getDoc,
  increment,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Funcție helper pentru a obține ID-ul utilizatorului curent
const getCurrentUserId = () => {
  const auth = typeof window !== "undefined" ? window.currentUser : null;
  return auth?.uid || null;
};

// Salvează o carte nouă în Firestore
export const saveBook = async (bookData, userId) => {
  try {
    if (!userId) {
      throw new Error(
        "Utilizatorul trebuie să fie autentificat pentru a salva o carte"
      );
    }

    const newBook = {
      ...bookData,
      userId: userId,
      publishDate: new Date().toISOString().split("T")[0],
      views: 0, // Începe cu 0 vizualizări
      totalRating: 0, // Suma tuturor rating-urilor
      ratingCount: 0, // Numărul de rating-uri
      averageRating: 0, // Rating-ul mediu calculat
      author: "Tu",
      genre: {
        slug: bookData.genre,
        name: getGenreName(bookData.genre),
      },
      cover: "/placeholder.svg?height=300&width=200",
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: true, // Cartea este publică implicit
    };

    const docRef = await addDoc(collection(db, "books"), newBook);

    return {
      id: docRef.id,
      ...newBook,
    };
  } catch (error) {
    console.error("Eroare la salvarea cărții în Firestore:", error);
    throw error;
  }
};

// Obține toate cărțile publice (pentru toți utilizatorii)
export const getAllPublicBooks = async () => {
  try {
    const q = query(
      collection(db, "books"),
      where("isPublic", "==", true),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const books = [];

    querySnapshot.forEach((doc) => {
      const bookData = doc.data();
      books.push({
        id: doc.id,
        ...bookData,
        // Calculează rating-ul mediu
        rating:
          bookData.ratingCount > 0
            ? (bookData.totalRating / bookData.ratingCount).toFixed(1)
            : 0,
      });
    });

    return books;
  } catch (error) {
    console.error("Eroare la citirea cărților publice din Firestore:", error);
    return [];
  }
};

// Obține toate cărțile utilizatorului curent din Firestore
export const getBooks = async (userId) => {
  try {
    if (!userId) {
      return [];
    }

    const q = query(
      collection(db, "books"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const books = [];

    querySnapshot.forEach((doc) => {
      const bookData = doc.data();
      books.push({
        id: doc.id,
        ...bookData,
        // Calculează rating-ul mediu
        rating:
          bookData.ratingCount > 0
            ? (bookData.totalRating / bookData.ratingCount).toFixed(1)
            : 0,
      });
    });

    return books;
  } catch (error) {
    console.error("Eroare la citirea cărților din Firestore:", error);
    return [];
  }
};

// Incrementează numărul de vizualizări pentru o carte
export const incrementBookViews = async (bookId) => {
  try {
    const bookRef = doc(db, "books", bookId);
    await updateDoc(bookRef, {
      views: increment(1),
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Eroare la incrementarea vizualizărilor:", error);
    return false;
  }
};

// Adaugă sau actualizează rating-ul pentru o carte
export const rateBook = async (bookId, rating, userId) => {
  try {
    if (!userId) {
      throw new Error(
        "Utilizatorul trebuie să fie autentificat pentru a da rating"
      );
    }

    if (rating < 1 || rating > 5) {
      throw new Error("Rating-ul trebuie să fie între 1 și 5");
    }

    // Verifică dacă utilizatorul a mai dat rating acestei cărți
    const ratingsQuery = query(
      collection(db, "ratings"),
      where("bookId", "==", bookId),
      where("userId", "==", userId)
    );

    const existingRatings = await getDocs(ratingsQuery);

    if (!existingRatings.empty) {
      // Actualizează rating-ul existent
      const existingRatingDoc = existingRatings.docs[0];
      const oldRating = existingRatingDoc.data().rating;

      await updateDoc(doc(db, "ratings", existingRatingDoc.id), {
        rating: rating,
        updatedAt: new Date(),
      });

      // Actualizează totalul în cartea principală
      const bookRef = doc(db, "books", bookId);
      await updateDoc(bookRef, {
        totalRating: increment(rating - oldRating),
        updatedAt: new Date(),
      });
    } else {
      // Adaugă un rating nou
      await addDoc(collection(db, "ratings"), {
        bookId: bookId,
        userId: userId,
        rating: rating,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Actualizează cartea principală
      const bookRef = doc(db, "books", bookId);
      await updateDoc(bookRef, {
        totalRating: increment(rating),
        ratingCount: increment(1),
        updatedAt: new Date(),
      });
    }

    return true;
  } catch (error) {
    console.error("Eroare la adăugarea rating-ului:", error);
    throw error;
  }
};

// Obține rating-ul dat de utilizatorul curent pentru o carte
export const getUserRating = async (bookId, userId) => {
  try {
    if (!userId) return null;

    const ratingsQuery = query(
      collection(db, "ratings"),
      where("bookId", "==", bookId),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(ratingsQuery);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data().rating;
    }

    return null;
  } catch (error) {
    console.error("Eroare la citirea rating-ului utilizatorului:", error);
    return null;
  }
};

// Șterge o carte din Firestore
export const deleteBook = async (bookId, userId) => {
  try {
    if (!userId) {
      throw new Error(
        "Utilizatorul trebuie să fie autentificat pentru a șterge o carte"
      );
    }

    // Șterge toate rating-urile asociate cărții
    const ratingsQuery = query(
      collection(db, "ratings"),
      where("bookId", "==", bookId)
    );
    const ratingsSnapshot = await getDocs(ratingsQuery);

    const deletePromises = ratingsSnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    );
    await Promise.all(deletePromises);

    // Șterge cartea
    await deleteDoc(doc(db, "books", bookId));
    return true;
  } catch (error) {
    console.error("Eroare la ștergerea cărții din Firestore:", error);
    return false;
  }
};

// Actualizează o carte în Firestore
export const updateBook = async (bookId, updatedData, userId) => {
  try {
    if (!userId) {
      throw new Error(
        "Utilizatorul trebuie să fie autentificat pentru a actualiza o carte"
      );
    }

    const bookRef = doc(db, "books", bookId);
    await updateDoc(bookRef, {
      ...updatedData,
      updatedAt: new Date(),
    });

    return true;
  } catch (error) {
    console.error("Eroare la actualizarea cărții în Firestore:", error);
    return false;
  }
};

// Obține o carte specifică după ID
export const getBookById = async (bookId) => {
  try {
    const bookRef = doc(db, "books", bookId);
    const bookSnap = await getDoc(bookRef);

    if (bookSnap.exists()) {
      const bookData = bookSnap.data();
      return {
        id: bookSnap.id,
        ...bookData,
        // Calculează rating-ul mediu
        rating:
          bookData.ratingCount > 0
            ? (bookData.totalRating / bookData.ratingCount).toFixed(1)
            : 0,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Eroare la citirea cărții din Firestore:", error);
    return null;
  }
};

// Funcție helper pentru maparea genurilor
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

// Funcții pentru compatibilitate cu localStorage (pentru utilizatori neautentificați)
export const saveBookLocal = (bookData) => {
  try {
    const existingBooks = getBooksLocal();
    const newBook = {
      id: Date.now().toString(),
      ...bookData,
      publishDate: new Date().toISOString().split("T")[0],
      views: 0,
      totalRating: 0,
      ratingCount: 0,
      averageRating: 0,
      author: "Tu",
      genre: {
        slug: bookData.genre,
        name: getGenreName(bookData.genre),
      },
      cover: "/placeholder.svg?height=300&width=200",
      isPublic: false, // Cărțile locale nu sunt publice
    };

    const updatedBooks = [...existingBooks, newBook];
    localStorage.setItem("userBooks", JSON.stringify(updatedBooks));
    return newBook;
  } catch (error) {
    console.error("Eroare la salvarea cărții local:", error);
    return null;
  }
};

export const getBooksLocal = () => {
  try {
    const books = localStorage.getItem("userBooks");
    return books ? JSON.parse(books) : [];
  } catch (error) {
    console.error("Eroare la citirea cărților locale:", error);
    return [];
  }
};

export const deleteBookLocal = (bookId) => {
  try {
    const existingBooks = getBooksLocal();
    const updatedBooks = existingBooks.filter((book) => book.id !== bookId);
    localStorage.setItem("userBooks", JSON.stringify(updatedBooks));
    return true;
  } catch (error) {
    console.error("Eroare la ștergerea cărții locale:", error);
    return false;
  }
};

export const updateBookLocal = (bookId, updatedData) => {
  try {
    const existingBooks = getBooksLocal();
    const updatedBooks = existingBooks.map((book) =>
      book.id === bookId ? { ...book, ...updatedData } : book
    );
    localStorage.setItem("userBooks", JSON.stringify(updatedBooks));
    return true;
  } catch (error) {
    console.error("Eroare la actualizarea cărții locale:", error);
    return false;
  }
};
