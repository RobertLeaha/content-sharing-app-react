import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home.jsx";
import InregistrarePage from "./pages/Inregistrare.jsx";
import ConectarePage from "./pages/Conectare.jsx";
import BookPage from "./pages/Book.jsx";
import DescoperaPage from "./pages/Descopera.jsx";
import GenresPage from "./pages/Genres.jsx";
import CapitolPage from "./pages/Capitol.jsx";
import ScrieCartePage from "./pages/Scrie-carte.jsx";
import ReadPage from "./pages/Read.jsx";

const App = () => (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inregistrare" element={<InregistrarePage />} />
        <Route path="/conectare" element={<ConectarePage />} />
        <Route path="/book/:id" element={<BookPage />} />
        <Route path="/descopera" element={<DescoperaPage />} />
        <Route path="/genres/:slug" element={<GenresPage />} />
        <Route path="/capitol" element={<CapitolPage />} />
        <Route path="/scrie-carte" element={<ScrieCartePage />} />
        <Route path="/read/:id" element={<ReadPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

export default App;

createRoot(document.getElementById("root")).render(<App />);
