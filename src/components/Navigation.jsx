import { useState, useEffect } from "react";
import { useNavigation } from "../hooks/useNavigation";
import { getBooks, getBooksLocal } from "../utils/Book-Storage";
import { genres } from "../data/genuri";
import { useAuth } from "../context/Auth-context";

const defaultSuggestions = [
  { id: "default-1", title: "În numele trandafirului" },
  { id: "default-2", title: "Maitreyi" },
  { id: "default-3", title: "Ion" },
  { id: "default-5", title: "Enigma Otiliei" },
  { id: "default-4", title: "Baltagul" },
  { id: "default-6", title: "Moromeții" },
];

export default function Navigation() {
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userBooks, setUserBooks] = useState([]);
  const router = useNavigation();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let books = [];
        if (user) {
          books = await getBooks(user.uid);
        } else {
          books = getBooksLocal();
        }
        setUserBooks(Array.isArray(books) ? books : []);
      } catch (error) {
        console.error("Eroare la încărcarea cărților pentru căutare:", error);
        setUserBooks([]);
      }
    };

    fetchBooks();
  }, [user]);

  const userBookSuggestions = userBooks.map((book) => ({
    id: book.id,
    title: book.title,
  }));
  const allSuggestions = [...defaultSuggestions, ...userBookSuggestions];

  const filteredSuggestions = allSuggestions.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (bookId) => {
    setSearchQuery("");
    setShowSuggestions(false);
    router.push(`/read/${bookId}`);
  };

  const handleGenreClick = (genreSlug) => {
    setIsGenreOpen(false);
    router.push(`/genres/${genreSlug}`);
  };

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        setIsUserMenuOpen(false);
        alert("Te-ai deconectat cu succes!");
        router.push("/");
      }
    } catch (error) {
      console.error("Eroare la deconectare:", error);
      alert("A apărut o eroare la deconectare");
    }
  };

  const getUserDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "Utilizator";
  };

  // Închide meniurile când se face click în afara lor
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsGenreOpen(false);
        setIsWriteOpen(false);
        setIsUserMenuOpen(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md border-b border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <span className="text-2xl">📚</span>
              <span className="ml-2 text-xl font-bold text-sky-800">
                Mica Mea Carte
              </span>
            </div>

            <div className="relative dropdown-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsGenreOpen(!isGenreOpen);
                }}
                className="flex items-center px-4 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-md transition-colors"
              >
                Genuri
                <span className="ml-1">▼</span>
              </button>

              {isGenreOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-sky-200 z-50">
                  {genres.map((genre) => (
                    <button
                      key={genre.slug}
                      onClick={() => handleGenreClick(genre.slug)}
                      className="block w-full text-left px-4 py-2 text-sky-700 hover:bg-sky-50 hover:text-sky-900 transition-colors"
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-8 relative dropdown-container">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Cărți"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                className="w-full pl-4 pr-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
            </div>

            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-sky-200 z-50">
                {filteredSuggestions.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => handleSearch(book.id)}
                    className="block w-full text-left px-4 py-2 text-sky-700 hover:bg-sky-50 hover:text-sky-900 transition-colors"
                  >
                    {book.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsWriteOpen(!isWriteOpen);
                  }}
                  className="flex items-center px-4 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-md transition-colors"
                >
                  Scrie
                  <span className="ml-1">▼</span>
                </button>

                {isWriteOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-sky-200 z-50">
                    <button
                      onClick={() => {
                        setIsWriteOpen(false);
                        router.push("/scrie-carte");
                      }}
                      className="block w-full text-left px-4 py-2 text-sky-700 hover:bg-sky-50 hover:text-sky-900 transition-colors"
                    >
                      Scrie o carte
                    </button>
                    <button
                      onClick={() => {
                        setIsWriteOpen(false);
                        router.push("/capitol");
                      }}
                      className="block w-full text-left px-4 py-2 text-sky-700 hover:bg-sky-50 hover:text-sky-900 transition-colors"
                    >
                      Scrie un capitol
                    </button>
                  </div>
                )}
              </div>
            )}

            {!loading && (
              <>
                {user ? (
                  <div className="relative dropdown-container">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsUserMenuOpen(!isUserMenuOpen);
                      }}
                      className="flex items-center px-4 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-md transition-colors"
                    >
                      <span className="mr-2">👤</span>
                      {getUserDisplayName()}
                      <span className="ml-1">▼</span>
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-sky-200 z-50">
                        <div className="px-4 py-2 border-b border-sky-100">
                          <p className="text-sm text-sky-600">Conectat ca:</p>
                          <p className="text-sm font-medium text-sky-800 truncate">
                            {user.email}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            router.push("/descopera");
                          }}
                          className="block w-full text-left px-4 py-2 text-sky-700 hover:bg-sky-50 hover:text-sky-900 transition-colors"
                        >
                          📚 Cărțile mele
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors"
                        >
                          🚪 Deconectare
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/conectare")}
                      className="flex items-center px-4 py-2 text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-md transition-colors"
                    >
                      Conectare
                    </button>

                    <button
                      onClick={() => router.push("/inregistrare")}
                      className="flex items-center px-4 py-2 bg-sky-600 text-white hover:bg-sky-700 rounded-md transition-colors"
                    >
                      Înregistrare
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
