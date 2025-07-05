import { useState } from "react";
import Navigation from "../components/Navigation";
import { useNavigation } from "../hooks/useNavigation";
import { useAuth } from "../context/Auth-context";

export default function ConectarePage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const router = useNavigation();
  const { signIn } = useAuth();

  const validateForm = () => {
    const newErrors = {};

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
      const result = await signIn(formData.email, formData.password);

      if (result.success) {
        alert(`Bun venit înapoi! Te-ai conectat cu succes! 🎉`);
        router.push("/");
      } else {
        // Tratează erorile Firebase
        let errorMessage = "A apărut o eroare la conectare";

        if (result.error.includes("user-not-found")) {
          errorMessage = "Nu există un cont cu acest email";
        } else if (result.error.includes("wrong-password")) {
          errorMessage = "Parola este incorectă";
        } else if (result.error.includes("invalid-email")) {
          errorMessage = "Email-ul nu este valid";
        } else if (result.error.includes("too-many-requests")) {
          errorMessage = "Prea multe încercări. Încearcă din nou mai târziu";
        } else if (result.error.includes("user-disabled")) {
          errorMessage = "Acest cont a fost dezactivat";
        }

        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error("Eroare la conectare:", error);
      setErrors({ general: "A apărut o eroare neașteptată" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Aici poți implementa funcționalitatea de resetare parolă
    alert("Funcționalitatea de resetare parolă va fi implementată în curând!");
  };

  return (
    <div className="min-h-screen bg-sky-100">
      <Navigation />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-sky-600 text-white p-6 text-center">
              <span className="text-4xl mb-4">🔐</span>
              <h1 className="text-2xl font-bold">Conectare</h1>
              <p className="text-sky-100 mt-2">Bun venit înapoi!</p>
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
                      placeholder="🔒 Parola ta"
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

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded"
                      disabled={isLoading}
                    />
                    <span className="ml-2 text-sm text-sky-700">
                      Ține-mă conectat
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                    disabled={isLoading}
                  >
                    Ai uitat parola?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sky-600 text-white py-3 px-4 rounded-lg hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Se conectează...
                    </>
                  ) : (
                    "Conectează-te"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sky-600">
                  Nu ai cont?{" "}
                  <button
                    onClick={() => router.push("/inregistrare")}
                    className="text-sky-800 font-semibold hover:text-sky-900 transition-colors"
                    disabled={isLoading}
                  >
                    Înregistrează-te aici
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
