import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentOfferDeck } from "../components/CurrentOfferDeck/CurrentOfferDeck";
import { OffersForUserDesk } from "../components/OffersForUserDeck/OffersForUserDeck";
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
          overflow: "hidden",
        }}
      >
        <Sidebar />
        <Container sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <>
            <Box>
              <CurrentOfferDeck />
            </Box>
            <Box>
              <OffersForUserDesk />
            </Box>
          </>
        </Container>
      </Box>
    </>
  );
};
