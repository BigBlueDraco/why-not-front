import { render, fireEvent } from "@testing-library/react";
import { Card } from "./Card";

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
      <Card data-testid={testData.id} title={testData.title} />
    );
    expect(getByTestId(testData.id)).toBeInTheDocument();
  });
  it("should render title and description corect", () => {
    const { getByTestId, getByText } = render(
      <Card
        data-testid={testData.id}
        title={testData.title}
        desc={testData.desc}
      />
    );
    expect(getByTestId(testData.id)).toBeInTheDocument();
    expect(getByText(testData.title)).toBeInTheDocument();
    expect(getByText(testData.desc)).toBeInTheDocument();
  });
  it("should render child corect", () => {
    const { getByTestId, getByText, queryByText } = render(
      <Card
        data-testid={testData.id}
        title={testData.title}
        desc={testData.desc}
      >
        {testData.children}
      </Card>
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
      <Card title={testData.title} onClick={testData.onClick} />
    );
    fireEvent.click(getByText(testData.title));
    expect(testData.onClick).toHaveBeenCalled();
  });
});
