import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigation } from "../hooks/useNavigation";
import Navigation from "../components/Navigation";
import { getBooks, getBooksLocal } from "../utils/Book-Storage";
import { defaultBooks } from "./Descopera";
import { defaultBooksContent } from "../data/defaultBooksContent";
import { useAuth } from "../context/Auth-context";

export default function ReadPage() {
  const { id } = useParams();
  const router = useNavigation();
  const { user } = useAuth();
  const [userBooks, setUserBooks] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooksAndFindCurrent = async () => {
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

    loadBooksAndFindCurrent();
  }, [user, id]);

  const allBooks = [
    ...(defaultBooks || []),
    ...(Array.isArray(userBooks) ? userBooks : []),
  ];

  const book = allBooks.find((b) => b.id.toString() === id);

  const createDemoContent = (bookTitle) => {
    return (
      defaultBooksContent[bookTitle] || [
        {
          title: "Capitolul 1: Previzualizare",
          content: `Aceasta este o previzualizare pentru cartea "${bookTitle}". 

În această versiune demo, conținutul complet al cărții nu este disponibil, dar poți vedea cum arăta experiența de lectură.

Cartea originală conține multiple capitole cu povești captivante și personaje memorabile care te vor ține cu sufletul la gură.

Pentru a citi conținutul complet, te rugăm să accesezi versiunea fizică sau digitală a cărții din librăriile partenere.`,
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sky-100">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <p className="text-sky-600">Se încarcă cartea...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-sky-100">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <span className="text-6xl mb-4 block">📚</span>
            <h1 className="text-2xl font-bold text-sky-900 mb-4">
              Cartea nu a fost găsită
            </h1>
            <p className="text-sky-600 mb-6">
              Ne pare rău, dar cartea pe care o cauți nu există în colecția
              noastră.
            </p>
            <button
              onClick={() => router.push("/descopera")}
              className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
            >
              Înapoi la cărți
            </button>
          </div>
        </div>
      </div>
    );
  }

  const chapters = book.chapters || createDemoContent(book.title);

  const isUserBook = (Array.isArray(userBooks) ? userBooks : []).some(
    (userBook) => userBook.id === book.id
  );

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
          <div className="bg-sky-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => router.back()}
                  className="mr-4 p-2 hover:bg-sky-500 rounded-lg transition-colors"
                  title="Înapoi"
                >
                  ←
                </button>
                <div>
                  <h1 className="text-xl font-bold">{book.title}</h1>
                  <p className="text-sky-100">de {book.author}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {isUserBook && (
                  <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                    Cartea ta
                  </span>
                )}
                <span className="px-3 py-1 bg-sky-500 text-white text-sm rounded-full">
                  {book.genre.name}
                </span>
              </div>
            </div>
          </div>

          {chapters.length > 1 && (
            <div className="bg-sky-50 p-4 border-b border-sky-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={() =>
                    setCurrentChapter(Math.max(0, currentChapter - 1))
                  }
                  disabled={currentChapter === 0}
                  className="flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-sky-300 disabled:cursor-not-allowed transition-colors"
                >
                  ← Capitol anterior
                </button>

                <div className="text-center">
                  <p className="text-sky-700 font-medium">
                    Capitol {currentChapter + 1} din {chapters.length}
                  </p>
                  <p className="text-sky-500 text-sm">
                    {chapters[currentChapter]?.title}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setCurrentChapter(
                      Math.min(chapters.length - 1, currentChapter + 1)
                    )
                  }
                  disabled={currentChapter === chapters.length - 1}
                  className="flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-sky-300 disabled:cursor-not-allowed transition-colors"
                >
                  Capitol următor →
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 border-b border-sky-200">
            <h2 className="text-2xl font-bold text-sky-900 mb-2">
              {chapters[currentChapter]?.title}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-sky-600">
              <span>📖 Capitol {currentChapter + 1}</span>
              <span>
                ⏱ ~
                {Math.ceil(
                  chapters[currentChapter]?.content.split(" ").length / 200
                )}{" "}
                min citire
              </span>
              <span>
                📝 {chapters[currentChapter]?.content.split(" ").length} cuvinte
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {chapters[currentChapter]?.content
                .split("\n\n")
                .map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-sky-800 leading-relaxed mb-6 text-justify"
                  >
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>

          <div className="bg-sky-50 p-4 border-t border-sky-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-sky-600">Progres lectură</span>
                  <span className="text-sm text-sky-600">
                    {Math.round(((currentChapter + 1) / chapters.length) * 100)}
                    %
                  </span>
                </div>
                <div className="w-full bg-sky-200 rounded-full h-2">
                  <div
                    className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentChapter + 1) / chapters.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push(`/book/${book.id}`)}
                  className="px-4 py-2 text-sky-600 hover:text-sky-800 hover:bg-sky-100 rounded-lg transition-colors"
                >
                  📋 Detalii carte
                </button>
                <button
                  onClick={() => router.push("/descopera")}
                  className="px-4 py-2 text-sky-600 hover:text-sky-800 hover:bg-sky-100 rounded-lg transition-colors"
                >
                  📚 Alte cărți
                </button>
              </div>
            </div>
          </div>
        </div>

        {!isUserBook && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start">
              <span className="text-2xl mr-3">ℹ️</span>
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">
                  Previzualizare limitată
                </h3>
                <p className="text-amber-700">
                  Aceasta este o previzualizare pentru cartea "{book.title}".
                  Pentru conținutul complet, te rugăm să accesezi versiunea
                  fizică sau digitală a cărții.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
