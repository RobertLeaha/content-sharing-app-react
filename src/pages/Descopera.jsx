import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { useNavigation } from "../hooks/useNavigation";
import { getBooks, deleteBook } from "../utils/Book-Storage";

// Cărțile predefinite
export const defaultBooks = [
  {
    id: 1,
    title: "În numele trandafirului",
    author: "Umberto Eco",
    rating: 4.8,
    views: 15420,
    genre: { slug: "mystery", name: "Mister" },
    publishDate: "2023-12-15",
    cover: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 2,
    title: "Maitreyi",
    author: "Mircea Eliade",
    rating: 4.6,
    views: 12350,
    genre: { slug: "romance", name: "Romantism" },
    publishDate: "2023-11-20",
    cover: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 3,
    title: "Ion",
    author: "Liviu Rebreanu",
    rating: 4.4,
    views: 9870,
    genre: { slug: "drama", name: "Drama" },
    publishDate: "2023-10-05",
    cover: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 4,
    title: "Baltagul",
    author: "Mihail Sadoveanu",
    rating: 4.7,
    views: 11200,
    genre: { slug: "drama", name: "Drama" },
    publishDate: "2023-09-12",
    cover: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 5,
    title: "Enigma Otiliei",
    author: "George Călinescu",
    rating: 4.3,
    views: 8900,
    genre: { slug: "romance", name: "Romantic" },
    publishDate: "2023-08-30",
    cover: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 6,
    title: "Moromeții",
    author: "Marin Preda",
    rating: 4.5,
    views: 10500,
    genre: { slug: "drama", name: "Drama" },
    publishDate: "2023-07-18",
    cover: "/placeholder.svg?height=300&width=200",
  },
];

export const genres = [
  { slug: "action", name: "Actiune" },
  { slug: "adventure", name: "Aventura" },
  { slug: "drama", name: "Drama" },
  { slug: "romance", name: "Romantism" },
  { slug: "fantasy", name: "Fantasy" },
  { slug: "sf", name: "SF" },
  { slug: "non-fiction", name: "Non-Fictiune" },
  { slug: "mystery", name: "Mister" },
];

export default function DescoperaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Toate");
  const [sortBy, setSortBy] = useState("views"); // 'views', 'rating', 'date', 'alphabetical'
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc', 'desc'
  const [userBooks, setUserBooks] = useState([]);
  const [showUserBooksOnly, setShowUserBooksOnly] = useState(false);
  const router = useNavigation();

  // Încarcă cărțile utilizatorului la montarea componentei
  useEffect(() => {
    const books = getBooks();
    setUserBooks(books);
  }, []);

  // Combină cărțile predefinite cu cele ale utilizatorului
  const allBooks = showUserBooksOnly
    ? userBooks
    : [...defaultBooks, ...userBooks];

  const filteredAndSortedBooks = allBooks
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre =
        selectedGenre === "Toate" || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "views":
          comparison = a.views - b.views;
          break;
        case "rating":
          comparison = a.rating - b.rating;
          break;
        case "date":
          comparison = new Date(a.publishDate) - new Date(b.publishDate);
          break;
        case "alphabetical":
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDeleteBook = (bookId, event) => {
    event.stopPropagation(); // Previne navigarea către pagina cărții

    if (window.confirm("Ești sigur că vrei să ștergi această carte?")) {
      const success = deleteBook(bookId);
      if (success) {
        setUserBooks(getBooks()); // Reîncarcă cărțile
        alert("Cartea a fost ștearsă cu succes!");
      } else {
        alert("A apărut o eroare la ștergerea cărții.");
      }
    }
  };

  const isUserBook = (bookId) => {
    return userBooks.some((book) => book.id === bookId);
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-sky-900 mb-4">
            Descoperă cărți
          </h1>
          <p className="text-sky-700 text-lg">
            Explorează colecția noastră completă de cărți publicate
          </p>
        </div>

        {/* Toggle pentru cărțile utilizatorului */}
        <div className="mb-6 flex justify-center">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setShowUserBooksOnly(false)}
              className={`px-4 py-2 rounded-md transition-colors ${
                !showUserBooksOnly
                  ? "bg-sky-600 text-white"
                  : "text-sky-600 hover:bg-sky-50"
              }`}
            >
              Toate cărțile ({allBooks.length})
            </button>
            <button
              onClick={() => setShowUserBooksOnly(true)}
              className={`px-4 py-2 rounded-md transition-colors ${
                showUserBooksOnly
                  ? "bg-sky-600 text-white"
                  : "text-sky-600 hover:bg-sky-50"
              }`}
            >
              Cărțile mele ({userBooks.length})
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Caută cărți sau autori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent appearance-none"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="views">Cele mai citite</option>
                <option value="rating">Cel mai bine cotate</option>
                <option value="date">Data publicării</option>
                <option value="alphabetical">Ordine alfabetică</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <button
                onClick={toggleSortOrder}
                className="w-full flex items-center justify-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                <span className="mr-2">↕</span>
                {sortOrder === "desc" ? "Descrescător" : "Crescător"}
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sky-700">
            {filteredAndSortedBooks.length}{" "}
            {filteredAndSortedBooks.length === 1
              ? "carte găsită"
              : "cărți găsite"}
            {showUserBooksOnly && " din cărțile tale"}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredAndSortedBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden relative"
              onClick={() =>
                router.push(`/book/${encodeURIComponent(book.title)}`)
              }
            >
              {/* Badge pentru cărțile utilizatorului */}
              {isUserBook(book.id) && (
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                  Cartea ta
                </div>
              )}

              {/* Buton de ștergere pentru cărțile utilizatorului */}
              {isUserBook(book.id) && (
                <button
                  onClick={(e) => handleDeleteBook(book.id, e)}
                  className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors z-10"
                  title="Șterge cartea"
                >
                  ✕
                </button>
              )}

              <div className="aspect-[3/4] bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full">
                    {book.genre}
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

        {/* No Results */}
        {filteredAndSortedBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-sky-400 mb-4">
              <span className="text-6xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-sky-900 mb-2">
              {showUserBooksOnly
                ? "Nu ai încă nicio carte publicată"
                : "Nu am găsit nicio carte"}
            </h3>
            <p className="text-sky-600">
              {showUserBooksOnly
                ? "Începe să scrii prima ta carte!"
                : "Încearcă să modifici criteriile de căutare sau filtrele aplicate."}
            </p>
            {showUserBooksOnly && (
              <button
                onClick={() => router.push("/scrie-carte")}
                className="mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                Scrie prima carte
              </button>
            )}
          </div>
        )}
      </div>
         
    </div>
  );
}
