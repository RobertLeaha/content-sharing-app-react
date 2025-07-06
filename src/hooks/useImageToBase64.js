import { useState } from "react";

export const useImageToBase64 = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState("");

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const convertImageToBase64 = async (file, options = {}) => {
    const {
      maxFileSize = 5 * 1024 * 1024, // 5MB default
      acceptedFormats = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ],
    } = options;

    setError("");
    setIsConverting(true);

    try {
      // Validări
      if (!acceptedFormats.includes(file.type)) {
        throw new Error(`Formatul ${file.type} nu este acceptat`);
      }

      if (file.size > maxFileSize) {
        throw new Error(
          `Fișierul este prea mare! Dimensiunea maximă este ${Math.round(
            maxFileSize / 1024 / 1024
          )}MB`
        );
      }

      // Convertește în base64
      const base64String = await convertToBase64(file);

      setIsConverting(false);

      return {
        success: true,
        base64: base64String,
        file: file,
        preview: URL.createObjectURL(file),
        info: {
          name: file.name,
          size: file.size,
          type: file.type,
          sizeFormatted: formatFileSize(file.size),
        },
      };
    } catch (err) {
      setError(err.message);
      setIsConverting(false);
      return {
        success: false,
        error: err.message,
      };
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return {
    convertImageToBase64,
    isConverting,
    error,
    formatFileSize,
  };
};
