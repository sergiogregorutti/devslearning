import { render, screen } from "@testing-library/react";
import Frontend from ".";

describe("FrontendEn Component", () => {
  test("renders the correct page title and description", () => {
    render(<Frontend />);

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Start your journey to becoming a Frontend Developer! This roadmap outlines the essential skills and tools needed to build stunning, responsive websites and web applications. Whether you’re starting from scratch or looking to level up your skills, follow this clear path to master the frontend development stack."
      )
    ).toBeInTheDocument();
  });

  test("renders the roadmap steps in English", () => {
    render(<Frontend />);

    expect(screen.getByText("1. Learn HTML & CSS")).toBeInTheDocument();
    expect(
      screen.getByText("2. Get Comfortable with JavaScript")
    ).toBeInTheDocument();
    expect(screen.getByText("3. Version Control (Git)")).toBeInTheDocument();
    expect(screen.getByText("4. Responsive Design")).toBeInTheDocument();
    expect(
      screen.getByText("5. CSS Preprocessors (SASS/LESS)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("6. JavaScript Frameworks & Libraries (React.js)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("7. Package Managers (NPM/Yarn)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("8. Build Tools (Webpack/Babel)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("9. APIs (RESTful and GraphQL)")
    ).toBeInTheDocument();
    expect(screen.getByText("10. Testing (Jest, Mocha)")).toBeInTheDocument();
    expect(
      screen.getByText("11. Deployment (Netlify, Vercel)")
    ).toBeInTheDocument();
    expect(screen.getByText("12. Stay Up-to-date")).toBeInTheDocument();
  });

  test("applies correct CSS classes to the elements", () => {
    render(<Frontend />);

    const paragraphs = screen.getAllByRole("paragraph");

    paragraphs.forEach((paragraph) => {
      if (!paragraph.classList.contains("text-gray-500")) {
        expect(paragraph).toHaveClass("mb-6");
      }
    });
  });

  test("renders the breadcrumb navigation correctly", () => {
    render(<Frontend />);

    const breadcrumbLink = screen.getByText("Roadmaps");
    expect(breadcrumbLink).toHaveAttribute("href", "/roadmaps");
  });
});
