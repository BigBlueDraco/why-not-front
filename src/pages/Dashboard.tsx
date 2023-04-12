import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Deck } from "../components/Desk/desk";
import { useQuery } from "@apollo/client";
import { GET_ALL_OFFERS } from "../apollo/offer/offer";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { data: offers } = useQuery(GET_ALL_OFFERS);

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
        <Container>
          <Box sx={{ display: "flex", pt: 20 }}>
            {offers && <Deck cardsArray={offers.getAllOffers} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};
