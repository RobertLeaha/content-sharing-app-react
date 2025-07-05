import { useState } from "react";
import Navigation from "../components/Navigation";
import FormField from "../components/FormField";
import Button from "../components/Button";
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

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email-ul este obligatoriu";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email-ul nu este valid";
    }

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
                  placeholder="🔒 Parola ta"
                  required
                  error={errors.password}
                  disabled={isLoading}
                  showPasswordToggle={true}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />

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

                  <Button
                    variant="ghost"
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                    className="text-sm p-0 h-auto"
                  >
                    Ai uitat parola?
                  </Button>
                </div>

                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full"
                >
                  Conectează-te
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sky-600">
                  Nu ai cont?{" "}
                  <Button
                    variant="ghost"
                    onClick={() => router.push("/inregistrare")}
                    disabled={isLoading}
                    className="p-0 h-auto font-semibold hover:text-sky-900"
                  >
                    Înregistrează-te aici
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
