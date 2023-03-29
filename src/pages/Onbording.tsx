import { Container } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";

export const Onbording = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  });
  return (
    <>
      <Container>
        <RegistrationForm />
      </Container>
    </>
  );
};
