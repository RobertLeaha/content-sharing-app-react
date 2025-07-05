import { useNavigation } from "../hooks/useNavigation";

export default function Footer() {
  const router = useNavigation();

  const footerCards = [
    {
      icon: "✍️",
      title: "Scrie și Publică",
      description:
        "Creează-ți propriile povești și împarte-le cu lumea. Platforma noastră îți oferă toate instrumentele necesare pentru a deveni autor.",
      buttonText: "Începe să scrii",
      buttonAction: () => router.push("/scrie-carte"),
      bgColor: "bg-gradient-to-br from-blue-50 to-sky-100",
      iconColor: "text-blue-600",
    },
    {
      icon: "📚",
      title: "Descoperă Povești",
      description:
        "Explorează o colecție diversă de cărți scrise de autori talentați din comunitatea noastră. Găsește următoarea ta lectură preferată.",
      buttonText: "Explorează cărțile",
      buttonAction: () => router.push("/descopera"),
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-100",
      iconColor: "text-green-600",
    },
    {
      icon: "🌟",
      title: "Comunitate Activă",
      description:
        "Alătură-te unei comunități pasionate de lectură și scriere. Evaluează cărțile, lasă comentarii și conectează-te cu alți cititori.",
      buttonText: "Alătură-te nouă",
      buttonAction: () => router.push("/inregistrare"),
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <footer className="bg-white border-t border-sky-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {footerCards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300`}
            >
              <div className={`text-5xl mb-4 ${card.iconColor}`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-sky-900 mb-4">
                {card.title}
              </h3>
              <p className="text-sky-700 mb-6 leading-relaxed">
                {card.description}
              </p>
              <button
                onClick={card.buttonAction}
                className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg"
              >
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="border-t border-sky-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo și descriere */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">📚</span>
                <span className="text-xl font-bold text-sky-800">
                  Mica Mea Carte
                </span>
              </div>
              <p className="text-sky-600 mb-4 leading-relaxed">
                Platforma unde poveștile prind viață. Creează, citește și
                împărtășește experiențe literare unice într-o comunitate
                pasionată de cuvinte.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push("/contact")}
                  className="text-sky-600 hover:text-sky-800 transition-colors"
                >
                  📧 Contact
                </button>
                <button
                  onClick={() => router.push("/despre-noi")}
                  className="text-sky-600 hover:text-sky-800 transition-colors"
                >
                  ℹ️ Despre noi
                </button>
              </div>
            </div>

            {/* Navigare rapidă */}
            <div>
              <h4 className="font-semibold text-sky-900 mb-4">Navigare</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => router.push("/")}
                    className="text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    Acasă
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/descopera")}
                    className="text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    Descoperă cărți
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/scrie-carte")}
                    className="text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    Scrie o carte
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/contact")}
                    className="text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/despre-noi")}
                    className="text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    Despre noi
                  </button>
                </li>
              </ul>
            </div>

            {/* Statistici */}
            <div>
              <h4 className="font-semibold text-sky-900 mb-4">
                Comunitatea noastră
              </h4>
              <div className="space-y-2 text-sky-600">
                <div className="flex items-center">
                  <span className="mr-2">👥</span>
                  <span>Autori activi</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📖</span>
                  <span>Cărți publicate</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⭐</span>
                  <span>Rating mediu: 4.2/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-sky-200 mt-8 pt-6 text-center">
            <p className="text-sky-500">
              © 2024 Mica Mea Carte. Toate drepturile rezervate.
              <span className="mx-2">•</span>
              Făcut cu ❤️ pentru iubitorii de cărți
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
