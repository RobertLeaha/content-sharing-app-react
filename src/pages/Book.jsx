import { useParams } from "react-router-dom";
import { useNavigation } from "../hooks/useNavigation";
import Navigation from "../components/Navigation";

const bookDetails = {
  "În numele trandafirului": {
    title: "În numele trandafirului",
    author: "Umberto Eco",
    rating: 4.8,
    views: 15420,
    genre: "Mister",
    pages: 512,
    publishYear: 1980,
    description:
      "O capodoperă a literaturii contemporane care îmbină misterul cu filosofia medievală. Povestea se desfășoară într-o mănăstire din secolul al XIV-lea, unde fratele William de Baskerville investighează o serie de crime misterioase.",
    fullDescription:
      "Romanul lui Umberto Eco este o operă complexă care combină elementele unui roman polițist cu o profundă reflecție filosofică și teologică. Acțiunea se petrece în 1327, într-o mănăstire benedictină din nordul Italiei, unde au loc negocieri importante între reprezentanții papei și ai împăratului. În acest context tensionat, o serie de crime misterioase zguduie comunitatea monastică.",
  },
};

export default function BookPage() {
  const { title } = useParams();
  const router = useNavigation();
  const decodedTitle = decodeURIComponent(title);
  const book = bookDetails[decodedTitle];

  if (!book) {
    return (
      <div className="min-h-screen bg-sky-100">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-sky-900">
            Cartea nu a fost găsită
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sky-600 hover:text-sky-800 mb-8 transition-colors"
        >
          <span className="mr-2">←</span>
          Înapoi
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-8">
              <div className="aspect-[3/4] bg-gradient-to-br from-sky-200 to-blue-300 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=300"
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-2/3 p-8">
              <div className="mb-4">
                <span className="px-3 py-1 bg-sky-100 text-sky-700 text-sm rounded-full">
                  {book.genre}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-sky-900 mb-4">
                {book.title}
              </h1>

              <p className="text-xl text-sky-600 mb-6">de {book.author}</p>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center text-yellow-500">
                  <span>⭐</span>
                  <span className="ml-2 text-lg font-medium text-sky-700">
                    {book.rating}
                  </span>
                </div>

                <div className="flex items-center text-sky-500">
                  <span>👁</span>
                  <span className="ml-2">
                    {book.views.toLocaleString()} cititori
                  </span>
                </div>

                <div className="flex items-center text-sky-500">
                  <span>⏰</span>
                  <span className="ml-2">{book.pages} pagini</span>
                </div>

                <div className="flex items-center text-sky-500">
                  <span>📅</span>
                  <span className="ml-2">{book.publishYear}</span>
                </div>
              </div>

              <p className="text-sky-700 mb-6 leading-relaxed">
                {book.description}
              </p>

              <p className="text-sky-600 mb-8 leading-relaxed">
                {book.fullDescription}
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-sky-200 text-sky-700 font-semibold rounded-lg hover:bg-sky-300 transition-colors"
                >
                  Înapoi
                </button>

                <button
                  onClick={() =>
                    router.push(`/read/${encodeURIComponent(book.title)}`)
                  }
                  className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Citește
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
          
    </div>
  );
}
