import { NavLink } from "react-router";

import { useState } from "react";

export default function Navigation() {
  const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
  const [writeDropdownOpen, setWriteDropdownOpen] = useState(false);

  const genres = [
    { name: "Ficțiune", path: "/genres/fictiune" },
    { name: "Non-ficțiune", path: "/genres/non-fictiune" },
    { name: "Romantice", path: "/genres/romantice" },
    { name: "Thriller", path: "/genres/thriller" },
    { name: "Mister", path: "/genres/mister" },
    { name: "Fantasy", path: "/genres/fantasy" },
    { name: "Sci-Fi", path: "/genres/sci-fi" },
    { name: "Biografii", path: "/genres/biografii" },
    { name: "Istorie", path: "/genres/istorie" },
  ];

  return (
    <nav className="w-full bg-sky-100 shadow-md px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo și Dropdown Genuri */}
        <div className="flex items-center space-x-4">
          <img src="/placeholder.svg?height=40&width=120" />

          <div className="relative">
            <button
              onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
              className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-sky-800 transition-colors"
            >
              <span>Genuri</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {genreDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-sky-50 border border-sky-200 rounded-md shadow-lg z-10">
                <div className="grid grid-cols-3 gap-1 p-2">
                  {genres.map((genre, index) => (
                    <NavLink to={genre.path} key={index}>
                      <button
                        className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-sky-200 transition-colors rounded"
                        onClick={() => setGenreDropdownOpen(false)}
                      >
                        {genre.name}
                      </button>
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bara de Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Caută cărți, autori..."
              className="w-full px-4 py-2 pl-10 border border-sky-300 bg-sky-50 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Butoane din dreapta */}
        <div className="flex items-center space-x-4">
          {/* Dropdown Scrie */}
          <div className="relative">
            <button
              onClick={() => setWriteDropdownOpen(!writeDropdownOpen)}
              className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-sky-800 transition-colors"
            >
              <span>Scrie</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {writeDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-sky-50 border border-sky-200 rounded-md shadow-lg z-10">
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-sky-200 transition-colors">
                  Scrie o nouă carte
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-sky-200 transition-colors">
                  Un nou capitol
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-sky-200 transition-colors">
                  Continuă capitolul început
                </button>
              </div>
            )}
          </div>
          <NavLink
            to={"/login"}
            className="px-4 py-2 text-sky-700 border border-sky-600 bg-sky-50 rounded-md hover:bg-sky-200 transition-colors"
          >
            Conetare
          </NavLink>

          <NavLink
            to={"/register"}
            className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
          >
            Intregistrare
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
