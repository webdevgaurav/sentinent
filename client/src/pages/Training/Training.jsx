import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Training = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("product");
  }, [navigate]);
  
  return <Outlet />;
};

export default Training;
