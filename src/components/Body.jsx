import { Link } from "react-router-dom";

export default function Body() {
  // Simulare date pentru cele mai noi publicații
  const publicatiiNoi = [
    {
      id: 1,
      titlu: "Secretele Pădurii Fermecate",
      autor: "Maria Popescu",
      gen: "Fantasy",
      dataPublicarii: "2024-01-15",
      descriere:
        "O aventură magică în care o tânără descoperă puteri ascunse în pădurea din spatele casei bunicii sale.",
      imagine: "/placeholder.svg?height=300&width=200",
      cititori: 1247,
      capitole: 12,
    },
    {
      id: 2,
      titlu: "Misterul de pe Strada Victoriei",
      autor: "Ion Marinescu",
      gen: "Mister",
      dataPublicarii: "2024-01-14",
      descriere:
        "Un detectiv privat investighează o serie de dispariții misterioase într-un cartier liniștit din București.",
      imagine: "/placeholder.svg?height=300&width=200",
      cititori: 892,
      capitole: 8,
    },
    {
      id: 3,
      titlu: "Dragoste în Vremea Digitală",
      autor: "Ana Gheorghiu",
      gen: "Romantice",
      dataPublicarii: "2024-01-13",
      descriere:
        "O poveste de dragoste modernă despre două persoane care se întâlnesc într-o aplicație de dating.",
      imagine: "/placeholder.svg?height=300&width=200",
      cititori: 2156,
      capitole: 15,
    },
  ];

  const formatData = (data) => {
    const date = new Date(data);
    return date.toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getGenreColor = (gen) => {
    const colors = {
      Fantasy: "bg-purple-100 text-purple-800",
      Mister: "bg-gray-100 text-gray-800",
      Romantice: "bg-pink-100 text-pink-800",
      "Sci-Fi": "bg-blue-100 text-blue-800",
      Biografii: "bg-green-100 text-green-800",
      Thriller: "bg-red-100 text-red-800",
      Ficțiune: "bg-yellow-100 text-yellow-800",
      "Non-ficțiune": "bg-indigo-100 text-indigo-800",
      Istorie: "bg-orange-100 text-orange-800",
      Poezie: "bg-teal-100 text-teal-800",
    };
    return colors[gen] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Cele Mai Noi Publicații
        </h2>
        <p className="text-lg text-gray-700">
          Descoperă cele mai recente povești publicate de autorii noștri
          talentați
        </p>
      </div>

      {/* Publicații Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {publicatiiNoi.map((publicatie) => (
          <div
            key={publicatie.id}
            className="bg-sky-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-sky-200"
          >
            <img
              src={publicatie.imagine || "/placeholder.svg"}
              alt={publicatie.titlu}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getGenreColor(
                    publicatie.gen
                  )}`}
                >
                  {publicatie.gen}
                </span>
                <span className="text-xs text-gray-600">
                  {formatData(publicatie.dataPublicarii)}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {publicatie.titlu}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                de {publicatie.autor}
              </p>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {publicatie.descriere}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                <span>{publicatie.cititori.toLocaleString()} cititori</span>
                <span>{publicatie.capitole} capitole</span>
              </div>

              <Link
                className="w-full px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
                to={"/book"}
              >
                Citește acum
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors shadow-md">
          <Link to={"./discover"}>Descopera toate publicatiile</Link>
        </button>
      </div>
    </div>
  );
}
