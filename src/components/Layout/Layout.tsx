import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
              Tinder
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
