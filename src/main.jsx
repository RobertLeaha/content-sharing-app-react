import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Home from "./pages/Home.jsx";
import Book from "./pages/Book.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import Discover from "./pages/Discover.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Genres from "./pages/Genres.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book" element={<Book />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/genres/:slug" element={<Genres />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

// dupa ce rezolv cu pagina book, la path ar trebuii sa scriu:
//<Route path="/book/:slug" element={<Book />} />;
