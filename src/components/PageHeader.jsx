export default function PageHeader({
  title,
  description = null,
  showBackButton = false,
  onBack = null,
  actions = null,
}) {
  return (
    <div className="mb-8">
      {showBackButton && onBack && (
        <button
          onClick={onBack}
          className="flex items-center text-sky-600 hover:text-sky-800 mb-4 transition-colors"
        >
          <span className="mr-2">←</span>
          Înapoi
        </button>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-sky-900 mb-4">{title}</h1>
          {description && <p className="text-sky-700 text-lg">{description}</p>}
        </div>

        {actions && (
          <div className="flex items-center space-x-4">{actions}</div>
        )}
      </div>
    </div>
  );
}
