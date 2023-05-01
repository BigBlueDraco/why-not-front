import { Button } from "@mui/material";
import { Deck } from "../Desk/desk";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { GET_OFFER_BY_ID } from "../../apollo/offer/offer";
import { useQuery } from "@apollo/client";
import { CurrentUserOffersWindow } from "../CurrentUserOffersWindow/CurrentUserOffersWindow";
import { Card } from "../Card/Card";

export const CurrentOfferDeck: React.FC = () => {
  const [currentUserOffer, setCurrentUserOffer] = useState<any>([]);
  const [isSwipebel, setIsSwipebel] = useState<boolean>(false);
  const [isOffersLoading, setIsOffersLoading] = useState<boolean>(true);
  const [isChousenOffersListOpen, setIsChousenOffersListOpen] =
    useState<boolean>(false);
  const { fetchMore: fetchMoreByID } = useQuery(GET_OFFER_BY_ID, {
    variables: {
      id: 0,
    },
  });

  const onUserOfferSwipe = (movement: number): void => {
    setIsSwipebel(false);
    setTimeout(() => {
      setCurrentUserOffer([]);
    }, 200);
  };

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

  return (
    <>
      <CurrentUserOffersWindow
        open={isChousenOffersListOpen}
        onClose={() => {
          setIsChousenOffersListOpen(false);
        }}
        onChoice={onChoice}
      />
      {currentUserOffer && (
        <Deck
          cards={currentUserOffer}
          fetch={() => {}}
          loading={isOffersLoading}
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
    </>
  );
};
