import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Deck } from "../components/Desk/desk";
import { useQuery } from "@apollo/client";
import { GET_ALL_OFFERS } from "../apollo/offer/offer";
import { Card } from "../components/Card/Card";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<any>();
  const [pagination, setPagination] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { loading, fetchMore } = useQuery(GET_ALL_OFFERS, {
    variables: {
      page: 1,
      limit: 5,
    },
    onCompleted: (data) => {
      console.log(data);
      const { items, pagination } = data.getAllOffers;
      console.log(items);
      if (data) {
        setOffers(items);
        setPagination(pagination);
      }
    },
  });
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });

  const fetch = () => {
    setIsLoading(true);
    fetchMore({
      variables: {
        page: pagination.currentPage + 1,
      },
      updateQuery: (prevRes, { fetchMoreResult }) => {
        console.log(fetchMoreResult);
        const { items: prevItems } = prevRes.getAllOffers;
        const { items, pagination } = fetchMoreResult.getAllOffers;
        setPagination({ ...pagination });
        return {
          getAllOffers: {
            items: [...prevItems, ...items],
            pagination: { ...pagination },
          },
        };
      },
    }).then(() => {
      setIsLoading(false);
    });
  };

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card></Card>
          </Box>
          <Box>
            {offers && (
              <>
                <Deck
                  cards={offers}
                  pagination={pagination}
                  fetch={fetch}
                  loading={isLoading || loading}
                />
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};
