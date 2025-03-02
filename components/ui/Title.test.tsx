import { render, screen } from "@testing-library/react";
import Title from "./Title";

describe("Title Component", () => {
  test("renders Title component with label", () => {
    render(<Title label="Test Title" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<Title label="Test Title" className="text-red-500" />);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toHaveClass("text-red-500");
  });

  test("has default styles", () => {
    render(<Title label="Test Title" />);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toHaveClass(
      "text-blue-800 text-4xl/10 md:text-5xl/[58px] lg:text-6xl/[58px] font-bold"
    );
  });
});
