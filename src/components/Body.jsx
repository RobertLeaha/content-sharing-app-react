import { useNavigation } from "../hooks/useNavigation";

const topBooks = [
  {
    id: "default-1",
    title: "În numele trandafirului",
    author: "Umberto Eco",
    rating: 4.8,
    views: 15420,
    genre: "Mister",
    cover: "/placeholder.svg?height=300&width=200",
    description:
      "O capodoperă a literaturii contemporane care îmbină misterul cu filosofia medievală.",
  },
  {
    id: "default-2",
    title: "Maitreyi",
    author: "Mircea Eliade",
    rating: 4.6,
    views: 12350,
    genre: "Romantism",
    cover: "/placeholder.svg?height=300&width=200",
    description:
      "O poveste de dragoste transcendentală inspirată din experiența autorului în India.",
  },
  {
    id: "default-3",
    title: "Ion",
    author: "Liviu Rebreanu",
    rating: 4.4,
    views: 9870,
    genre: "Dramă",
    cover: "/placeholder.svg?height=300&width=200",
    description:
      "Romanul pământului și al patimilor umane din literatura română clasică.",
  },
];

export default function Body() {
  const router = useNavigation();

  return (
    <div className="bg-sky-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-sky-900 mb-4">
            Cele mai citite cărți
          </h2>
          <p className="text-sky-700 text-lg">
            Descoperă cărțile preferate ale comunității noastre
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
              onClick={() => router.push(`/read/${book.id}`)}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-sky-100 text-sky-700 text-sm rounded-full">
                    {book.genre}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <span>⭐</span>
                    <span className="ml-1 text-sm font-medium text-sky-700">
                      {book.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-sky-900 mb-2">
                  {book.title}
                </h3>
                <p className="text-sky-600 mb-3">de {book.author}</p>
                <p className="text-sky-700 text-sm mb-4 line-clamp-2">
                  {book.description}
                </p>

                <div className="flex items-center text-sky-500 text-sm">
                  <span>👁</span>
                  <span className="ml-1">
                    {book.views.toLocaleString()} cititori
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
