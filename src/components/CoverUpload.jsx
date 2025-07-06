import { useState, useRef } from "react";
import Button from "./Button";

export default function CoverUpload({
  currentCover = null,
  onCoverChange,
  bookId = null,
  disabled = false,
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentCover);
  const fileInputRef = useRef(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validare fișier
    if (!file.type.startsWith("image/")) {
      alert("Te rog să selectezi doar fișiere imagine!");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      alert("Imaginea este prea mare! Dimensiunea maximă este 5MB.");
      return;
    }

    setIsProcessing(true);

    try {
      // Convertește imaginea în base64
      const base64String = await convertToBase64(file);

      // Setează preview-ul
      setPreviewUrl(base64String);

      // Notifică componenta părinte cu string-ul base64
      if (onCoverChange) {
        onCoverChange(base64String);
      }

      alert("Coperta a fost încărcată cu succes! 🎉");
    } catch (error) {
      console.error("Eroare la procesarea imaginii:", error);
      alert(
        "A apărut o eroare la procesarea imaginii. Te rog să încerci din nou."
      );
      setPreviewUrl(currentCover);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveCover = () => {
    setPreviewUrl(null);
    if (onCoverChange) {
      onCoverChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-sky-700 mb-2">
        Coperta cărții
      </label>

      <div className="flex flex-col items-center space-y-4">
        {/* Preview zona */}
        <div
          className={`relative w-48 h-64 border-2 border-dashed rounded-lg overflow-hidden ${
            disabled
              ? "border-gray-300 bg-gray-50"
              : "border-sky-300 bg-sky-50 hover:border-sky-400 cursor-pointer"
          } transition-colors`}
          onClick={triggerFileInput}
        >
          {previewUrl ? (
            <>
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview copertă"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Eroare la încărcarea imaginii:", e);
                  e.target.src = "/placeholder.svg?height=400&width=300";
                }}
              />
              {!disabled && (
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <div className="text-white opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Schimbă coperta</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-sky-600">
              <div className="text-4xl mb-2">📚</div>
              <p className="text-sm text-center px-4">
                {disabled ? "Fără copertă" : "Click pentru a adăuga o copertă"}
              </p>
              {!disabled && (
                <p className="text-xs text-sky-500 mt-1">
                  JPG, PNG, GIF (max 5MB)
                </p>
              )}
            </div>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto mb-2"></div>
                <p className="text-sm text-sky-600">Se procesează...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input ascuns */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || isProcessing}
        />

        {/* Butoane de control */}
        {!disabled && (
          <div className="flex space-x-2">
            <Button
              onClick={triggerFileInput}
              disabled={isProcessing}
              size="small"
              icon="📁"
            >
              {previewUrl ? "Schimbă" : "Adaugă"} copertă
            </Button>

            {previewUrl && (
              <Button
                onClick={handleRemoveCover}
                disabled={isProcessing}
                variant="danger"
                size="small"
                icon="🗑"
              >
                Șterge
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Sfaturi */}
      {!disabled && (
        <div className="bg-sky-50 rounded-lg p-3">
          <p className="text-xs text-sky-600">
            💡 <strong>Sfaturi:</strong> Folosește o imagine cu aspect ratio 3:4
            (de ex. 300x400px) pentru cel mai bun rezultat. Imaginea va fi
            salvată în format base64.
          </p>
        </div>
      )}
    </div>
  );
}
