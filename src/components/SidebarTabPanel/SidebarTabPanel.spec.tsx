import { render } from "@testing-library/react";
import { SidebarTabPanel } from "./SidebarTabPanel";

describe("SidebarTabPanel component", () => {
  it("should not render when value is not equal to index", () => {
    const { queryByText } = render(
      <SidebarTabPanel value={0} index={1}>
        <p>Test child</p>
      </SidebarTabPanel>
    );
    expect(queryByText("Test child")).toBeNull();
  });

  it("should render when value is equal to index", () => {
    const { getByRole } = render(
      <SidebarTabPanel value={1} index={1}>
        <p>Test child</p>
      </SidebarTabPanel>
    );
    expect(getByRole("tabpanel")).toBeInTheDocument();
  });

  it("should contain children when value is equal to index", () => {
    const { getByText } = render(
      <SidebarTabPanel value={2} index={2}>
        <p>Test child</p>
      </SidebarTabPanel>
    );
    expect(getByText("Test child")).toBeInTheDocument();
  });
});
