import { useMutation, useQuery } from "@apollo/client";
import { CREATE_GRADE_MUTATION } from "../../apollo/LIke/like";
import { GET_OFFERS_FOR_USER } from "../../apollo/offer/offer";
import { useState } from "react";
import { Deck } from "../Desk/desk";
import { Card } from "../Card/Card";
import { Box, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { MagnifyingGlass } from "react-loader-spinner";

interface IOffersForUserDesk {
  id?: number;
  isSwipebel?: boolean;
}
export const OffersForUserDesk: React.FC<IOffersForUserDesk> = ({
  id,
  isSwipebel = false,
}) => {
  const [offers, setOffers] = useState<any>();
  const [pagination, setPagination] = useState<any>();
  const [isOffersLoading, setIsOffersLoading] = useState<boolean>(true);
  // const [isSwipebel, setIsSwipebel] = useState<boolean>(false);
  const [createGrade, { data }] = useMutation(CREATE_GRADE_MUTATION);
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
  const onOfferSwipe = async (
    movement: number,
    ...args: any
  ): Promise<void> => {
    const data = {
      givenId: id,
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
      <Deck
        cards={offers}
        pagination={pagination}
        fetch={fetch}
        loading={isOffersLoading || loading}
        onSwipe={onOfferSwipe}
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
                <Typography>Unfortunately, there are no more offers</Typography>
              </Box>
            )}
        </Card>
      </Deck>
    </>
  );
};
