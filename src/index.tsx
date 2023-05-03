import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MUIThemeProvider from "@mui/material/styles/ThemeProvider";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import { theme } from "./themes/themeMaterialUI";
import { Provider } from "react-redux";
import { store } from "./redux/index";
import { Box, CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <MUIThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                bgcolor: theme.palette.background.default,
              }}
            >
              <CssBaseline />
              <App />
            </Box>
          </ThemeProvider>
        </MUIThemeProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
