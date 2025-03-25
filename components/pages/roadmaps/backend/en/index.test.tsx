import { render, screen } from "@testing-library/react";
import Backend from ".";

describe("Backend Component", () => {
  test("renders the correct page title and description", () => {
    render(<Backend />);

    expect(screen.getByText("Backend Developer")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Start your journey to becoming a Backend Developer! This roadmap outlines the essential skills and tools needed to build robust, scalable backend systems. Whether you’re starting from scratch or looking to level up your skills, follow this clear path to master the backend development stack."
      )
    ).toBeInTheDocument();
  });

  test("renders the roadmap steps", () => {
    render(<Backend />);

    expect(
      screen.getByText("1. Learn the Basics of Programming")
    ).toBeInTheDocument();
    expect(screen.getByText("2. Learn about Databases")).toBeInTheDocument();
    expect(screen.getByText("3. Learn about Web Servers")).toBeInTheDocument();
    expect(screen.getByText("4. Understand REST APIs")).toBeInTheDocument();
    expect(
      screen.getByText("5. Authentication and Authorization")
    ).toBeInTheDocument();
    expect(
      screen.getByText("6. Learn about Web Frameworks")
    ).toBeInTheDocument();
    expect(
      screen.getByText("7. Learn about Data Structures and Algorithms")
    ).toBeInTheDocument();
    expect(screen.getByText("8. Version Control (Git)")).toBeInTheDocument();
    expect(
      screen.getByText("9. Testing (Unit & Integration Tests)")
    ).toBeInTheDocument();
    expect(screen.getByText("10. Deployment and Hosting")).toBeInTheDocument();
    expect(
      screen.getByText("11. Continuous Integration and Delivery (CI/CD)")
    ).toBeInTheDocument();
    expect(screen.getByText("12. Stay Up-to-date")).toBeInTheDocument();
  });

  test("applies correct CSS classes to the elements", () => {
    render(<Backend />);

    const paragraphs = screen.getAllByRole("paragraph");

    paragraphs.forEach((paragraph) => {
      if (!paragraph.classList.contains("text-gray-500")) {
        expect(paragraph).toHaveClass("leading-[30px]");
      }
    });
  });

  test("renders the breadcrumb navigation correctly", () => {
    render(<Backend />);

    const breadcrumbLink = screen.getByText("Roadmaps");
    expect(breadcrumbLink).toHaveAttribute("href", "/roadmaps");
  });
});
