import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { getBooks, updateBook } from "../utils/Book-Storage";
import { useNavigation } from "../hooks/useNavigation";

export default function CapitolPage() {
  const [chapterData, setChapterData] = useState({
    bookId: "",
    chapterTitle: "",
    content: "",
  });
  const [userBooks, setUserBooks] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const router = useNavigation();

  useEffect(() => {
    const books = getBooks();
    setUserBooks(books);
  }, []);

  const handleSave = () => {
    // Validare de bază
    if (!chapterData.bookId) {
      alert("Te rog să selectezi o carte!");
      return;
    }

    if (!chapterData.chapterTitle.trim()) {
      alert("Te rog să introduci un titlu pentru capitol!");
      return;
    }

    if (!chapterData.content.trim()) {
      alert("Te rog să scrii conținutul capitolului!");
      return;
    }

    setIsSaving(true);

    try {
      // Găsește cartea selectată
      const selectedBook = userBooks.find(
        (book) => book.id.toString() === chapterData.bookId
      );

      if (!selectedBook) {
        alert("Cartea selectată nu a fost găsită!");
        setIsSaving(false);
        return;
      }

      // Creează noul capitol
      const newChapter = {
        title: chapterData.chapterTitle.trim(),
        content: chapterData.content.trim(),
      };

      // Adaugă capitolul la cartea existentă
      const updatedChapters = [...(selectedBook.chapters || []), newChapter];

      // Actualizează cartea cu noul capitol
      const success = updateBook(selectedBook.id, {
        chapters: updatedChapters,
      });

      if (success) {
        alert(
          `Capitolul "${newChapter.title}" a fost adăugat cu succes la cartea "${selectedBook.title}"! 🎉`
        );

        // Resetează formularul
        setChapterData({
          bookId: "",
          chapterTitle: "",
          content: "",
        });

        // Reîncarcă cărțile pentru a reflecta schimbările
        setUserBooks(getBooks());

        // Redirectionează către pagina cărții după 1 secundă
        setTimeout(() => {
          router.push(`/book/${selectedBook.id}`);
        }, 1000);
      } else {
        alert(
          "A apărut o eroare la salvarea capitolului. Te rog să încerci din nou."
        );
      }
    } catch (error) {
      console.error("Eroare la salvarea capitolului:", error);
      alert(
        "A apărut o eroare la salvarea capitolului. Te rog să încerci din nou."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-sky-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-3">📄</span>
                <h1 className="text-2xl font-bold">Scrie un capitol nou</h1>
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:bg-sky-300 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <span className="mr-2">💾</span>
                {isSaving ? "Se salvează..." : "Salvează capitol"}
              </button>
            </div>
          </div>

          <div className="p-8">
            {userBooks.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📚</span>
                <h2 className="text-2xl font-bold text-sky-900 mb-4">
                  Nu ai încă nicio carte
                </h2>
                <p className="text-sky-600 mb-6">
                  Pentru a scrie un capitol, trebuie să ai cel puțin o carte
                  creată.
                </p>
                <button
                  onClick={() => router.push("/scrie-carte")}
                  className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Scrie prima ta carte
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-sky-900 mb-4">
                    Selectează cartea
                  </h2>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-sky-700 mb-2">
                      Alege cartea la care vrei să adaugi capitolul{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={chapterData.bookId}
                      onChange={(e) =>
                        setChapterData((prev) => ({
                          ...prev,
                          bookId: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      required
                    >
                      <option value="">Selectează o carte...</option>
                      {userBooks.map((book) => (
                        <option key={book.id} value={book.id}>
                          {book.title} ({book.chapters?.length || 0} capitole)
                        </option>
                      ))}
                    </select>
                  </div>

                  {chapterData.bookId && (
                    <div className="bg-sky-50 rounded-lg p-4 mb-6">
                      {(() => {
                        const selectedBook = userBooks.find(
                          (book) => book.id.toString() === chapterData.bookId
                        );
                        return selectedBook ? (
                          <div>
                            <h3 className="font-semibold text-sky-800 mb-2">
                              Cartea selectată: {selectedBook.title}
                            </h3>
                            <p className="text-sky-600 text-sm mb-2">
                              Gen: {selectedBook.genre.name}
                            </p>
                            <p className="text-sky-600 text-sm">
                              Capitole existente:{" "}
                              {selectedBook.chapters?.length || 0}
                            </p>
                            {selectedBook.chapters &&
                              selectedBook.chapters.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-sky-600 text-sm font-medium">
                                    Ultimele capitole:
                                  </p>
                                  <ul className="text-sky-500 text-sm mt-1">
                                    {selectedBook.chapters
                                      .slice(-3)
                                      .map((chapter, index) => (
                                        <li key={index}>• {chapter.title}</li>
                                      ))}
                                  </ul>
                                </div>
                              )}
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-sky-700 mb-2">
                      Titlul capitolului <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={chapterData.chapterTitle}
                      onChange={(e) =>
                        setChapterData((prev) => ({
                          ...prev,
                          chapterTitle: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="Titlul noului capitol..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <span className="mr-2">✏</span>
                    <h2 className="text-xl font-bold text-sky-900">
                      Conținutul capitolului
                    </h2>
                  </div>

                  <div className="border border-sky-200 rounded-lg overflow-hidden">
                    <div className="bg-sky-50 px-4 py-2 border-b border-sky-200">
                      <p className="text-sm text-sky-600">
                        Scrie conținutul noului capitol aici. Poți folosi
                        paragrafe pentru a structura textul.
                      </p>
                    </div>

                    <textarea
                      value={chapterData.content}
                      onChange={(e) =>
                        setChapterData((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                      rows={20}
                      className="w-full px-4 py-4 border-0 focus:ring-0 resize-none"
                      placeholder="Continuarea poveștii tale...

Scrie aici următorul capitol din cartea ta. Lasă imaginația să curgă liber și dezvoltă povestea în direcția dorită.

Poți folosi paragrafe pentru a structura textul și a face lectura mai plăcută."
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 bg-sky-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-sky-600">
                        {chapterData.content.length}
                      </p>
                      <p className="text-sm text-sky-500">Caractere</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-sky-600">
                        {
                          chapterData.content
                            .split(" ")
                            .filter((word) => word.length > 0).length
                        }
                      </p>
                      <p className="text-sm text-sky-500">Cuvinte</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-sky-600">
                        {
                          chapterData.content
                            .split("\n")
                            .filter((line) => line.trim().length > 0).length
                        }
                      </p>
                      <p className="text-sm text-sky-500">Paragrafe</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-sky-600">
                        {Math.ceil(
                          chapterData.content
                            .split(" ")
                            .filter((word) => word.length > 0).length / 200
                        )}
                      </p>
                      <p className="text-sm text-sky-500">Min. citire</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-sky-50 rounded-lg">
                  <p className="text-sm text-sky-700">
                    <span className="text-red-500">*</span> Câmpurile marcate
                    sunt obligatorii pentru salvarea capitolului.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
