import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Deck } from "../components/Desk/desk";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_OFFERS,
  GET_OFFERS_FOR_USER,
  GET_OFFER_BY_ID,
} from "../apollo/offer/offer";
import { Card } from "../components/Card/Card";
import BlockIcon from "@mui/icons-material/Block";
import MenuIcon from "@mui/icons-material/Menu";
import { CurrentUserOffersWindow } from "../components/CurrentUserOffersWindow/CurrentUserOffersWindow";
import { MagnifyingGlass } from "react-loader-spinner";
import { CREATE_GRADE_MUTATION } from "../apollo/LIke/like";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<any>();
  const [pagination, setPagination] = useState<any>();
  const [isOffersLoading, setIsOffersLoading] = useState<boolean>(true);
  const [isSwipebel, setIsSwipebel] = useState<boolean>(false);
  const [isChousenOffersListOpen, setIsChousenOffersListOpen] =
    useState<boolean>(false);
  const [currentUserOffer, setCurrentUserOffer] = useState<any>([]);
  const { loading, fetchMore } = useQuery(GET_OFFERS_FOR_USER, {
    variables: {
      page: 1,
      limit: 5,
    },
    onCompleted: (data) => {
      const { items, pagination } = data.getOffersForUser;
      if (data) {
        setOffers(items);
        setPagination(pagination);
      }
    },
  });
  const [createGrade, { data }] = useMutation(CREATE_GRADE_MUTATION);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });
  const { fetchMore: fetchMoreByID } = useQuery(GET_OFFER_BY_ID, {
    variables: {
      id: 0,
    },
  });
  const onChoice = (id: number) => {
    fetchMoreByID({
      variables: {
        id: +id,
      },
      updateQuery: (prev, { fetchMoreResult: { getOfferById } }) => {
        getOfferById &&
          setCurrentUserOffer((prev: any) => [...prev, { ...getOfferById }]);
        setIsSwipebel(true);
      },
    });
  };
  const onAllOfferSwipe = async (
    movement: number,
    ...args: any
  ): Promise<void> => {
    const data = {
      givenId: +currentUserOffer[0].id,
      receivedId: +args[0],
      isLiked: movement < 0,
    };
    createGrade({
      variables: {
        data: { ...data },
      },
      onCompleted: (data) => {
        console.log(data);
      },
    });
  };
  const onUserOfferSwipe = (movement: number): void => {
    setIsSwipebel(false);
    setTimeout(() => {
      setCurrentUserOffer([]);
    }, 200);
  };

  const fetch = () => {
    setIsOffersLoading(true);
    fetchMore({
      variables: {
        page: pagination.currentPage + 1,
      },
      updateQuery: (prevRes, { fetchMoreResult }) => {
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
      setIsOffersLoading(false);
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
        <CurrentUserOffersWindow
          open={isChousenOffersListOpen}
          onClose={() => {
            setIsChousenOffersListOpen(false);
          }}
          onChoice={onChoice}
        />
        <Sidebar />
        <Container sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentUserOffer && (
                <Deck
                  cards={currentUserOffer}
                  fetch={() => {}}
                  loading={isOffersLoading || loading}
                  onSwipe={onUserOfferSwipe}
                >
                  <Card>
                    <Button
                      onClick={() => {
                        setIsChousenOffersListOpen(true);
                      }}
                      sx={{
                        minWidth: 320,
                        minHeight: 520,
                        boxShadow: "inset 0px 0px 20px 0px rgba(0,0,0,0.25)",
                      }}
                    >
                      <MenuIcon
                        color="action"
                        sx={{
                          height: "100px",
                          width: "100px",
                        }}
                      />
                    </Button>
                  </Card>
                </Deck>
              )}
            </Box>
            <Box>
              <>
                <Deck
                  cards={offers}
                  pagination={pagination}
                  fetch={fetch}
                  loading={isOffersLoading || loading}
                  onSwipe={onAllOfferSwipe}
                  isSwipebel={isSwipebel}
                >
                  <Card>
                    {isOffersLoading && (
                      <MagnifyingGlass
                        visible={true}
                        height="100"
                        width="100"
                        ariaLabel="MagnifyingGlass-loading"
                        wrapperStyle={{}}
                        wrapperClass="MagnifyingGlass-wrapper"
                        glassColor="#00ADB58f"
                        color="#222831"
                      />
                    )}
                    {pagination?.currentPage === pagination?.totalPages &&
                      !isOffersLoading && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <BlockIcon sx={{ height: "100px", width: "100px" }} />
                          <Typography>
                            Unfortunately, there are no more offers
                          </Typography>
                        </Box>
                      )}
                  </Card>
                </Deck>
              </>
            </Box>
          </>
        </Container>
      </Box>
    </>
  );
};
