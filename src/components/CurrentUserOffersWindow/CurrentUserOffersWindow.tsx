import { Box, Grid, Modal } from "@mui/material";
import { Card } from "../Card/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../apollo/User/user";
import { FallingLines } from "react-loader-spinner";

interface ICurrentUserOffersWindow {
  open: boolean;
  onClose(): void;
  onChoice(id: number): void;
}
export const CurrentUserOffersWindow: React.FC<ICurrentUserOffersWindow> = ({
  open,
  onClose,
  onChoice,
}) => {
  const [offers, setOffers] = useState<any[]>([]);
  const navigate = useNavigate();
  const { error, loading } = useQuery(GET_CURRENT_USER, {
    onCompleted: (data) => {
      data && setOffers(data.getCurrentUser.offers);
    },
  });
  useEffect(() => {
    if (error?.message === "Unauthorized") {
      navigate("/");
    }
  }, [error, navigate]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          minHeight: "80vh",
          maxHeight: "80vh",
          minWidth: 320 * 4,
          maxWidth: 320 * 4,
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "scroll",
          display: "flex",
        }}
      >
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
              maxHeight: "80vh",
              minWidth: 320 * 4,
              maxWidth: 320 * 4,
            }}
          >
            <FallingLines color="#4fa94d" width="100" visible={loading} />
          </Box>
        )}
        {offers && !error && !loading && (
          <Grid container spacing={4}>
            {offers?.map(
              ({
                id,
                description,
                title,
              }: {
                id: number;
                description: string;
                title: string;
              }) => (
                <Grid
                  key={id}
                  sx={{ display: "flex", justifyContent: "center" }}
                  item
                  xs={4}
                >
                  <Card
                    onClick={() => {
                      onChoice(id);
                      onClose();
                    }}
                    title={title}
                    desc={description}
                  />
                </Grid>
              )
            )}
          </Grid>
        )}
      </Box>
    </Modal>
  );
};
