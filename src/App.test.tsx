import { render } from "@testing-library/react";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./themes/themeMaterialUI";

test("renders learn react link", () => {
  render(
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  );
});
