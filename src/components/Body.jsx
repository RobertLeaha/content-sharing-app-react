import { useState, useEffect } from "react";
import { useNavigation } from "../hooks/useNavigation";
import { getAllPublicBooks } from "../utils/Book-Storage";

export default function Body() {
  const [topBooks, setTopBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useNavigation();

  useEffect(() => {
    const loadTopBooks = async () => {
      try {
        const publicBooks = await getAllPublicBooks();
        // Sortează după vizualizări și ia primele 3
        const sortedBooks = publicBooks
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
  }, []);

  if (isLoading) {
    return (
      <div className="bg-sky-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-sky-900 mb-4">
              Cărțile cu rating-ul cel mai mare
            </h2>
            <p className="text-sky-700 text-lg">
              Descoperă cărțile cel mai bine evaluate de comunitatea noastră
            </p>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <p className="text-sky-600">Se încarcă cărțile...</p>
          </div>
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
              Descoperă cărțile cel mai bine evaluate de comunitatea noastră
            </p>
          </div>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-sky-900 mb-4">
              Încă nu există cărți publicate
            </h3>
            <p className="text-sky-600 mb-6">
              Fii primul care publică o carte pe platforma noastră!
            </p>
            <button
              onClick={() => router.push("/scrie-carte")}
              className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
            >
              Scrie prima carte
            </button>
          </div>
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
            Descoperă cărțile cel mai bine evaluate de comunitatea noastră
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
              onClick={() => router.push(`/read/${book.id}`)}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-sky-100 text-sky-700 text-sm rounded-full">
                    {book.genre.name}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <span>⭐</span>
                    <span className="ml-1 text-sm font-medium text-sky-700">
                      {book.rating > 0 ? book.rating : "N/A"}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-sky-900 mb-2">
                  {book.title}
                </h3>
                <p className="text-sky-600 mb-3">de {book.author}</p>
                <p className="text-sky-700 text-sm mb-4 line-clamp-2">
                  {book.description ||
                    "O poveste captivantă care te va ține cu sufletul la gură."}
                </p>

                <div className="flex items-center text-sky-500 text-sm">
                  <span>👁</span>
                  <span className="ml-1">
                    {(book.views || 0).toLocaleString()} cititori
                  </span>
                </div>
              </div>
            </div>
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
