import { useNavigation } from "../hooks/useNavigation";

export default function Header() {
  const router = useNavigation();

  return (
    <div className="bg-gradient-to-r from-sky-100 to-blue-100 py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-sky-900 mb-6">
          Mica mea carte
        </h1>

        <p className="text-xl text-sky-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Descoperă lumea fascinantă a cuvintelor unde fiecare poveste prinde
          viață.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/descopera")}
            className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors shadow-lg"
          >
            Citește
          </button>

          <button
            onClick={() => router.push("/scrie-carte")}
            className="px-8 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors shadow-lg border-2 border-sky-600"
          >
            Scrie
          </button>
        </div>
      </div>
          
    </div>
  );
}
