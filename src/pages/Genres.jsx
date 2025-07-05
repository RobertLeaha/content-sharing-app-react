import { useParams } from "react-router-dom";
import { useNavigation } from "../hooks/useNavigation";
import Navigation from "../components/Navigation";
import { defaultBooks } from "../pages/Descopera";
import { useState, useEffect } from "react";
import { getBooks, getBooksLocal } from "../utils/Book-Storage";
import { useAuth } from "../context/Auth-context";

// Maparea genurilor pentru afișare
const genreDisplayNames = {
  action: "Acțiune",
  adventure: "Aventură",
  drama: "Dramă",
  romance: "Romantism",
  fantasy: "Fantasy",
  sf: "Sci-Fi",
  horror: "Horror",
  mystery: "Mister",
  thriller: "Thriller",
};

export default function GenresPage() {
  const { slug } = useParams();
  const router = useNavigation();
  const { user } = useAuth();
  const [userBooks, setUserBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        let books = [];
        if (user) {
          books = await getBooks(user.uid);
        } else {
          books = getBooksLocal();
        }
        setUserBooks(Array.isArray(books) ? books : []);
      } catch (error) {
        console.error("Eroare la încărcarea cărților:", error);
        setUserBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sky-100">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <p className="text-sky-600">Se încarcă cărțile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!slug) {
    return (
      <div className="min-h-screen bg-sky-100">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <span className="text-6xl mb-4 block">❓</span>
            <h1 className="text-2xl font-bold text-sky-900 mb-4">
              Gen nespecificat
            </h1>
            <p className="text-sky-600 mb-6">
              Te rugăm să selectezi un gen din meniul de navigare.
            </p>
            <button
              onClick={() => router.push("/descopera")}
              className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
            >
              Explorează toate cărțile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const allBooks = [...defaultBooks, ...userBooks];
  const decodedGenre = decodeURIComponent(slug);
  const genreDisplayName = genreDisplayNames[decodedGenre] || decodedGenre;

  // Filtrează cărțile după gen
  const books = allBooks.filter((currentBook) => {
    if (!currentBook || !currentBook.genre) {
      return false;
    }
    return currentBook.genre.slug === decodedGenre;
  });

  const isUserBook = (bookId) => {
    return userBooks.some((book) => book.id === bookId);
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-sky-600 hover:text-sky-800 mb-4 transition-colors"
          >
            <span className="mr-2">←</span>
            Înapoi
          </button>

          <h1 className="text-4xl font-bold text-sky-900 mb-4">
            Cărți din genul: {genreDisplayName}
          </h1>
          <p className="text-sky-700">
            Descoperă cele mai bune cărți din categoria{" "}
            {genreDisplayName.toLowerCase()}
          </p>

          <div className="mt-4 text-sky-600">
            {books.length}{" "}
            {books.length === 1 ? "carte găsită" : "cărți găsite"}
          </div>
        </div>

        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden relative"
                onClick={() => router.push(`/read/${book.id}`)}
              >
                {isUserBook(book.id) && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                    {user ? "☁️ Cloud" : "📱 Local"}
                  </div>
                )}

                <div className="aspect-[3/4] bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center">
                  <img
                    src={book.cover || "/placeholder.svg?height=300&width=200"}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full">
                      {book.genre.name}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <span>⭐</span>
                      <span className="ml-1 text-xs font-medium text-sky-700">
                        {book.rating || "N/A"}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-sky-900 mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sky-600 text-xs mb-2">de {book.author}</p>

                  <div className="flex items-center justify-between text-sky-500 text-xs">
                    <div className="flex items-center">
                      <span>👁</span>
                      <span className="ml-1">
                        {book.views?.toLocaleString() || "0"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span>📅</span>
                      <span className="ml-1">
                        {new Date(book.publishDate).toLocaleDateString("ro-RO")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-sky-400 mb-4">
              <span className="text-6xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold text-sky-900 mb-2">
              Nu există cărți în acest gen
            </h3>
            <p className="text-sky-600 mb-6">
              Momentan nu avem cărți disponibile în genul{" "}
              {genreDisplayName.toLowerCase()}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/descopera")}
                className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
              >
                Explorează toate cărțile
              </button>
              {user && (
                <button
                  onClick={() => router.push("/scrie-carte")}
                  className="px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors border-2 border-sky-600"
                >
                  Scrie prima carte din acest gen
                </button>
              )}
            </div>
          </div>
        )}

        {/* Sugestii pentru alte genuri */}
        {books.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-sky-900 mb-6">
              Explorează și alte genuri
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Object.entries(genreDisplayNames)
                .filter(([genreSlug]) => genreSlug !== decodedGenre)
                .slice(0, 8)
                .map(([genreSlug, genreName]) => {
                  const genreBookCount = allBooks.filter(
                    (book) => book.genre?.slug === genreSlug
                  ).length;

                  return (
                    <button
                      key={genreSlug}
                      onClick={() => router.push(`/genres/${genreSlug}`)}
                      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                    >
                      <div className="text-2xl mb-2">📖</div>
                      <div className="text-sm font-semibold text-sky-900 mb-1">
                        {genreName}
                      </div>
                      <div className="text-xs text-sky-600">
                        {genreBookCount}{" "}
                        {genreBookCount === 1 ? "carte" : "cărți"}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
