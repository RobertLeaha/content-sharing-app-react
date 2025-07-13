import { useState } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import FormField from "../components/FormField";
import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";
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

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
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
      icon: "📱",
      title: "Social Media",
      description: "Urmărește-ne și contactează-ne pe rețelele sociale",
      contact: "@MicaMeaCarte",
      action: () => alert("Link-urile sociale vor fi adăugate în curând!"),
    },
  ];

  const subjectOptions = [
    { value: "", label: "Selectează subiectul" },
    { value: "suport-tehnic", label: "Suport tehnic" },
    { value: "sugestii", label: "Sugestii și feedback" },
    { value: "colaborare", label: "Colaborare" },
    { value: "raportare-problema", label: "Raportare problemă" },
    { value: "altele", label: "Altele" },
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
  ];

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />

      <HeroSection
        title="Contactează-ne"
        subtitle="Avem întrebări? Sugestii? Sau pur și simplu vrei să ne spui salut? Suntem aici pentru tine!"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                <FormField
                  label="Numele tău"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  placeholder="Introdu numele tău"
                  required
                  disabled={isSubmitting}
                />

                <FormField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  placeholder="exemplu@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <FormField
                label="Subiectul mesajului"
                type="select"
                value={formData.subject}
                onChange={handleInputChange("subject")}
                options={subjectOptions}
                required
                disabled={isSubmitting}
              />

              <FormField
                label="Mesajul tău"
                type="textarea"
                value={formData.message}
                onChange={handleInputChange("message")}
                placeholder="Scrie mesajul tău aici..."
                rows={6}
                required
                disabled={isSubmitting}
              />

              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="w-full"
                icon="📤"
              >
                Trimite mesajul
              </Button>
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
                  <FeatureCard
                    key={index}
                    icon={method.icon}
                    title={method.title}
                    description={`${method.description}\n${method.contact}`}
                    onClick={method.action}
                  />
                ))}
              </div>
            </div>

            {/* FAQ rapid */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-sky-900 mb-6">
                Întrebări frecvente
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
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
              <Button
                variant="ghost"
                onClick={() => router.push("/despre-noi")}
                className="mt-4"
              >
                Vezi toate întrebările →
              </Button>
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
            <Button
              onClick={() => router.push("/despre-noi")}
              variant="secondary"
            >
              Despre noi
            </Button>
            <Button
              onClick={() => router.push("/descopera")}
              className="bg-sky-500 hover:bg-sky-400"
            >
              Explorează cărțile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
