import { render, screen } from "@testing-library/react";
import Backend from ".";

describe("Backend Component", () => {
  test("renders the correct page title and description", () => {
    render(<Backend />);

    expect(screen.getByText("Desarrollador Backend")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Comienza tu camino para convertirte en un Desarrollador Backend. Este roadmap describe las habilidades esenciales y las herramientas necesarias para crear sistemas backend robustos y escalables. Ya sea que estés comenzando desde cero o buscando mejorar tus habilidades, sigue este camino claro para dominar el stack de desarrollo backend."
      )
    ).toBeInTheDocument();
  });

  test("renders the roadmap steps in Spanish", () => {
    render(<Backend />);

    expect(
      screen.getByText("1. Aprende los Fundamentos de la Programación")
    ).toBeInTheDocument();
    expect(
      screen.getByText("2. Aprende sobre Bases de Datos")
    ).toBeInTheDocument();
    expect(
      screen.getByText("3. Aprende sobre Servidores Web")
    ).toBeInTheDocument();
    expect(screen.getByText("4. Entiende las APIs REST")).toBeInTheDocument();
    expect(
      screen.getByText("5. Autenticación y Autorización")
    ).toBeInTheDocument();
    expect(
      screen.getByText("6. Aprende sobre Frameworks Web")
    ).toBeInTheDocument();
    expect(
      screen.getByText("7. Aprende sobre Estructuras de Datos y Algoritmos")
    ).toBeInTheDocument();
    expect(
      screen.getByText("8. Control de Versiones (Git)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("9. Testing (Pruebas Unitarias e Integración)")
    ).toBeInTheDocument();
    expect(screen.getByText("10. Despliegue y Hosting")).toBeInTheDocument();
    expect(
      screen.getByText("11. Integración Continua y Entrega Continua (CI/CD)")
    ).toBeInTheDocument();
    expect(screen.getByText("12. Mantente Actualizado")).toBeInTheDocument();
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

    const breadcrumbLink = screen.getByText("Carreras");
    expect(breadcrumbLink).toHaveAttribute("href", "/roadmaps");
  });
});
