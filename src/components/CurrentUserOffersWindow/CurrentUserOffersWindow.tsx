import { useQuery } from "@apollo/client";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Grid, IconButton, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { GET_CURRENT_USER } from "../../apollo/User/user";
import { CreateOfferForm } from "../AddOfferForm/AddOfferForm";
import { Card } from "../Card/Card";
import { theme } from "../../themes/themeMaterialUI";

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
  const [isAddOfferFormOpen, setIsAddOfferFormOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { error, loading } = useQuery(GET_CURRENT_USER, {
    onCompleted: (data) => {
      data && setOffers(data.getCurrentUser.offers);
    },
  });
  useEffect(() => {
    if (error?.message === "Unauthorized") {
      navigate("/");
      localStorage.setItem("token", "");
    }
  }, [error, navigate]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          minHeight: "560px",
          maxHeight: "75vh",
          minWidth: 320 * 4,
          maxWidth: 320 * 4,
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.default",
          boxShadow: 24,
          p: 4,
          overflowY: "scroll",
          overflowX: "hidden",
          display: "flex",
        }}
      >
        <IconButton
          onClick={() => {
            setIsAddOfferFormOpen(false);
            onClose();
          }}
          sx={{
            position: "absolute",
            right: 2,
            top: 2,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {isAddOfferFormOpen ? (
          <>
            <CreateOfferForm onClose={() => setIsAddOfferFormOpen(false)} />
          </>
        ) : (
          <>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "560px",
                  maxHeight: "560px",
                  minWidth: 320 * 4,
                  maxWidth: 320 * 4,
                }}
              >
                <FallingLines color="#4fa94d" width="100" visible={loading} />
              </Box>
            ) : (
              <Grid container spacing={4}>
                {offers &&
                  !error &&
                  offers?.map(
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
                <Grid
                  sx={{ display: "flex", justifyContent: "center" }}
                  item
                  xs={4}
                >
                  <Card
                    onClick={() => {
                      setIsAddOfferFormOpen(true);
                    }}
                  >
                    <AddIcon
                      color="action"
                      sx={{
                        height: "100px",
                        width: "100px",
                      }}
                    />
                  </Card>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};
