import { render, screen } from "@testing-library/react";
import FullStack from ".";

describe("FullStackEn Component", () => {
  test("renders the correct page title and description", () => {
    render(<FullStack />);

    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Start your journey to becoming a Full Stack Developer! This roadmap outlines the essential skills and tools needed to become a complete developer, capable of working on both the frontend and backend. Whether you're starting from scratch or looking to level up your skills, follow this clear path to master the full stack development stack."
      )
    ).toBeInTheDocument();
  });

  test("renders the roadmap steps in English", () => {
    render(<FullStack />);

    expect(
      screen.getByText("1. Learn Programming Fundamentals")
    ).toBeInTheDocument();
    expect(
      screen.getByText("2. Learn HTML, CSS, and JavaScript")
    ).toBeInTheDocument();
    expect(screen.getByText("3. Version Control (Git)")).toBeInTheDocument();
    expect(
      screen.getByText("4. JavaScript Frameworks (React.js, Vue.js, Angular)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("5. Backend Development (Node.js, Express.js)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("6. Databases (SQL and NoSQL)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("7. API Development (RESTful and GraphQL)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("8. Testing (Jest, Mocha, Cypress)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("9. Deployment and Hosting (Netlify, Vercel, AWS)")
    ).toBeInTheDocument();
    expect(screen.getByText("10. DevOps and CI/CD")).toBeInTheDocument();
    expect(screen.getByText("11. Security")).toBeInTheDocument();
    expect(screen.getByText("12. Stay Up-to-date")).toBeInTheDocument();
  });

  test("applies correct CSS classes to the elements", () => {
    render(<FullStack />);

    const paragraphs = screen.getAllByRole("paragraph");

    paragraphs.forEach((paragraph) => {
      if (!paragraph.classList.contains("text-gray-500")) {
        expect(paragraph).toHaveClass("leading-[30px]");
      }
    });
  });

  test("renders the breadcrumb navigation correctly", () => {
    render(<FullStack />);

    const breadcrumbLink = screen.getByText("Roadmaps");
    expect(breadcrumbLink).toHaveAttribute("href", "/roadmaps");
  });
});
