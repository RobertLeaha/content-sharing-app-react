export default function EmptyState({
  icon,
  title,
  description,
  buttonText = null,
  onButtonClick = null,
  secondaryButtonText = null,
  onSecondaryButtonClick = null,
}) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-sky-900 mb-4">{title}</h3>
      <p className="text-sky-600 mb-6">{description}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {buttonText && onButtonClick && (
          <button
            onClick={onButtonClick}
            className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
          >
            {buttonText}
          </button>
        )}
        {secondaryButtonText && onSecondaryButtonClick && (
          <button
            onClick={onSecondaryButtonClick}
            className="px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors border-2 border-sky-600"
          >
            {secondaryButtonText}
          </button>
        )}
      </div>
    </div>
  );
}
