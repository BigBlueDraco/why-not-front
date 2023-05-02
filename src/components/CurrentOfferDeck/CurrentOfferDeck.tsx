import { useQuery } from "@apollo/client";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import { useState } from "react";
import { GET_OFFER_BY_ID } from "../../apollo/offer/offer";
import { useAppDispath } from "../../hooks/useCustomRedux";
import { changeId, removeId } from "../../redux/gradeSlice";
import { Card } from "../Card/Card";
import { CurrentUserOffersWindow } from "../CurrentUserOffersWindow/CurrentUserOffersWindow";
import { Deck } from "../Desk/desk";

export const CurrentOfferDeck: React.FC = () => {
  const dispath = useAppDispath();
  const [currentUserOffer, setCurrentUserOffer] = useState<any>([]);
  const [isChousenOffersListOpen, setIsChousenOffersListOpen] =
    useState<boolean>(false);
  const { fetchMore: fetchMoreByID } = useQuery(GET_OFFER_BY_ID, {
    variables: {
      id: 0,
    },
  });

  const onUserOfferSwipe = (movement: number): void => {
    dispath(removeId());
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
        dispath(changeId(id));
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
