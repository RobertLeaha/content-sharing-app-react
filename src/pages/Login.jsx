import React from "react";
import { Link } from "react-router-dom";

import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  return (
    <div className="flex items-center justify-center py-16 px-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Conectează-te
          </h1>
          <p className="text-gray-600">Bun venit înapoi! Introdu datele tale</p>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="exemplu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Parolă
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="Introdu parola"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700"
              >
                Ține-mă minte
              </label>
            </div>
            <a href="#" className="text-sm text-sky-600 hover:text-sky-700">
              Ai uitat parola?
            </a>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors shadow-md"
          >
            Conectează-te
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">sau</span>
            </div>
          </div>

          <button className="mt-4 w-full px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors">
            Continuă cu Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Nu ai cont?{" "}
            <Link
              to={"/register"}
              className="text-sky-600 hover:text-sky-700 font-medium"
            >
              Înregistrează-te
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
