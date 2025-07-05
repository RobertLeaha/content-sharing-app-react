import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigation } from "../hooks/useNavigation";
import Navigation from "../components/Navigation";
import RatingComponent from "../components/RatingComponent";
import { getBookById, incrementBookViews } from "../utils/Book-Storage";
import { useAuth } from "../context/Auth-context";

export default function ReadPage() {
  const { id } = useParams();
  const router = useNavigation();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasIncrementedViews, setHasIncrementedViews] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      setIsLoading(true);
      try {
        const bookData = await getBookById(id);
        setBook(bookData);

        // Incrementează vizualizările doar o dată per sesiune
        if (bookData && !hasIncrementedViews) {
          await incrementBookViews(id);
          setHasIncrementedViews(true);
        }
      } catch (error) {
        console.error("Eroare la încărcarea cărții:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadBook();
    }
  }, [id, hasIncrementedViews]);

  const handleRatingUpdate = async () => {
    // Reîncarcă cartea pentru a obține rating-ul actualizat
    try {
      const updatedBook = await getBookById(id);
      setBook(updatedBook);
    } catch (error) {
      console.error("Eroare la actualizarea rating-ului:", error);
    }
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

  const chapters = book.chapters || [];
  const isUserBook = user && book.userId === user.uid;

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
                <div className="flex items-center text-sky-100">
                  <span>👁</span>
                  <span className="ml-1 text-sm">{book.views || 0}</span>
                </div>
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

        {/* Conținutul capitolului */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 border-b border-sky-200">
            <h2 className="text-2xl font-bold text-sky-900 mb-2">
              {chapters[currentChapter]?.title || "Conținut"}
            </h2>
            <div className="flex items-center space-x-4 text-sm text-sky-600">
              <span>📖 Capitol {currentChapter + 1}</span>
              <span>
                ⏱ ~
                {Math.ceil(
                  (chapters[currentChapter]?.content?.split(" ").length || 0) /
                    200
                )}{" "}
                min citire
              </span>
              <span>
                📝 {chapters[currentChapter]?.content?.split(" ").length || 0}{" "}
                cuvinte
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {chapters[currentChapter]?.content ? (
                chapters[currentChapter].content
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sky-800 leading-relaxed mb-6 text-justify"
                    >
                      {paragraph}
                    </p>
                  ))
              ) : (
                <p className="text-sky-600 text-center py-8">
                  Această carte nu are încă conținut disponibil.
                </p>
              )}
            </div>
          </div>

          <div className="bg-sky-50 p-4 border-t border-sky-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-sky-600">Progres lectură</span>
                  <span className="text-sm text-sky-600">
                    {chapters.length > 0
                      ? Math.round(
                          ((currentChapter + 1) / chapters.length) * 100
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-sky-200 rounded-full h-2">
                  <div
                    className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        chapters.length > 0
                          ? ((currentChapter + 1) / chapters.length) * 100
                          : 0
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

        {/* Componenta de rating */}
        <RatingComponent
          bookId={book.id}
          currentRating={book.rating}
          ratingCount={book.ratingCount}
          onRatingUpdate={handleRatingUpdate}
        />
      </div>
    </div>
  );
}
