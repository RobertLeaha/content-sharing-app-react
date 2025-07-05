import { useState } from "react";
import Navigation from "../components/Navigation";
import { useNavigation } from "../hooks/useNavigation";
import { saveBook, saveBookLocal } from "../utils/Book-Storage";
import { useAuth } from "../context/Auth-context";

export default function ScrieCartePage() {
  const [bookData, setBookData] = useState({
    title: "",
    description: "",
    genre: "",
    chapters: [{ title: "", content: "" }],
  });
  const [isSaving, setIsSaving] = useState(false);
  const router = useNavigation();
  const { user } = useAuth();

  const addChapter = () => {
    setBookData((prev) => ({
      ...prev,
      chapters: [...prev.chapters, { title: "", content: "" }],
    }));
  };

  const removeChapter = (index) => {
    setBookData((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((_, i) => i !== index),
    }));
  };

  const updateChapter = (index, field, value) => {
    setBookData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((chapter, i) =>
        i === index ? { ...chapter, [field]: value } : chapter
      ),
    }));
  };

  const handleSave = async () => {
    // Validare de bază
    if (!bookData.title.trim()) {
      alert("Te rog să introduci un titlu pentru carte!");
      return;
    }

    if (!bookData.genre) {
      alert("Te rog să selectezi un gen pentru carte!");
      return;
    }

    if (!bookData.description.trim()) {
      alert("Te rog să introduci o descriere pentru carte!");
      return;
    }

    // Verifică dacă există cel puțin un capitol cu conținut
    const hasValidChapter = bookData.chapters.some(
      (chapter) => chapter.title.trim() && chapter.content.trim()
    );

    if (!hasValidChapter) {
      alert("Te rog să completezi cel puțin un capitol cu titlu și conținut!");
      return;
    }

    setIsSaving(true);

    try {
      // Filtrează capitolele goale
      const validChapters = bookData.chapters.filter(
        (chapter) => chapter.title.trim() && chapter.content.trim()
      );

      const bookToSave = {
        ...bookData,
        chapters: validChapters,
      };

      let savedBook;

      if (user) {
        // Utilizator autentificat - salvează în Firestore
        savedBook = await saveBook(bookToSave, user.uid);
        alert("Cartea a fost salvată cu succes în cloud! 🎉");
      } else {
        // Utilizator neautentificat - salvează local
        savedBook = saveBookLocal(bookToSave);
        alert(
          "Cartea a fost salvată local! Pentru a o salva în cloud, te rugăm să te conectezi. 📱"
        );
      }

      if (savedBook) {
        // Resetează formularul
        setBookData({
          title: "",
          description: "",
          genre: "",
          chapters: [{ title: "", content: "" }],
        });

        // Redirectionează către pagina de descoperire după 1 secundă
        setTimeout(() => {
          router.push("/descopera");
        }, 1000);
      } else {
        alert(
          "A apărut o eroare la salvarea cărții. Te rog să încerci din nou."
        );
      }
    } catch (error) {
      console.error("Eroare la salvarea cărții:", error);
      if (error.message.includes("autentificat")) {
        alert("Te rugăm să te conectezi pentru a salva cartea în cloud.");
        router.push("/conectare");
      } else {
        alert(
          "A apărut o eroare la salvarea cărții. Te rog să încerci din nou."
        );
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-sky-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-3">✏</span>
                <h1 className="text-2xl font-bold">Scrie o carte nouă</h1>
              </div>

              <div className="flex items-center space-x-4">
                {!user && (
                  <div className="text-sky-100 text-sm">
                    💡 Conectează-te pentru a salva în cloud
                  </div>
                )}
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center px-4 py-2 bg-sky-500 hover:bg-sky-400 disabled:bg-sky-300 disabled:cursor-not-allowed rounded-lg transition-colors"
                >
                  <span className="mr-2">💾</span>
                  {isSaving
                    ? "Se salvează..."
                    : user
                    ? "Salvează în cloud"
                    : "Salvează local"}
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-sky-900 mb-4">
                Informații generale
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Titlul cărții <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={bookData.title}
                    onChange={(e) =>
                      setBookData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Introdu titlul cărții..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Genul <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={bookData.genre}
                    onChange={(e) =>
                      setBookData((prev) => ({
                        ...prev,
                        genre: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selectează genul</option>
                    <option value="action">Acțiune</option>
                    <option value="adventure">Aventură</option>
                    <option value="drama">Dramă</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="horror">Horror</option>
                    <option value="mystery">Mister</option>
                    <option value="romance">Romantism</option>
                    <option value="sf">Sci-Fi</option>
                    <option value="thriller">Thriller</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Descrierea cărții <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={bookData.description}
                  onChange={(e) =>
                    setBookData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  placeholder="Scrie o descriere captivantă a cărții tale..."
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-sky-900">Capitole</h2>
                <button
                  onClick={addChapter}
                  className="flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                  <span className="mr-2">➕</span>
                  Adaugă capitol
                </button>
              </div>

              <div className="space-y-6">
                {bookData.chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="border border-sky-200 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-sky-800">
                        Capitol {index + 1}
                      </h3>
                      {bookData.chapters.length > 1 && (
                        <button
                          onClick={() => removeChapter(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <span>🗑</span>
                        </button>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-sky-700 mb-2">
                        Titlul capitolului
                      </label>
                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) =>
                          updateChapter(index, "title", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Titlul capitolului..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-sky-700 mb-2">
                        Conținutul capitolului
                      </label>
                      <textarea
                        value={chapter.content}
                        onChange={(e) =>
                          updateChapter(index, "content", e.target.value)
                        }
                        rows={12}
                        className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Scrie conținutul capitolului aici..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-sky-50 rounded-lg">
              <p className="text-sm text-sky-700">
                <span className="text-red-500">*</span> Câmpurile marcate sunt
                obligatorii pentru salvarea cărții.
                {!user && (
                  <span className="block mt-2 text-sky-600">
                    💡 <strong>Tip:</strong> Conectează-te pentru a salva
                    cărțile în cloud și a le accesa de pe orice dispozitiv!
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
