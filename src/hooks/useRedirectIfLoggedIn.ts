import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirectIfLoggedin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  });
};
