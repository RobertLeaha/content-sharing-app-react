import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import PageHeader from "../components/PageHeader";
import FormField from "../components/FormField";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import {
  getBooks,
  updateBook,
  getBooksLocal,
  updateBookLocal,
} from "../utils/Book-Storage";
import { useNavigation } from "../hooks/useNavigation";
import { useAuth } from "../context/Auth-context";

export default function CapitolPage() {
  const [chapterData, setChapterData] = useState({
    bookId: "",
    chapterTitle: "",
    content: "",
  });
  const [userBooks, setUserBooks] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useNavigation();
  const { user } = useAuth();

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
        setUserBooks(books);
      } catch (error) {
        console.error("Eroare la încărcarea cărților:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, [user]);

  const handleInputChange = (field) => (e) => {
    setChapterData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
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
      const selectedBook = userBooks.find(
        (book) => book.id.toString() === chapterData.bookId
      );

      if (!selectedBook) {
        alert("Cartea selectată nu a fost găsită!");
        setIsSaving(false);
        return;
      }

      const newChapter = {
        title: chapterData.chapterTitle.trim(),
        content: chapterData.content.trim(),
      };

      const updatedChapters = [...(selectedBook.chapters || []), newChapter];

      let success = false;

      if (user) {
        success = await updateBook(
          selectedBook.id,
          { chapters: updatedChapters },
          user.uid
        );
      } else {
        success = updateBookLocal(selectedBook.id, {
          chapters: updatedChapters,
        });
      }

      if (success) {
        alert(
          `Capitolul "${newChapter.title}" a fost adăugat cu succes la cartea "${selectedBook.title}"! 🎉`
        );

        setChapterData({
          bookId: "",
          chapterTitle: "",
          content: "",
        });

        if (user) {
          const updatedBooks = await getBooks(user.uid);
          setUserBooks(updatedBooks);
        } else {
          setUserBooks(getBooksLocal());
        }

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
      if (error.message.includes("autentificat")) {
        alert("Te rugăm să te conectezi pentru a salva capitolul în cloud.");
        router.push("/conectare");
      } else {
        alert(
          "A apărut o eroare la salvarea capitolului. Te rog să încerci din nou."
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  const bookOptions = [
    { value: "", label: "Selectează o carte..." },
    ...userBooks.map((book) => ({
      value: book.id,
      label: `${book.title} (${book.chapters?.length || 0} capitole)`,
    })),
  ];

  const selectedBook = userBooks.find(
    (book) => book.id.toString() === chapterData.bookId
  );

  const headerActions = (
    <>
      {!user && (
        <div className="text-sky-100 text-sm">
          💡 Conectează-te pentru cloud sync
        </div>
      )}
      <Button
        onClick={handleSave}
        loading={isSaving}
        disabled={isSaving}
        icon="💾"
        className="bg-sky-500 hover:bg-sky-400"
      >
        {user ? "Salvează în cloud" : "Salvează local"}
      </Button>
    </>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sky-100">
        <Navigation />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <LoadingSpinner message="Se încarcă cărțile tale..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-sky-600 text-white p-6">
            <PageHeader title="Scrie un capitol nou" actions={headerActions} />
          </div>

          <div className="p-8">
            {userBooks.length === 0 ? (
              <EmptyState
                icon="📚"
                title="Nu ai încă nicio carte"
                description="Pentru a scrie un capitol, trebuie să ai cel puțin o carte creată."
                buttonText="Scrie prima ta carte"
                onButtonClick={() => router.push("/scrie-carte")}
              />
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-sky-900 mb-4">
                    Selectează cartea
                  </h2>

                  <div className="mb-6">
                    <FormField
                      label="Alege cartea la care vrei să adaugi capitolul"
                      type="select"
                      value={chapterData.bookId}
                      onChange={handleInputChange("bookId")}
                      options={bookOptions}
                      required
                    />
                  </div>

                  {selectedBook && (
                    <div className="bg-sky-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-sky-800 mb-2">
                        Cartea selectată: {selectedBook.title}
                      </h3>
                      <p className="text-sky-600 text-sm mb-2">
                        Gen: {selectedBook.genre.name}
                      </p>
                      <p className="text-sky-600 text-sm">
                        Capitole existente: {selectedBook.chapters?.length || 0}
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
                  )}

                  <FormField
                    label="Titlul capitolului"
                    value={chapterData.chapterTitle}
                    onChange={handleInputChange("chapterTitle")}
                    placeholder="Titlul noului capitol..."
                    required
                  />
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

                    <FormField
                      type="textarea"
                      value={chapterData.content}
                      onChange={handleInputChange("content")}
                      placeholder={`Continuarea poveștii tale...

Scrie aici următorul capitol din cartea ta. Lasă imaginația să curgă liber și dezvoltă povestea în direcția dorită.

Poți folosi paragrafe pentru a structura textul și a face lectura mai plăcută.`}
                      rows={20}
                      className="border-0 focus:ring-0 resize-none"
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
                    {!user && (
                      <span className="block mt-2 text-sky-600">
                        💡 <strong>Tip:</strong> Conectează-te pentru a salva
                        capitolele în cloud și a le sincroniza pe toate
                        dispozitivele!
                      </span>
                    )}
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
