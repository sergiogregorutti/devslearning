import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders button with label", () => {
    render(<Button label="Click Me" />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);

    fireEvent.click(screen.getByText("Click Me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders button with icon", () => {
    render(
      <Button label="Click Me" icon={<span data-testid="icon">🔔</span>} />
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  test("button has correct class for small size", () => {
    render(<Button label="Click Me" size="small" />);

    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("text-sm py-[5px] px-[20px]");
  });

  test("button is disabled when disabled prop is true", () => {
    render(<Button label="Click Me" disabled />);

    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("bg-gray-300 text-gray-500 cursor-default");

    fireEvent.click(button);
    expect(button).toBeDisabled();
  });

  test("renders button with correct variant", () => {
    render(<Button label="Click Me" variant="darkBlue" />);

    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("bg-blue-800 text-white hover:bg-blue-900");
  });

  test("renders Link when href is provided", () => {
    render(<Button label="Click Me" href="/about" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/about");
  });
});
