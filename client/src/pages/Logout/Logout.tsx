import { useEffect } from "react";
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../utils/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    const logoutUser = async () => {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      setAuth({ isAuthenticated: false });
      navigate("/login");
    };
    logoutUser();
  }, []);

  return <></>;
};

export default Logout;
