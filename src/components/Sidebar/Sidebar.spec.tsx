import { MockedProvider } from "@apollo/client/testing";
import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { GET_CURRENT_USER } from "../../apollo/User/user";
import { Sidebar } from "./Sidebar";

const currentUserMock = {
  request: {
    query: GET_CURRENT_USER,
  },
  result: {
    data: {
      getCurrentUser: {
        first_name: "John",
        offers: [],
      },
    },
  },
};

describe("Sidebar component", () => {
  it("renders the component with the matches tab", async () => {
    const { getByRole, getByText } = render(
      <MockedProvider mocks={[currentUserMock]} addTypename={false}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(getByRole("tabpanel")).toBeInTheDocument();
    expect(getByRole("banner")).toBeInTheDocument();

    expect(getByText(/matches/i)).toBeInTheDocument();
    expect(getByText(/offers/i)).toBeInTheDocument();
    expect(getByText(/messages/i)).toBeInTheDocument();
  });

  it("renders the component with an unauthorized user corect", async () => {
    const unauthorizedMock = {
      request: {
        query: GET_CURRENT_USER,
      },
      error: new Error("Unauthorized"),
    };

    const { queryByText } = render(
      <MockedProvider mocks={[unauthorizedMock]} addTypename={false}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </MockedProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(
      queryByText(currentUserMock.result.data.getCurrentUser.first_name)
    ).not.toBeInTheDocument();
    expect(queryByText(/username/i)).toBeInTheDocument();
  });
});
