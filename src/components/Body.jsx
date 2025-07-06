import { useState, useEffect } from "react";
import { useNavigation } from "../hooks/useNavigation";
import { getBooks, getBooksLocal } from "../utils/Book-Storage";
import { useAuth } from "../context/Auth-context";
import BookCard from "./BookCard";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

export default function Body() {
  const [topBooks, setTopBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const loadTopBooks = async () => {
      try {
        let userBooks = [];
        if (user) {
          userBooks = await getBooks(user.uid);
        } else {
          userBooks = getBooksLocal();
        }

        // Sortează după rating și ia primele 3 cărți create de utilizatori
        const sortedBooks = userBooks
          .sort(
            (a, b) =>
              (Number.parseFloat(b.rating) || 0) -
              (Number.parseFloat(a.rating) || 0)
          )
          .slice(0, 3);
        setTopBooks(sortedBooks);
      } catch (error) {
        console.error("Eroare la încărcarea cărților:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTopBooks();
  }, [user]);

  if (isLoading) {
    return (
      <div className="bg-sky-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sky-900 mb-4">
              Cărțile cu rating-ul cel mai mare
            </h2>
            <p className="text-sky-700 text-lg">
              Descoperă cărțile cel mai bine evaluate create de comunitatea
              noastră
            </p>
          </div>
          <LoadingSpinner message="Se încarcă cărțile..." />
        </div>
      </div>
    );
  }

  if (topBooks.length === 0) {
    return (
      <div className="bg-sky-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sky-900 mb-4">
              Cărțile cu rating-ul cel mai mare
            </h2>
            <p className="text-sky-700 text-lg">
              Descoperă cărțile cel mai bine evaluate create de comunitatea
              noastră
            </p>
          </div>
          <EmptyState
            icon="📚"
            title="Încă nu există cărți create"
            description="Fii primul care creează o carte pe platforma noastră!"
            buttonText="Scrie prima carte"
            onButtonClick={() => router.push("/scrie-carte")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sky-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-sky-900 mb-4">
            Cărțile cu rating-ul cel mai mare
          </h2>
          <p className="text-sky-700 text-lg">
            Descoperă cărțile cel mai bine evaluate create de comunitatea
            noastră
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => router.push(`/read/${book.id}`)}
              showViews={true}
            />
          ))}
        </div>

        {topBooks.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/descopera")}
              className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
            >
              Vezi toate cărțile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
