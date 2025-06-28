import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

export default function Discover() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Discover</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorează o lume plină de povești captivante și autori talentați.
            Găsește următoarea ta carte favorită din colecția noastră diversă.
          </p>
        </div>

        {/* Secțiune Cărți Populare */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Cărți Populare
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((book) => (
              <div
                key={book}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={`/placeholder.svg?height=300&width=200`}
                  alt={`Carte ${book}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Titlu Carte {book}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">de Autor {book}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    O poveste captivantă care te va ține cu sufletul la gură...
                  </p>

                  <Link
                    className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                    to={"/book"}
                  >
                    Citește acum
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
