import { useState } from "react";
import Navigation from "../components/Navigation";
import { useNavigation } from "../hooks/useNavigation";

export default function ConectarePage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Date conectare:", formData);
    alert("Conectare reușită!");
    router.push("/");
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Adresa de email
                  </label>
                  <div className="relative">
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
                      placeholder="📧 exemplu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-2">
                    Parola
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="w-full px-4 pr-12 py-3 border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      placeholder="🔒 Parola ta"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-400 hover:text-sky-600"
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-sky-300 rounded"
                    />
                    <span className="ml-2 text-sm text-sky-700">
                      Ține-mă conectat
                    </span>
                  </label>

                  <button
                    type="button"
                    className="text-sm text-sky-600 hover:text-sky-800 transition-colors"
                  >
                    Ai uitat parola?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors font-semibold"
                >
                  Conectează-te
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sky-600">
                  Nu ai cont?{" "}
                  <button
                    onClick={() => router.push("/inregistrare")}
                    className="text-sky-800 font-semibold hover:text-sky-900 transition-colors"
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
