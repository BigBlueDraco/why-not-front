import {
  AppBar,
  Avatar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { SidebarTabPanel } from "./SidebarTabPanel";

export const Sidebar = () => {
  const theme = useTheme();
  const [value, setValue] = useState(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        position: "reletive",
        left: 0,
        top: 0,
        minHeight: "100%",
        minWidth: "325px",
        maxWidth: "325px",
        boxShadow: "10px 0px 10px 0px rgba(0,0,0,0.28)",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar alt="avatar" src="" sx={{ width: 32, height: 32 }} />
            <Typography>UserName</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        sx={{
          pl: 2,
        }}
      >
        <Tab sx={{ p: 1 }} label="Matches" />
        <Tab sx={{ p: 1 }} label="Messages" />
      </Tabs>
      <SidebarTabPanel value={value} index={0} dir={theme.direction}>
        Matches
      </SidebarTabPanel>
      <SidebarTabPanel value={value} index={1} dir={theme.direction}>
        Messages
      </SidebarTabPanel>
    </Box>
  );
};
