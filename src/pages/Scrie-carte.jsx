import { useState } from "react";
import Navigation from "../components/Navigation";
import PageHeader from "../components/PageHeader";
import FormField from "../components/FormField";
import Button from "../components/Button";
import CoverUpload from "../components/CoverUpload";
import ChapterColorPicker from "../components/ChapterColorPicker";
import { useNavigation } from "../hooks/useNavigation";
import { saveBook, saveBookLocal } from "../utils/Book-Storage";
import { useAuth } from "../context/Auth-context";

export default function ScrieCartePage() {
  const [bookData, setBookData] = useState({
    title: "",
    description: "",
    genre: "",
    cover: null, // Va stoca string-ul base64
    chapterBackgroundColor: "bg-white",
    chapters: [{ title: "", content: "" }],
  });
  const [isSaving, setIsSaving] = useState(false);
  const router = useNavigation();
  const { user } = useAuth();

  const genreOptions = [
    { value: "", label: "Selectează genul" },
    { value: "action", label: "Acțiune" },
    { value: "adventure", label: "Aventură" },
    { value: "drama", label: "Dramă" },
    { value: "fantasy", label: "Fantasy" },
    { value: "horror", label: "Horror" },
    { value: "mystery", label: "Mister" },
    { value: "romance", label: "Romantism" },
    { value: "sf", label: "Sci-Fi" },
    { value: "thriller", label: "Thriller" },
  ];

  const handleInputChange = (field) => (e) => {
    setBookData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCoverChange = (base64String) => {
    console.log(
      "📸 Copertă actualizată:",
      base64String ? "Base64 primit" : "Copertă ștearsă"
    );
    setBookData((prev) => ({ ...prev, cover: base64String }));
  };

  const handleColorChange = (color) => {
    setBookData((prev) => ({ ...prev, chapterBackgroundColor: color }));
  };

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
    // Validări
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

    const hasValidChapter = bookData.chapters.some(
      (chapter) => chapter.title.trim() && chapter.content.trim()
    );

    if (!hasValidChapter) {
      alert("Te rog să completezi cel puțin un capitol cu titlu și conținut!");
      return;
    }

    setIsSaving(true);

    try {
      const validChapters = bookData.chapters.filter(
        (chapter) => chapter.title.trim() && chapter.content.trim()
      );

      const bookToSave = {
        ...bookData,
        chapters: validChapters,
        // Folosește coperta base64 dacă există, altfel placeholder
        cover: bookData.cover || "/placeholder.svg?height=400&width=300",
      };

      console.log("💾 Salvez cartea:", {
        title: bookToSave.title,
        genre: bookToSave.genre,
        chaptersCount: bookToSave.chapters.length,
        hasCover:
          !!bookToSave.cover &&
          bookToSave.cover !== "/placeholder.svg?height=400&width=300",
        coverType: bookToSave.cover?.startsWith("data:image/")
          ? "base64"
          : "placeholder",
      });

      let savedBook;

      if (user) {
        savedBook = await saveBook(bookToSave, user.uid);
        alert("Cartea a fost salvată cu succes în cloud! 🎉");
      } else {
        savedBook = saveBookLocal(bookToSave);
        alert(
          "Cartea a fost salvată local! Pentru a o salva în cloud, te rugăm să te conectezi. 📱"
        );
      }

      if (savedBook) {
        console.log("✅ Carte salvată cu succes:", savedBook.id);

        // Resetează formularul
        setBookData({
          title: "",
          description: "",
          genre: "",
          cover: null,
          chapterBackgroundColor: "bg-white",
          chapters: [{ title: "", content: "" }],
        });

        setTimeout(() => {
          router.push("/descopera");
        }, 1000);
      } else {
        alert(
          "A apărut o eroare la salvarea cărții. Te rog să încerci din nou."
        );
      }
    } catch (error) {
      console.error("❌ Eroare la salvarea cărții:", error);
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

  const headerActions = (
    <>
      {!user && (
        <div className="text-sky-100 text-sm">
          💡 Conectează-te pentru a salva în cloud
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

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-sky-600 text-white p-6">
            <PageHeader title="Scrie o carte nouă" actions={headerActions} />
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-sky-900 mb-6">
                Informații generale
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Coloana 1: Copertă */}
                <div>
                  <CoverUpload
                    currentCover={bookData.cover}
                    onCoverChange={handleCoverChange}
                    bookId={`temp_${Date.now()}`}
                    disabled={isSaving}
                    maxFileSize={10 * 1024 * 1024} // 10MB pentru această pagină
                  />
                </div>

                {/* Coloana 2: Informații de bază */}
                <div className="space-y-6">
                  <FormField
                    label="Titlul cărții"
                    value={bookData.title}
                    onChange={handleInputChange("title")}
                    placeholder="Introdu titlul cărții..."
                    required
                    disabled={isSaving}
                  />

                  <FormField
                    label="Genul"
                    type="select"
                    value={bookData.genre}
                    onChange={handleInputChange("genre")}
                    options={genreOptions}
                    required
                    disabled={isSaving}
                  />
                </div>

                {/* Coloana 3: Personalizare */}
                <div>
                  <ChapterColorPicker
                    currentColor={bookData.chapterBackgroundColor}
                    onColorChange={handleColorChange}
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="mt-6">
                <FormField
                  label="Descrierea cărții"
                  type="textarea"
                  value={bookData.description}
                  onChange={handleInputChange("description")}
                  placeholder="Scrie o descriere captivantă a cărții tale..."
                  rows={4}
                  required
                  disabled={isSaving}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-sky-900">Capitole</h2>
                <Button onClick={addChapter} icon="➕" disabled={isSaving}>
                  Adaugă capitol
                </Button>
              </div>

              <div className="space-y-6">
                {bookData.chapters.map((chapter, index) => (
                  <div
                    key={index}
                    className="border border-sky-200 rounded-lg overflow-hidden"
                  >
                    <div className="bg-sky-50 px-6 py-4 border-b border-sky-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-sky-800">
                          Capitol {index + 1}
                        </h3>
                        {bookData.chapters.length > 1 && (
                          <Button
                            variant="danger"
                            size="small"
                            onClick={() => removeChapter(index)}
                            icon="🗑"
                            disabled={isSaving}
                          >
                            Șterge
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <FormField
                          label="Titlul capitolului"
                          value={chapter.title}
                          onChange={(e) =>
                            updateChapter(index, "title", e.target.value)
                          }
                          placeholder="Titlul capitolului..."
                          disabled={isSaving}
                        />
                      </div>

                      <div>
                        <FormField
                          label="Conținutul capitolului"
                          type="textarea"
                          value={chapter.content}
                          onChange={(e) =>
                            updateChapter(index, "content", e.target.value)
                          }
                          placeholder="Scrie conținutul capitolului aici..."
                          rows={12}
                          disabled={isSaving}
                        />
                      </div>

                      {/* Preview cu culoarea selectată */}
                      {chapter.content && (
                        <div className="mt-4">
                          <p className="text-sm text-sky-600 mb-2">
                            Preview cu culoarea selectată:
                          </p>
                          <div
                            className={`${bookData.chapterBackgroundColor} border border-sky-200 rounded-lg p-4`}
                          >
                            <p className="text-sky-800 text-sm">
                              {chapter.content.substring(0, 200)}
                              {chapter.content.length > 200 ? "..." : ""}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Informații despre salvare */}
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

              {/* Status copertă */}
              <div className="mt-3 pt-3 border-t border-sky-200">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-sky-600">📸 Copertă:</span>
                  {bookData.cover ? (
                    <span className="text-green-600 font-medium">
                      ✅ Încărcată (Base64)
                    </span>
                  ) : (
                    <span className="text-amber-600">
                      ⚠️ Folosește placeholder
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
