import { useState } from "react";
import Navigation from "../components/Navigation";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { useNavigation } from "../hooks/useNavigation";
import { useAuth } from "../context/Auth-context";

export default function InregistrarePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useNavigation();
  const { signUp } = useAuth();

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Șterge eroarea pentru câmpul modificat
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Numele este obligatoriu";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Numele trebuie să aibă cel puțin 2 caractere";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email-ul este obligatoriu";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email-ul nu este valid";
    }

    if (!formData.password) {
      newErrors.password = "Parola este obligatorie";
    } else if (formData.password.length < 6) {
      newErrors.password = "Parola trebuie să aibă cel puțin 6 caractere";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmarea parolei este obligatorie";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parolele nu se potrivesc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await signUp(
        formData.email,
        formData.password,
        formData.name
      );

      if (result.success) {
        alert(
          `Bun venit, ${formData.name}! Contul tău a fost creat cu succes! 🎉`
        );
        router.push("/");
      } else {
        let errorMessage = "A apărut o eroare la înregistrare";

        if (result.error.includes("email-already-in-use")) {
          errorMessage = "Acest email este deja folosit";
        } else if (result.error.includes("weak-password")) {
          errorMessage = "Parola este prea slabă";
        } else if (result.error.includes("invalid-email")) {
          errorMessage = "Email-ul nu este valid";
        }

        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error("Eroare la înregistrare:", error);
      setErrors({ general: "A apărut o eroare neașteptată" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-sky-600 text-white p-6 text-center">
              <span className="text-4xl mb-4">👤</span>
              <h1 className="text-2xl font-bold">Înregistrare</h1>
              <p className="text-sky-100 mt-2">Creează-ți contul gratuit</p>
            </div>

            <div className="p-8">
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  label="Numele complet"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  placeholder="👤 Numele tău complet"
                  required
                  error={errors.name}
                  disabled={isLoading}
                />

                <FormField
                  label="Adresa de email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  placeholder="📧 exemplu@email.com"
                  required
                  error={errors.email}
                  disabled={isLoading}
                />

                <FormField
                  label="Parola"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  placeholder="🔒 Alege o parolă sigură"
                  required
                  error={errors.password}
                  disabled={isLoading}
                  showPasswordToggle={true}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />

                <FormField
                  label="Confirmă parola"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  placeholder="🔒 Confirmă parola"
                  required
                  error={errors.confirmPassword}
                  disabled={isLoading}
                  showPasswordToggle={true}
                  showPassword={showConfirmPassword}
                  onTogglePassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded"
                    disabled={isLoading}
                  />
                  <span className="ml-2 text-sm text-sky-700">
                    Sunt de acord cu{" "}
                    <button
                      type="button"
                      className="text-sky-600 hover:text-sky-800 transition-colors"
                    >
                      termenii și condițiile
                    </button>
                  </span>
                </div>

                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full"
                >
                  Înregistrează-te
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sky-600">
                  Ai deja cont?{" "}
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/conectare")}
                    disabled={isLoading}
                    className="p-0 h-auto font-semibold hover:text-sky-900"
                  >
                    Conectează-te aici
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
