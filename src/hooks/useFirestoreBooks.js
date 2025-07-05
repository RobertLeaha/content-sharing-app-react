// Hook personalizat pentru gestionarea cărților din Firestore
import { useState, useEffect } from "react";
import { getBooks, getBooksLocal } from "../utils/Book-Storage";
import { useAuth } from "../context/Auth-context";

export const useFirestoreBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const loadBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      let userBooks = [];

      if (user) {
        console.log("📚 Încarcă cărțile din Firestore pentru:", user.uid);
        userBooks = await getBooks(user.uid);
      } else {
        console.log("📱 Încarcă cărțile din localStorage");
        userBooks = getBooksLocal();
      }

      console.log("✅ Cărți încărcate:", userBooks.length);
      setBooks(Array.isArray(userBooks) ? userBooks : []);
    } catch (err) {
      console.error("❌ Eroare la încărcarea cărților:", err);
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [user]);

  return {
    books,
    loading,
    error,
    refetch: loadBooks,
  };
};
