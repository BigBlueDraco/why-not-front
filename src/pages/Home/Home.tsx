import { Box, Button, ButtonGroup, Typography, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { LoginWindow } from "../../components/LoginWindow/LoginWindow";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../hooks/useResponsive";

export const Home = () => {
  const theme = useTheme();
  const { isMobile } = useResponsive();
  const [isLoginMenuOpen, setLoginMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  });
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "95vh",
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
            fontFamily={theme.typography.fontFamily}
            color={theme.palette.text.primary}
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
