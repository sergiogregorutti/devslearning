import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading Component", () => {
  test("renders Heading component with label", () => {
    render(<Heading label="Test Heading" />);

    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  test("renders with correct default tag (h1)", () => {
    render(<Heading label="Test Heading" />);

    const headingElement = screen.getByText("Test Heading");
    expect(headingElement.tagName).toBe("H1");
  });

  test("renders with correct tag when specified", () => {
    render(<Heading label="Test Heading" as="h3" />);

    const headingElement = screen.getByText("Test Heading");
    expect(headingElement.tagName).toBe("H3");
  });

  test("applies custom className", () => {
    render(<Heading label="Test Heading" className="text-red-500" />);

    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toHaveClass("text-red-500");
  });

  test("has correct default styles for h1", () => {
    render(<Heading label="Test Heading" />);

    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toHaveClass(
      "text-blue-800 text-4xl/10 md:text-5xl/[58px] lg:text-6xl/[58px] font-bold"
    );
  });

  test("has correct styles for h2", () => {
    render(<Heading label="Test Heading" as="h2" />);

    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toHaveClass(
      "text-blue-500 text-2xl md:text-3xl font-bold mb-2 leading-none"
    );
  });

  test("has correct styles for h3", () => {
    render(<Heading label="Test Heading" as="h3" />);

    const headingElement = screen.getByText("Test Heading");
    expect(headingElement).toHaveClass(
      "text-blue-800 text-xl md:text-2xl font-bold mb-2 leaging-none"
    );
  });
});
