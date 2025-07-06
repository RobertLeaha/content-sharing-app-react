import { useState, useRef } from "react";
import Button from "./Button";

export default function CoverUpload({
  currentCover = null,
  onCoverChange,
  bookId = null,
  disabled = false,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentCover);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const compressImage = (
    file,
    maxWidth = 400,
    maxHeight = 600,
    quality = 0.8
  ) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Calculează dimensiunile noi păstrând aspect ratio
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Desenează imaginea redimensionată
        ctx.drawImage(img, 0, 0, width, height);

        // Convertește în blob
        canvas.toBlob(resolve, "image/jpeg", quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError("");
    setIsProcessing(true);

    try {
      // Validare fișier
      if (!file.type.startsWith("image/")) {
        throw new Error("Te rog să selectezi doar fișiere imagine!");
      }

      if (file.size > maxFileSize) {
        throw new Error(
          `Imaginea este prea mare! Dimensiunea maximă este ${Math.round(
            maxFileSize / 1024 / 1024
          )}MB.`
        );
      }

      console.log("📸 Procesez imaginea:", {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        type: file.type,
      });

      // Comprimă imaginea pentru a reduce dimensiunea
      const compressedFile = await compressImage(file);
      console.log("🗜️ Imagine comprimată:", {
        originalSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        compressedSize: `${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
      });

      // Convertește în base64
      const base64String = await convertToBase64(compressedFile);
      console.log("✅ Conversie base64 completă:", {
        length: base64String.length,
        preview: base64String.substring(0, 50) + "...",
      });

      // Setează preview-ul
      setPreviewUrl(base64String);

      // Notifică componenta părinte cu string-ul base64
      if (onCoverChange) {
        onCoverChange(base64String);
      }

      console.log("🎉 Copertă încărcată cu succes!");
    } catch (error) {
      console.error("❌ Eroare la procesarea imaginii:", error);
      setError(error.message || "A apărut o eroare la procesarea imaginii.");
      setPreviewUrl(currentCover);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveCover = () => {
    setPreviewUrl(null);
    setError("");
    if (onCoverChange) {
      onCoverChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (!disabled && !isProcessing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled || isProcessing) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Simulează selecția fișierului
      const event = { target: { files: [files[0]] } };
      handleFileSelect(event);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-sky-700 mb-2">
        Coperta cărții
      </label>

      <div className="flex flex-col items-center space-y-4">
        {/* Preview zona cu drag & drop */}
        <div
          className={`relative w-48 h-64 border-2 border-dashed rounded-lg overflow-hidden transition-all duration-200 ${
            disabled || isProcessing
              ? "border-gray-300 bg-gray-50 cursor-not-allowed"
              : "border-sky-300 bg-sky-50 hover:border-sky-400 hover:bg-sky-100 cursor-pointer"
          }`}
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <>
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Preview copertă"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error("Eroare la încărcarea preview-ului:", e);
                  setError("Eroare la afișarea imaginii");
                }}
              />
              {!disabled && !isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <div className="text-white opacity-0 hover:opacity-100 transition-opacity text-center">
                    <div className="text-2xl mb-1">🔄</div>
                    <span className="text-sm font-medium">Schimbă coperta</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-sky-600 p-4">
              <div className="text-4xl mb-3">📚</div>
              <p className="text-sm text-center font-medium mb-1">
                {disabled ? "Fără copertă" : "Click sau drag & drop"}
              </p>
              {!disabled && (
                <>
                  <p className="text-xs text-sky-500 text-center mb-2">
                    pentru a adăuga o copertă
                  </p>
                  <p className="text-xs text-sky-400 text-center">
                    JPG, PNG, GIF (max {Math.round(maxFileSize / 1024 / 1024)}
                    MB)
                  </p>
                </>
              )}
            </div>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600 mx-auto mb-3"></div>
                <p className="text-sm text-sky-600 font-medium">
                  Se procesează...
                </p>
                <p className="text-xs text-sky-500 mt-1">
                  Convertesc în base64
                </p>
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

        {/* Eroare */}
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">❌ {error}</p>
          </div>
        )}

        {/* Butoane de control */}
        {!disabled && (
          <div className="flex space-x-2">
            <Button
              onClick={triggerFileInput}
              disabled={isProcessing}
              size="small"
              icon="📁"
              variant="secondary"
            >
              {previewUrl ? "Schimbă" : "Selectează"} copertă
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

      {/* Informații și sfaturi */}
      {!disabled && (
        <div className="bg-sky-50 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <span className="text-sky-600 mt-0.5">💡</span>
            <div className="text-xs text-sky-600">
              <p className="font-medium mb-1">
                Sfaturi pentru cea mai bună calitate:
              </p>
              <ul className="space-y-1">
                <li>• Folosește imagini cu aspect ratio 3:4 (ex: 300x400px)</li>
                <li>• Imaginea va fi comprimată automat pentru performanță</li>
                <li>• Formatul recomandat: JPG sau PNG</li>
                <li>• Imaginea se salvează în format base64</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Debug info - doar în development */}
      {process.env.NODE_ENV === "development" && previewUrl && (
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600">
            <strong>Debug:</strong> Base64 length:{" "}
            {previewUrl.length.toLocaleString()} caractere
          </p>
        </div>
      )}
    </div>
  );
}
