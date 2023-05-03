import { render, fireEvent } from "@testing-library/react";
import { Card } from "./Card";
import { ThemeProvider } from "styled-components";
import { theme } from "../../themes/themeMaterialUI";

describe("Card", () => {
  const testData = {
    id: "testId",
    title: "Title-djasd",
    desc: "Desc-asjdasjd",
    children: (
      <button data-testid="test-button-andkjaksdjaks">test children</button>
    ),
    onClick: jest.fn(),
  };

  it("should rendered", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Card data-testid={testData.id} title={testData.title} />
      </ThemeProvider>
    );
    expect(getByTestId(testData.id)).toBeInTheDocument();
  });

  it("should render title and description corect", () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={theme}>
        <Card
          data-testid={testData.id}
          title={testData.title}
          desc={testData.desc}
        />
      </ThemeProvider>
    );
    expect(getByTestId(testData.id)).toBeInTheDocument();
    expect(getByText(testData.title)).toBeInTheDocument();
    expect(getByText(testData.desc)).toBeInTheDocument();
  });

  it("should render child corect", () => {
    const { getByTestId, getByText, queryByText } = render(
      <ThemeProvider theme={theme}>
        <Card
          data-testid={testData.id}
          title={testData.title}
          desc={testData.desc}
        >
          {testData.children}
        </Card>
      </ThemeProvider>
    );
    expect(getByTestId(testData.id)).toBeInTheDocument();
    expect(
      getByTestId(testData.children.props["data-testid"])
    ).toBeInTheDocument();
    expect(queryByText(testData.desc)).toBeNull();
    expect(queryByText(testData.title)).toBeNull();
  });

  it("should call onClick when clicked", () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Card title={testData.title} onClick={testData.onClick} />
      </ThemeProvider>
    );
    fireEvent.click(getByText(testData.title));
    expect(testData.onClick).toHaveBeenCalled();
  });
});
