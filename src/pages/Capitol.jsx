import { useState } from "react";
import Navigation from "../components/Navigation";

export default function CapitolPage() {
  const [chapterData, setChapterData] = useState({
    bookTitle: "",
    chapterNumber: "",
    chapterTitle: "",
    content: "",
  });

  const handleSave = () => {
    console.log("Salvare capitol:", chapterData);
    alert("Capitolul a fost salvat cu succes!");
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-sky-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-3">📄</span>
                <h1 className="text-2xl font-bold">Scrie un capitol</h1>
              </div>

              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-sky-500 hover:bg-sky-400 rounded-lg transition-colors"
              >
                <span className="mr-2">💾</span>
                Salvează capitol
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Informații capitol */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-sky-900 mb-4">
                Informații capitol
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Titlul cărții
                  </label>
                  <input
                    type="text"
                    value={chapterData.bookTitle}
                    onChange={(e) =>
                      setChapterData((prev) => ({
                        ...prev,
                        bookTitle: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="La ce carte aparține acest capitol?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Numărul capitolului
                  </label>
                  <input
                    type="number"
                    value={chapterData.chapterNumber}
                    onChange={(e) =>
                      setChapterData((prev) => ({
                        ...prev,
                        chapterNumber: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="1, 2, 3..."
                    min="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Titlul capitolului
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
                  placeholder="Titlul acestui capitol..."
                />
              </div>
            </div>

            {/* Editor conținut */}
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
                    Scrie conținutul capitolului aici. Poți folosi paragrafe
                    pentru a structura textul.
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
                  placeholder="Era o dată ca niciodată...

Începe să scrii povestea ta aici. Lasă imaginația să curgă liber și creează un capitol captivant care să îi țină pe cititori cu sufletul la gură.

Poți folosi paragrafe pentru a structura textul și a face lectura mai plăcută."
                />
              </div>
            </div>

            {/* Statistici */}
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
          </div>
        </div>
      </div>
          
    </div>
  );
}
