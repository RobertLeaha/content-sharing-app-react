export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  className = "",
  icon = null,
}) {
  const baseClasses =
    "font-semibold rounded-lg transition-colors flex items-center justify-center";

  const variants = {
    primary: "bg-sky-600 text-white hover:bg-sky-700 disabled:bg-sky-400",
    secondary: "bg-white text-sky-600 border-2 border-sky-600 hover:bg-sky-50",
    outline:
      "bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-600",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-400",
    ghost: "text-sky-600 hover:text-sky-800 hover:bg-sky-100",
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3",
    large: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${
    sizes[size]
  } ${className} ${disabled || loading ? "cursor-not-allowed" : ""}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Se încarcă...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
