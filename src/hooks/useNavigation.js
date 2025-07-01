import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const push = (path) => {
    navigate(path);
  };

  const back = () => {
    navigate(-1);
  };

  return { push, back };
};
