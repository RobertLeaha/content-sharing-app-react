
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigation } from "../hooks/useNavigation"
import Navigation from "../components/Navigation"
import { getBooks, getBooksLocal, getAllPublicBooks } from "../utils/Book-Storage"
import { useAuth } from "../context/Auth-context"

const extendedBookDetails = {
  "În numele trandafirului": {
    pages: 512,
    publishYear: 1980,
    fullDescription:
      "Romanul lui Umberto Eco este o operă complexă care combină elementele unui roman polițist cu o profundă reflecție filosofică și teologică. Acțiunea se petrece în 1327, într-o mănăstire benedictină din nordul Italiei, unde au loc negocieri importante între reprezentanții papei și ai împăratului. În acest context tensionat, o serie de crime misterioase zguduie comunitatea monastică. Fratele William de Baskerville, un franciscan erudit, împreună cu noviciul său Adso de Melk, investighează aceste crime care par să fie legate de biblioteca secretă a mănăstirii și de cărțile interzise pe care le ascunde.",
  },
  Maitreyi: {
    pages: 256,
    publishYear: 1933,
    fullDescription:
      "Romanul autobiografic al lui Mircea Eliade explorează tema iubirii transcendentale și a întâlnirii dintre două culturi diferite. Povestea se bazează pe experiența reală a autorului în India, unde s-a îndrăgostit de fiica gazdei sale, Maitreyi Devi. Romanul abordează teme profunde despre spiritualitate, dragoste și diferențele culturale, fiind considerat una dintre capodoperele literaturii române interbelice.",
  },
  Ion: {
    pages: 320,
    publishYear: 1920,
    fullDescription:
      "Romanul lui Liviu Rebreanu este considerat primul roman modern din literatura română și una dintre cele mai importante opere ale realismului românesc. Povestea lui Ion Glanetașu, un țăran sărac obsedat de dorința de a poseda pământ, devine o analiză profundă a sufletului omenesc și a societății rurale românești de la începutul secolului XX. Romanul explorează teme universale precum ambiția, iubirea, trădarea și prețul pe care îl plătim pentru realizarea visurilor noastre.",
  },
  Baltagul: {
    pages: 180,
    publishYear: 1930,
    fullDescription:
      "Nuvela lui Mihail Sadoveanu este o capodoperă a literaturii române care explorează teme profunde despre dreptate, răzbunare și puterea iubirii materne. Povestea Vitoriei Lipan, care își caută soțul ucis în munți, devine o călătorie inițiatică prin peisajul carpatin și prin sufletul omenesc. Sadoveanu creează o operă de o frumusețe stilistică remarcabilă, îmbinând realismul cu elemente de basm și legendă.",
  },
  "Enigma Otiliei": {
    pages: 420,
    publishYear: 1938,
    fullDescription:
      "Romanul lui George Călinescu este o frescă a societății bucureștene de la începutul secolului XX, centrată în jurul personajului enigmatic Otilia Mărculescu. Prin ochii lui Felix Sima, un tânăr student venit din provincie, cititorul descoperă o lume plină de intrigi, pasiuni și secrete. Romanul este o analiză psihologică profundă și o satiră socială fină, considerată una dintre cele mai importante opere ale literaturii române moderne.",
  },
  Moromeții: {
    pages: 380,
    publishYear: 1955,
    fullDescription:
      "Romanul lui Marin Preda este o frescă monumentală a vieții rurale românești din perioada interbelică și de după război. Prin familia Moromete, autorul surprinde transformările sociale și politice care au marcat România secolului XX. Ilie Moromete devine un simbol al țăranului român, cu înțelepciunea și demnitatea sa, confruntat cu schimbările istorice majore. Romanul este considerat una dintre cele mai importante opere ale literaturii române contemporane.",
  },
}

export default function BookPage() {
  const { id } = useParams()
  const router = useNavigation()
  const { user } = useAuth()
  const [userBooks, setUserBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [publicBooks, setPublicBooks] = useState([])

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true)
      try {
        // Încarcă cărțile publice
        const allPublicBooks = await getAllPublicBooks()
        setPublicBooks(allPublicBooks)

        // Încarcă cărțile utilizatorului
        let books = []
        if (user) {
          books = await getBooks(user.uid)
        } else {
          books = getBooksLocal()
        }
        setUserBooks(Array.isArray(books) ? books : [])
      } catch (error) {
        console.error("Eroare la încărcarea cărților:", error)
        setUserBooks([])
        setPublicBooks([])
      } finally {
        setIsLoading(false)
      }
    }

    loadBooks()
  }, [user, id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-sky-100">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
            <p className="text-sky-600">Se încarcă detaliile cărții...</p>
          </div>
        </div>
      </div>
    )
  }

  const allBooks = [...publicBooks, ...userBooks]
  const book = allBooks.find((b) => b.id.toString() === id)
  const isUserBook = userBooks.some((userBook) => userBook.id.toString() === id)

  if (!book) {
    return (
      <div className="min-h-screen bg-sky-100">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <span className="text-6xl mb-4 block">📚</span>
            <h1 className="text-2xl font-bold text-sky-900 mb-4">Cartea nu a fost găsită</h1>
            <p className="text-sky-600 mb-6">Ne pare rău, dar cartea pe care o cauți nu există în colecția noastră.</p>
            <button
              onClick={() => router.push("/descopera")}
              className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
            >
              Înapoi la cărți
            </button>
          </div>
        </div>
      </div>
    )
  }

  const extendedDetails = extendedBookDetails[book.title] || {}

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
                  src={book.cover || "/placeholder.svg?height=400&width=300"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {isUserBook && (
                <div className="mt-4 text-center">
                  <span className="inline-block px-4 py-2 bg-green-500 text-white text-sm rounded-full">
                    📝 Cartea ta
                  </span>
                </div>
              )}
            </div>

            <div className="md:w-2/3 p-8">
              <div className="mb-4">
                <span className="px-3 py-1 bg-sky-100 text-sky-700 text-sm rounded-full">{book.genre.name}</span>
              </div>

              <h1 className="text-4xl font-bold text-sky-900 mb-4">{book.title}</h1>
              <p className="text-xl text-sky-600 mb-6">de {book.author}</p>

              <div className="flex items-center space-x-6 mb-6 flex-wrap gap-y-2">
                <div className="flex items-center text-yellow-500">
                  <span>⭐</span>
                  <span className="ml-2 text-lg font-medium text-sky-700">{book.rating}</span>
                </div>

                <div className="flex items-center text-sky-500">
                  <span>👁</span>
                  <span className="ml-2">{book.views?.toLocaleString() || "0"} cititori</span>
                </div>

                {extendedDetails.pages && (
                  <div className="flex items-center text-sky-500">
                    <span>📄</span>
                    <span className="ml-2">{extendedDetails.pages} pagini</span>
                  </div>
                )}

                <div className="flex items-center text-sky-500">
                  <span>📅</span>
                  <span className="ml-2">
                    {extendedDetails.publishYear || new Date(book.publishDate).getFullYear()}
                  </span>
                </div>

                {isUserBook && book.chapters && (
                  <div className="flex items-center text-sky-500">
                    <span>📖</span>
                    <span className="ml-2">{book.chapters.length} capitole</span>
                  </div>
                )}
              </div>

              <p className="text-sky-700 mb-6 leading-relaxed">
                {book.description || "O poveste captivantă care te va ține cu sufletul la gură."}
              </p>

              {extendedDetails.fullDescription && (
                <p className="text-sky-600 mb-8 leading-relaxed">{extendedDetails.fullDescription}</p>
              )}

              {isUserBook && book.chapters && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-sky-900 mb-3">Capitole disponibile:</h3>
                  <div className="space-y-2">
                    {book.chapters.slice(0, 3).map((chapter, index) => (
                      <div key={index} className="flex items-center text-sky-600">
                        <span className="mr-2">📖</span>
                        <span>
                          Capitol {index + 1}: {chapter.title}
                        </span>
                      </div>
                    ))}
                    {book.chapters.length > 3 && (
                      <div className="text-sky-500 text-sm">... și încă {book.chapters.length - 3} capitole</div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-sky-200 text-sky-700 font-semibold rounded-lg hover:bg-sky-300 transition-colors"
                >
                  Înapoi
                </button>

                <button
                  onClick={() => router.push(`/read/${book.id}`)}
                  className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors"
                >
                  📖 Citește acum
                </button>

                <button
                  onClick={() => router.push("/descopera")}
                  className="px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors border-2 border-sky-600"
                >
                  🔍 Descoperă mai multe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-sky-900 mb-6">Cărți similare din genul {book.genre.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allBooks
              .filter((similarBook) => similarBook.genre.slug === book.genre.slug && similarBook.id !== book.id)
              .slice(0, 4)
              .map((similarBook, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
                  onClick={() => router.push(`/book/${similarBook.id}`)}
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center">
                    <img
                      src={similarBook.cover || "/placeholder.svg?height=300&width=200"}
                      alt={similarBook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-bold text-sky-900 mb-1 line-clamp-2">{similarBook.title}</h3>
                    <p className="text-sky-600 text-xs mb-2">de {similarBook.author}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-yellow-500">
                        <span>⭐</span>
                        <span className="ml-1 text-sky-700">{similarBook.rating}</span>
                      </div>
                      <div className="flex items-center text-sky-500">
                        <span>👁</span>
                        <span className="ml-1">{similarBook.views?.toLocaleString() || "0"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {allBooks.filter((similarBook) => similarBook.genre.slug === book.genre.slug && similarBook.id !== book.id)
            .length === 0 && (
            <div className="text-center py-8">
              <p className="text-sky-600">Nu există alte cărți disponibile în acest gen momentan.</p>
              <button
                onClick={() => router.push("/descopera")}
                className="mt-4 px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
              >
                Explorează toate cărțile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
