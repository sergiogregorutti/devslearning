import { render, screen } from "@testing-library/react";
import Frontend from ".";

describe("FrontendEs Component", () => {
  test("renders the correct page title and description", () => {
    render(<Frontend />);

    expect(screen.getByText("Desarrollador Frontend")).toBeInTheDocument();

    expect(
      screen.getByText(
        "¡Comienza tu camino para convertirte en un Desarrollador Frontend! Esta hoja de ruta describe las habilidades y herramientas esenciales necesarias para crear sitios web y aplicaciones web impresionantes y responsivas. Ya sea que estés comenzando desde cero o buscando mejorar tus habilidades, sigue este camino claro para dominar el stack de desarrollo frontend."
      )
    ).toBeInTheDocument();
  });

  test("renders the roadmap steps in Spanish", () => {
    render(<Frontend />);

    expect(screen.getByText("1. Aprende HTML & CSS")).toBeInTheDocument();
    expect(
      screen.getByText("2. Familiarízate con JavaScript")
    ).toBeInTheDocument();
    expect(
      screen.getByText("3. Control de versiones (Git)")
    ).toBeInTheDocument();
    expect(screen.getByText("4. Diseño responsive")).toBeInTheDocument();
    expect(
      screen.getByText("5. Preprocesadores CSS (SASS/LESS)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("6. Frameworks y bibliotecas de JavaScript (React.js)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("7. Gestores de paquetes (NPM/Yarn)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("8. Herramientas de construcción (Webpack/Babel)")
    ).toBeInTheDocument();
    expect(screen.getByText("9. APIs (RESTful y GraphQL)")).toBeInTheDocument();
    expect(screen.getByText("10. Pruebas (Jest, Mocha)")).toBeInTheDocument();
    expect(
      screen.getByText("11. Despliegue (Netlify, Vercel)")
    ).toBeInTheDocument();
    expect(screen.getByText("12. Mantente actualizado")).toBeInTheDocument();
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

    const breadcrumbLink = screen.getByText("Carreras");
    expect(breadcrumbLink).toHaveAttribute("href", "/es/roadmaps");
  });
});
