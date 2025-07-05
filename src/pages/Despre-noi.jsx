import Navigation from "../components/Navigation";
import { useNavigation } from "../hooks/useNavigation";

export default function DesprePage() {
  const router = useNavigation();

  const features = [
    {
      icon: "✍️",
      title: "Scrie liber",
      description:
        "Creează și publică-ți poveștile fără restricții. Platforma noastră îți oferă toate instrumentele necesare.",
    },
    {
      icon: "📚",
      title: "Citește gratuit",
      description:
        "Accesează o bibliotecă în continuă creștere cu povești originale scrise de comunitatea noastră.",
    },
    {
      icon: "⭐",
      title: "Evaluează și comentează",
      description: "Dă feedback autorilor prin sistemul nostru de rating.",
    },
    {
      icon: "🌍",
      title: "Comunitate globală",
      description:
        "Conectează-te cu scriitori și cititori din întreaga lume într-un mediu sigur și prietenos.",
    },
    {
      icon: "📱",
      title: "Acces oriunde",
      description:
        "Citește și scrie de pe orice dispozitiv - desktop, tabletă sau telefon.",
    },
    {
      icon: "🔒",
      title: "Sigur și privat",
      description: "Datele tale sunt protejate.",
    },
  ];

  const faqItems = [
    {
      question: "Ce este Mica Mea Carte?",
      answer:
        "Mica Mea Carte este o platformă online gratuită unde oricine poate scrie, publica și citi povești originale. Misiunea noastră este să democratizăm accesul la literatură și să creăm o comunitate vibrantă de scriitori și cititori.",
    },
    {
      question: "Cum pot începe să scriu pe platformă?",
      answer:
        "Este foarte simplu! Creează-ți un cont gratuit, apoi accesează secțiunea 'Scrie o carte' din meniu. Poți începe cu primul capitol și să continui să adaugi conținut oricând dorești.",
    },
    {
      question: "Costă ceva să folosesc platforma?",
      answer:
        "Nu! Mica Mea Carte este complet gratuită. Poți citi, scrie, publica și interacționa cu comunitatea fără niciun cost. Credem că literatura trebuie să fie accesibilă tuturor.",
    },
    {
      question: "Cum sunt protejate drepturile de autor?",
      answer:
        "Respectăm drepturile de autor ale tuturor utilizatorilor. Când publici o poveste, rămâi proprietarul conținutului tău. Platforma oferă doar spațiul pentru partajare și nu revendică niciun drept asupra lucrărilor tale.",
    },
    {
      question: "Pot colabora cu alți autori?",
      answer:
        "Momentan, fiecare carte este scrisă de un singur autor, dar lucrăm la funcționalități de colaborare care vor fi disponibile în viitorul apropiat. Poți însă interacționa cu alți autori prin comentarii și rating-uri.",
    },
    {
      question: "Cum pot raporta conținut inadecvat?",
      answer:
        "Siguranța comunității noastre este prioritară. Dacă întâlnești conținut inadecvat, poți să ne contactezi prin pagina de contact sau prin email la raportare@micameacarte.ro.",
    },
  ];

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Despre Mica Mea Carte</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Suntem o platformă dedicată iubitorilor de literatură care cred că
            fiecare poveste merită să fie spusă și fiecare cititor merită să
            descopere noi lumi prin cuvinte.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Misiunea noastră */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-sky-900 mb-8">
            Misiunea noastră
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-sky-800 mb-4">
                Democratizarea literaturii
              </h3>
              <p className="text-sky-700 leading-relaxed mb-6">
                Credem că fiecare persoană are o poveste de spus și că
                literatura nu trebuie să fie limitată de bariere financiare sau
                editoriale. Platforma noastră oferă un spațiu liber și accesibil
                pentru toți cei care doresc să-și exprime creativitatea prin
                cuvinte.
              </p>
              <p className="text-sky-700 leading-relaxed">
                De la povești scurte la romane complexe, de la poezie la
                non-ficțiune, Mica Mea Carte este casa digitală pentru toate
                genurile literare și pentru toate vocile care merită să fie
                auzite.
              </p>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">📚</div>
              <h4 className="text-xl font-semibold text-sky-900 mb-2">
                Viziunea noastră
              </h4>
              <p className="text-sky-700">
                Să devenim cea mai mare comunitate de scriitori și cititori din
                România, unde creativitatea și pasiunea pentru literatură se
                întâlnesc într-un mediu sigur și inspirațional.
              </p>
            </div>
          </div>
        </div>

        {/* Funcționalități */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-sky-900 text-center mb-12">
            Ce oferim
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-sky-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sky-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-sky-900 text-center mb-12">
            Întrebări frecvente
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-8">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-sky-200 pb-6 last:border-b-0 last:pb-0"
                >
                  <h3 className="text-lg font-semibold text-sky-900 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-sky-700 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Gata să începi aventura ta literară?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Alătură-te comunității noastre și descoperă puterea cuvintelor
            într-un mediu prietenos și inspirațional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/inregistrare")}
              className="px-8 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors"
            >
              Creează cont gratuit
            </button>
            <button
              onClick={() => router.push("/descopera")}
              className="px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-400 transition-colors"
            >
              Explorează cărțile
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-sky-600 transition-colors"
            >
              Contactează-ne
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
