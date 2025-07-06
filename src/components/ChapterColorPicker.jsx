import { useState } from "react";
import Button from "./Button";

const predefinedColors = [
  { name: "Alb clasic", value: "bg-white", preview: "#ffffff" },
  { name: "Crem", value: "bg-amber-50", preview: "#fffbeb" },
  { name: "Albastru deschis", value: "bg-sky-50", preview: "#f0f9ff" },
  { name: "Verde deschis", value: "bg-green-50", preview: "#f0fdf4" },
  { name: "Roz deschis", value: "bg-pink-50", preview: "#fdf2f8" },
  { name: "Violet deschis", value: "bg-purple-50", preview: "#faf5ff" },
  { name: "Gri deschis", value: "bg-gray-50", preview: "#f9fafb" },
  { name: "Sepia", value: "bg-yellow-50", preview: "#fefce8" },
];

export default function ChapterColorPicker({
  currentColor = "bg-white",
  onColorChange,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(currentColor);

  const handleColorSelect = (colorValue) => {
    setSelectedColor(colorValue);
    if (onColorChange) {
      onColorChange(colorValue);
    }
    setIsOpen(false);
  };

  const getCurrentColorName = () => {
    const color = predefinedColors.find((c) => c.value === selectedColor);
    return color ? color.name : "Personalizat";
  };

  const getCurrentColorPreview = () => {
    const color = predefinedColors.find((c) => c.value === selectedColor);
    return color ? color.preview : "#ffffff";
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-sky-700">
        Culoarea de fundal pentru capitole
      </label>

      <div className="relative">
        <Button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          variant="secondary"
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-6 h-6 rounded border-2 border-gray-300"
              style={{ backgroundColor: getCurrentColorPreview() }}
            ></div>
            <span>{getCurrentColorName()}</span>
          </div>
          <span
            className={`transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </Button>

        {isOpen && !disabled && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-sky-200 z-50 p-4">
            <div className="grid grid-cols-2 gap-3">
              {predefinedColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorSelect(color.value)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedColor === color.value
                      ? "border-sky-500 bg-sky-50"
                      : "border-gray-200 hover:border-sky-300"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded border-2 border-gray-300 flex-shrink-0"
                    style={{ backgroundColor: color.preview }}
                  ></div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-sky-900">
                      {color.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-sky-200">
              <p className="text-xs text-sky-600 text-center">
                💡 Culoarea se va aplica la toate capitolele din această carte
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      <div className="mt-3">
        <p className="text-xs text-sky-600 mb-2">Preview:</p>
        <div
          className={`${selectedColor} border border-sky-200 rounded-lg p-4`}
        >
          <p className="text-sky-800 text-sm">
            Acesta este un exemplu de text care va apărea pe fundalul selectat.
            Capitolele tale vor avea această culoare de fundal pentru o
            experiență de lectură mai plăcută.
          </p>
        </div>
      </div>
    </div>
  );
}
