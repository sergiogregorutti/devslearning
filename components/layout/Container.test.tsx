import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe("Container Component", () => {
  test("renders children correctly", () => {
    render(
      <Container>
        <div>Test Child</div>
      </Container>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  test("always applies the base styles", () => {
    const { container } = render(
      <Container>
        <div>Test</div>
      </Container>
    );

    expect(container.firstChild).toHaveClass(
      "px-6 sm:px-14 lg:px-16 mx-auto w-full"
    );
  });

  test("applies max-w-screen-xl when fluid is false", () => {
    const { container } = render(
      <Container fluid={false}>
        <div>Test</div>
      </Container>
    );

    expect(container.firstChild).toHaveClass("max-w-screen-xl");
  });

  test("does not apply max-w-screen-xl when fluid is true", () => {
    const { container } = render(
      <Container fluid={true}>
        <div>Test</div>
      </Container>
    );

    expect(container.firstChild).not.toHaveClass("max-w-screen-xl");
  });

  test("applies custom className correctly", () => {
    const { container } = render(
      <Container className="custom-class">
        <div>Test</div>
      </Container>
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });
});
