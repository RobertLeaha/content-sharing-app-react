import { useState } from "react";
import Navigation from "../components/Navigation";
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

  const validateForm = () => {
    const newErrors = {};

    // Validare nume
    if (!formData.name.trim()) {
      newErrors.name = "Numele este obligatoriu";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Numele trebuie să aibă cel puțin 2 caractere";
    }

    // Validare email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email-ul este obligatoriu";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email-ul nu este valid";
    }

    // Validare parolă
    if (!formData.password) {
      newErrors.password = "Parola este obligatorie";
    } else if (formData.password.length < 6) {
      newErrors.password = "Parola trebuie să aibă cel puțin 6 caractere";
    }

    // Validare confirmare parolă
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
        // Tratează erorile Firebase
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
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Numele complet
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                        errors.name
                          ? "border-red-300 bg-red-50"
                          : "border-sky-300"
                      }`}
                      placeholder="👤 Numele tău complet"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Adresa de email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                        errors.email
                          ? "border-red-300 bg-red-50"
                          : "border-sky-300"
                      }`}
                      placeholder="📧 exemplu@email.com"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Parola
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className={`w-full px-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                        errors.password
                          ? "border-red-300 bg-red-50"
                          : "border-sky-300"
                      }`}
                      placeholder="🔒 Alege o parolă sigură"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400 hover:text-sky-600"
                      disabled={isLoading}
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Confirmă parola
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className={`w-full px-4 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                        errors.confirmPassword
                          ? "border-red-300 bg-red-50"
                          : "border-sky-300"
                      }`}
                      placeholder="🔒 Confirmă parola"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400 hover:text-sky-600"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sky-600 text-white py-3 px-4 rounded-lg hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Se înregistrează...
                    </>
                  ) : (
                    "Înregistrează-te"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sky-600">
                  Ai deja cont?{" "}
                  <button
                    onClick={() => router.push("/conectare")}
                    className="text-sky-800 font-semibold hover:text-sky-900 transition-colors"
                    disabled={isLoading}
                  >
                    Conectează-te aici
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
