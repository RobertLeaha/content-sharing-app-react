import { useState, useEffect } from "react";
import { rateBook, getUserRating } from "../utils/Book-Storage";
import { useAuth } from "../context/Auth-context";

export default function RatingComponent({
  bookId,
  currentRating,
  ratingCount,
  onRatingUpdate,
}) {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadUserRating = async () => {
      if (user && bookId) {
        try {
          const rating = await getUserRating(bookId, user.uid);
          setUserRating(rating || 0);
        } catch (error) {
          console.error("Eroare la încărcarea rating-ului:", error);
        }
      }
    };

    loadUserRating();
  }, [user, bookId]);

  const handleRating = async (rating) => {
    if (!user) {
      alert("Te rugăm să te conectezi pentru a da rating!");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await rateBook(bookId, rating, user.uid);
      setUserRating(rating);

      // Notifică componenta părinte despre actualizare
      if (onRatingUpdate) {
        onRatingUpdate();
      }

      alert(`Ai dat rating ${rating}/5 acestei cărți! 🌟`);
    } catch (error) {
      console.error("Eroare la rating:", error);
      alert(
        "A apărut o eroare la salvarea rating-ului. Te rog să încerci din nou."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || userRating);
      const isClickable = user && !isSubmitting;

      stars.push(
        <button
          key={i}
          onClick={() => isClickable && handleRating(i)}
          onMouseEnter={() => isClickable && setHoveredRating(i)}
          onMouseLeave={() => isClickable && setHoveredRating(0)}
          disabled={!isClickable}
          className={`text-2xl transition-all duration-200 ${
            isClickable ? "hover:scale-110 cursor-pointer" : "cursor-default"
          } ${isFilled ? "text-yellow-400" : "text-gray-300"}`}
          title={isClickable ? `Dă rating ${i}/5` : `Rating: ${i}/5`}
        >
          ⭐
        </button>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-sky-200">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-sky-900 mb-2">
          {user ? "Evaluează această carte" : "Rating-ul cărții"}
        </h3>

        {/* Stele pentru rating */}
        <div className="flex justify-center space-x-1 mb-3">
          {renderStars()}
        </div>

        {/* Informații rating */}
        <div className="text-sm text-sky-600 space-y-1">
          <div>
            <span className="font-medium">Rating mediu: </span>
            <span className="text-yellow-600 font-bold">
              {currentRating > 0 ? `${currentRating}/5` : "Fără rating"}
            </span>
          </div>

          <div>
            <span className="font-medium">
              {ratingCount || 0}{" "}
              {(ratingCount || 0) === 1 ? "evaluare" : "evaluări"}
            </span>
          </div>

          {userRating > 0 && (
            <div className="text-green-600 font-medium">
              Tu ai dat: {userRating}/5 ⭐
            </div>
          )}

          {!user && (
            <div className="text-amber-600 text-xs mt-2">
              Conectează-te pentru a evalua această carte
            </div>
          )}
        </div>

        {isSubmitting && (
          <div className="mt-2 text-sky-600 text-sm">
            Se salvează rating-ul...
          </div>
        )}
      </div>
    </div>
  );
}
