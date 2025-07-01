import { useParams } from "react-router-dom";
import { useNavigation } from "../hooks/useNavigation";
import Navigation from "../components/Navigation";
import { defaultBooks } from "../pages/Descopera";

export default function GenresPage() {
  const { slug } = useParams();
  const router = useNavigation();
  const decodedGenre = decodeURIComponent(slug || "");
  const books = defaultBooks.filter(
    (curentBook) => curentBook.genre.slug === decodedGenre
  );
  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-sky-900 mb-4">
            Cărți din genul: {decodedGenre}
          </h1>
          <p className="text-sky-700">
            Descoperă cele mai bune cărți din categoria{" "}
            {decodedGenre.toLowerCase()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
              onClick={() =>
                router.push(`/book/${encodeURIComponent(book.title)}`)
              }
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=300&width=200"
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-sky-900 mb-2">
                  {book.title}
                </h3>

                <p className="text-sky-600 mb-3">de {book.author}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    <span>⭐</span>
                    <span className="ml-1 text-sm font-medium text-sky-700">
                      {book.rating}
                    </span>
                  </div>

                  <div className="flex items-center text-sky-500 text-sm">
                    <span>👁</span>
                    <span>{book.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
         
    </div>
  );
}
