import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          maxHeight: "100vh",
        }}
      >
        <Sidebar />
        <Container>Dashboqrd</Container>
      </Box>
    </>
  );
};
