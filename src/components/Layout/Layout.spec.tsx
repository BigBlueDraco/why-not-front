import { render } from "@testing-library/react";
import { Layout } from "./Layout";
import { useResponsive } from "../../hooks/useResponsive";

jest.mock("../../hooks/useResponsive");

describe("Layout component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should rendered", () => {
    const { getByRole, getByText } = render(<Layout />);
    expect(getByRole("banner")).toBeInTheDocument();
    expect(getByText("Tinder")).toBeInTheDocument();
  });
});
