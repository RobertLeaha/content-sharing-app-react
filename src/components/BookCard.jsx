export default function BookCard({
  book,
  onClick,
  showViews = false,
  showDeleteButton = false,
  onDelete = null,
  isUserBook = false,
  user = null,
}) {
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(book.id, e);
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden relative"
      onClick={onClick}
    >
      {isUserBook && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
          {user ? "☁️ Cloud" : "📱 Local"}
        </div>
      )}

      {showDeleteButton && isUserBook && (
        <button
          onClick={handleDeleteClick}
          className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors z-10"
          title="Șterge cartea"
        >
          ✕
        </button>
      )}

      <div className="aspect-[3/4] bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center">
        <img
          src={book.cover || "/placeholder.svg"}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 bg-sky-100 text-sky-700 text-xs rounded-full">
            {book.genre.name}
          </span>
          <div className="flex items-center text-yellow-500">
            <span>⭐</span>
            <span className="ml-1 text-xs font-medium text-sky-700">
              {book.rating > 0 ? book.rating : "N/A"}
            </span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-sky-900 mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sky-600 text-xs mb-2">de {book.author}</p>

        {book.description && (
          <p className="text-sky-700 text-xs mb-2 line-clamp-2">
            {book.description}
          </p>
        )}

        <div className="flex items-center justify-between text-sky-500 text-xs">
          {showViews && (
            <div className="flex items-center">
              <span>👁</span>
              <span className="ml-1">{(book.views || 0).toLocaleString()}</span>
            </div>
          )}

          <div className="flex items-center">
            <span>📅</span>
            <span className="ml-1">
              {new Date(book.publishDate).toLocaleDateString("ro-RO")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
