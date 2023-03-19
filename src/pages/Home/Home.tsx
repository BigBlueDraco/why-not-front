import { Box, Button, ButtonGroup, Typography, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LoginWindow } from "../../components/LoginWindow/LoginWindow";

export const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLoginMenuOpen, setLoginMenuOpen] = useState(false);
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // mt: 10,
            alignItems: "center",
            gap: 12,
          }}
        >
          <Typography
            align="center"
            variant="h1"
            fontWeight={theme.typography.fontWeightBold}
            color="common.black"
          >
            Гортай праворуч
          </Typography>
          <ButtonGroup
            size="large"
            color="primary"
            sx={{
              maxWidth: "320px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Button href="/onbording" variant="contained">
              {isMobile ? "Створити аккаунт" : "Створити обліковий запис"}
            </Button>
            <Button
              href="/"
              variant="outlined"
              onClick={() => setLoginMenuOpen(true)}
            >
              Увійти
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
      <LoginWindow isOpen={isLoginMenuOpen} onClose={setLoginMenuOpen} />
    </>
  );
};
