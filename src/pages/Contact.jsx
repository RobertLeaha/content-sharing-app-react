import { useState } from "react";
import Navigation from "../components/Navigation";
import { useNavigation } from "../hooks/useNavigation";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useNavigation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulează trimiterea mesajului
    await new Promise((resolve) => setTimeout(resolve, 1500));

    alert(
      "Mesajul tău a fost trimis cu succes! Îți vom răspunde în curând. 📧"
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      description: "Scrie-ne un email și îți vom răspunde în 24 de ore",
      contact: "contact@micameacarte.ro",
      action: () => window.open("mailto:contact@micameacarte.ro"),
    },
    {
      icon: "💬",
      title: "Chat Live",
      description: "Vorbește direct cu echipa noastră de suport",
      contact: "Disponibil L-V, 9:00-18:00",
      action: () => alert("Chat-ul live va fi disponibil în curând!"),
    },
    {
      icon: "📱",
      title: "Social Media",
      description: "Urmărește-ne și contactează-ne pe rețelele sociale",
      contact: "@MicaMeaCarte",
      action: () => alert("Link-urile sociale vor fi adăugate în curând!"),
    },
  ];

  const faqItems = [
    {
      question: "Cum pot publica o carte pe platformă?",
      answer:
        "Este foarte simplu! Creează-ți un cont, apoi accesează secțiunea 'Scrie o carte' din meniu. Completează informațiile despre carte și adaugă capitolele. Cartea ta va fi publicată automat și vizibilă pentru toți utilizatorii.",
    },
    {
      question: "Pot edita cartea după ce am publicat-o?",
      answer:
        "Da! Poți adăuga noi capitole oricând accesând secțiunea 'Scrie un capitol'. De asemenea, poți edita informațiile despre carte din profilul tău.",
    },
    {
      question: "Cum funcționează sistemul de rating?",
      answer:
        "Utilizatorii înregistrați pot da rating de la 1 la 5 stele fiecărei cărți. Rating-ul mediu se calculează automat pe baza tuturor evaluărilor primite.",
    },
    {
      question: "Sunt gratuite toate funcționalitățile?",
      answer:
        "Da! Platforma Mica Mea Carte este complet gratuită. Poți citi, scrie și publica cărți fără niciun cost.",
    },
  ];

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-sky-900 mb-4">
            Contactează-ne
          </h1>
          <p className="text-xl text-sky-700 max-w-3xl mx-auto">
            Avem întrebări? Sugestii? Sau pur și simplu vrei să ne spui salut?
            Suntem aici pentru tine!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formularul de contact */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-sky-900 mb-2">
                Trimite-ne un mesaj
              </h2>
              <p className="text-sky-600">
                Completează formularul și îți vom răspunde cât mai curând
                posibil.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Numele tău *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Introdu numele tău"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="exemplu@email.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Subiectul mesajului *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  disabled={isSubmitting}
                >
                  <option value="">Selectează subiectul</option>
                  <option value="suport-tehnic">Suport tehnic</option>
                  <option value="sugestii">Sugestii și feedback</option>
                  <option value="colaborare">Colaborare</option>
                  <option value="raportare-problema">Raportare problemă</option>
                  <option value="altele">Altele</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">
                  Mesajul tău *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                  placeholder="Scrie mesajul tău aici..."
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-600 text-white py-3 px-6 rounded-lg hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Se trimite...
                  </>
                ) : (
                  <>
                    <span className="mr-2">📤</span>
                    Trimite mesajul
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Informații de contact și FAQ */}
          <div className="space-y-8">
            {/* Metode de contact */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-sky-900 mb-6">
                Alte modalități de contact
              </h2>
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer"
                    onClick={method.action}
                  >
                    <div className="text-3xl mr-4">{method.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sky-900 mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sky-600 text-sm mb-2">
                        {method.description}
                      </p>
                      <p className="text-sky-800 font-medium">
                        {method.contact}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ rapid */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-sky-900 mb-6">
                Întrebări frecvente
              </h2>
              <div className="space-y-4">
                {faqItems.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-sky-200 pb-4 last:border-b-0"
                  >
                    <h3 className="font-semibold text-sky-900 mb-2">
                      {item.question}
                    </h3>
                    <p className="text-sky-600 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => router.push("/despre-noi")}
                className="mt-4 text-sky-600 hover:text-sky-800 font-medium transition-colors"
              >
                Vezi toate întrebările →
              </button>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-12 bg-gradient-to-r from-sky-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Nu ai găsit răspunsul la întrebarea ta?
          </h2>
          <p className="mb-6 opacity-90">
            Echipa noastră este mereu gata să te ajute. Nu ezita să ne
            contactezi pentru orice nelămurire!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/despre-noi")}
              className="px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors"
            >
              Despre noi
            </button>
            <button
              onClick={() => router.push("/descopera")}
              className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-400 transition-colors"
            >
              Explorează cărțile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
