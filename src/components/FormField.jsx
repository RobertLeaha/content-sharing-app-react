export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  error = null,
  disabled = false,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword = null,
  options = null, // Pentru select
  rows = null, // Pentru textarea
  className = "",
}) {
  const baseInputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
    error ? "border-red-300 bg-red-50" : "border-sky-300"
  } ${className}`;

  const renderInput = () => {
    if (type === "select" && options) {
      return (
        <select
          value={value}
          onChange={onChange}
          className={baseInputClasses}
          required={required}
          disabled={disabled}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === "textarea") {
      return (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows || 4}
          className={`${baseInputClasses} resize-none`}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      );
    }

    return (
      <div className="relative">
        <input
          type={
            showPasswordToggle ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={onChange}
          className={
            showPasswordToggle ? `${baseInputClasses} pr-12` : baseInputClasses
          }
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400 hover:text-sky-600"
            disabled={disabled}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-sky-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
