import { render, screen } from "@testing-library/react";
import FullStack from ".";

describe("FullStackEs Component", () => {
  test("renders the correct page title and description", () => {
    render(<FullStack />);

    expect(screen.getByText("Desarrollador Full Stack")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Comienza tu camino para convertirte en un Desarrollador Full Stack. Este roadmap describe las habilidades esenciales y las herramientas necesarias para convertirte en un desarrollador completo, capaz de trabajar tanto en el frontend como en el backend. Ya sea que estés comenzando desde cero o buscando mejorar tus habilidades, sigue este camino claro para dominar el stack de desarrollo completo."
      )
    ).toBeInTheDocument();
  });

  test("renders the roadmap steps in Spanish", () => {
    render(<FullStack />);

    expect(
      screen.getByText("1. Aprende los Fundamentos de la Programación")
    ).toBeInTheDocument();
    expect(
      screen.getByText("2. Aprende HTML, CSS y JavaScript")
    ).toBeInTheDocument();
    expect(
      screen.getByText("3. Control de Versiones (Git)")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "4. Frameworks de JavaScript (React.js, Vue.js, Angular)"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("5. Backend Development (Node.js, Express.js)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("6. Bases de Datos (SQL y NoSQL)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("7. Desarrollo de APIs (RESTful y GraphQL)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("8. Testing (Jest, Mocha, Cypress)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("9. Despliegue y Hosting (Netlify, Vercel, AWS)")
    ).toBeInTheDocument();
    expect(screen.getByText("10. DevOps y CI/CD")).toBeInTheDocument();
    expect(screen.getByText("11. Seguridad")).toBeInTheDocument();
    expect(screen.getByText("12. Mantente Actualizado")).toBeInTheDocument();
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

    const breadcrumbLink = screen.getByText("Carreras");
    expect(breadcrumbLink).toHaveAttribute("href", "/roadmaps");
  });
});
