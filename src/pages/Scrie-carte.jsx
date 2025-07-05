import { useState } from "react";
import Navigation from "../components/Navigation";
import PageHeader from "../components/PageHeader";
import FormField from "../components/FormField";
import Button from "../components/Button";
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
      };

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
        setBookData({
          title: "",
          description: "",
          genre: "",
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
              <h2 className="text-xl font-bold text-sky-900 mb-4">
                Informații generale
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Titlul cărții"
                  value={bookData.title}
                  onChange={handleInputChange("title")}
                  placeholder="Introdu titlul cărții..."
                  required
                />

                <FormField
                  label="Genul"
                  type="select"
                  value={bookData.genre}
                  onChange={handleInputChange("genre")}
                  options={genreOptions}
                  required
                />
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
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-sky-900">Capitole</h2>
                <Button onClick={addChapter} icon="➕">
                  Adaugă capitol
                </Button>
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
                        <Button
                          variant="danger"
                          size="small"
                          onClick={() => removeChapter(index)}
                          icon="🗑"
                        >
                          Șterge
                        </Button>
                      )}
                    </div>

                    <div className="mb-4">
                      <FormField
                        label="Titlul capitolului"
                        value={chapter.title}
                        onChange={(e) =>
                          updateChapter(index, "title", e.target.value)
                        }
                        placeholder="Titlul capitolului..."
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
