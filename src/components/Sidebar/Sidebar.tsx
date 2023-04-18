import { useQuery } from "@apollo/client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_CURRENT_USER } from "../../apollo/User/user";
import { SidebarTabPanel } from "./SidebarTabPanel";

export const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { error, data: currentUserData } = useQuery(GET_CURRENT_USER);
  useEffect(() => {
    if (error?.message === "Unauthorized") {
      navigate("/");
    }
  }, [error, navigate]);
  return (
    <Box
      sx={{
        left: 0,
        top: 0,
        minHeight: "100vh",
        maxHeight: "100vh",
        minWidth: "325px",
        maxWidth: "325px",
        boxShadow: "10px 0px 10px 0px rgba(0,0,0,0.28)",
      }}
    >
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt="avatar" src="" sx={{ width: 32, height: 32 }} />
            <Typography>
              {currentUserData
                ? currentUserData?.getCurrentUser.first_name
                : "Username"}
            </Typography>
          </Box>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            variant="contained"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        sx={{
          pl: 2,
          // position: "absolute",
          top: 64,
          zIndex: "10",
        }}
      >
        <Tab sx={{ p: 1 }} label="Matches" />
        <Tab sx={{ p: 1 }} label="Offers" />
        <Tab sx={{ p: 1 }} label="Messages" />
      </Tabs>
      <SidebarTabPanel value={value} index={0} dir={theme.direction}>
        <List>
          <ListItem>Matches</ListItem>
        </List>
      </SidebarTabPanel>
      <SidebarTabPanel value={value} index={1} dir={theme.direction}>
        <Box
          sx={{
            position: "relative",
            maxHeight: "80vh",
          }}
        >
          <List
            sx={{
              mt: 0,
              minHeight: "100%",
              maxHeight: "65vh",
              overflowY: "scroll",
              mb: 4,
            }}
          >
            {currentUserData &&
              currentUserData.getCurrentUser.offers?.map(
                ({ title, description, id }: any) => {
                  return (
                    <ListItem key={id}>
                      <ListItemAvatar></ListItemAvatar>
                      <ListItemText>{title}</ListItemText>
                    </ListItem>
                  );
                }
              )}
          </List>

          <Button
            fullWidth={true}
            type="button"
            color="primary"
            variant="contained"
            sx={{}}
          >
            Add offer
          </Button>
        </Box>
      </SidebarTabPanel>
      <SidebarTabPanel value={value} index={2} dir={theme.direction}>
        <List>
          <ListItem>Messages</ListItem>
        </List>
      </SidebarTabPanel>
    </Box>
  );
};
