import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-sky-100 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center">
          <div className="text-center ml-120">
            <div className="mb-6">
              <h1 className="text-5xl font-bold text-gray-800 leading-tight">
                <div>Mica Mea</div>
                <div>Carte</div>
              </h1>
            </div>

            <div className="max-w-md mx-auto">
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Descoperă lumea fascinantă a cuvintelor unde fiecare poveste
                prinde viață.
              </p>

              <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                <button className="px-3 py-1.5 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors shadow-md">
                  Scrie
                </button>

                <button className="px-3 py-1.5 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors shadow-md">
                  <Link to={"./discover"}>Citește</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
