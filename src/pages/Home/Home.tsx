import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
              Tinder
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{}}
                onClick={() => setLoginMenuOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            {!isMobile && (
              <Button
                onClick={() => setLoginMenuOpen(true)}
                size="large"
                color="secondary"
                variant="text"
              >
                Увійти
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

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
            <Button variant="contained">
              {isMobile ? "Створити аккаунт" : "Створити обліковий запис"}
            </Button>
            {isMobile && (
              <Button
                href="/"
                variant="outlined"
                onClick={() => setLoginMenuOpen(true)}
              >
                Увійти
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Container>
      <LoginWindow isOpen={isLoginMenuOpen} onClose={setLoginMenuOpen} />
    </>
  );
};
