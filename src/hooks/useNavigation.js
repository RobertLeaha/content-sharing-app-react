import { useNavigate } from "react-router-dom";

// Hook personalizat pentru navigare - simplifică utilizarea React Router
export const useNavigation = () => {
  // Inițializează hook-ul de navigare din React Router
  const navigate = useNavigate();

  // Funcție pentru navigarea la o rută specifică
  const push = (path) => {
    navigate(path); // Navighează la calea specificată
  };

  // Funcție pentru navigarea înapoi în istoric
  const back = () => {
    navigate(-1); // Navighează cu o pagină înapoi în istoric
  };

  // Returnează obiect cu funcțiile de navigare disponibile
  return { push, back };
};
