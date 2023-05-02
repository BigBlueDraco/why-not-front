import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";

test("renders learn react link", () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
});
