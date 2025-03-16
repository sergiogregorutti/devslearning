import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";

export default function FullStackEs() {
  return (
    <>
      <PageHeader
        title="Desarrollador Full Stack"
        description="Comienza tu camino para convertirte en un Desarrollador Full Stack. Este roadmap describe las habilidades esenciales y las herramientas necesarias para convertirte en un desarrollador completo, capaz de trabajar tanto en el frontend como en el backend. Ya sea que estés comenzando desde cero o buscando mejorar tus habilidades, sigue este camino claro para dominar el stack de desarrollo completo."
        breadcrumb={[
          {
            name: "Carreras",
            link: "/roadmaps/",
          },
        ]}
      />
      <Container>
        <Heading
          as="h2"
          label="1. Aprende los Fundamentos de la Programación"
        />
        <p className="mb-6 leading-[30px]">
          Comienza con los conceptos básicos de la programación. Aprende a
          trabajar con variables, estructuras de control, funciones y objetos,
          usando un lenguaje de programación como JavaScript, Python o Ruby.
        </p>

        <Heading as="h2" label="2. Aprende HTML, CSS y JavaScript" />
        <p className="mb-6 leading-[30px]">
          Domina las tecnologías clave para la creación de sitios web. Aprende
          cómo estructurar y diseñar tus sitios web usando HTML y CSS, y aprende
          JavaScript para agregar interactividad.
        </p>

        <Heading as="h2" label="3. Control de Versiones (Git)" />
        <p className="mb-6 leading-[30px]">
          Git es esencial para el control de versiones y la colaboración en
          proyectos. Aprende a usar Git para hacer seguimiento de cambios y
          colaborar en tu código con otras personas.
        </p>

        <Heading
          as="h2"
          label="4. Frameworks de JavaScript (React.js, Vue.js, Angular)"
        />
        <p className="mb-6 leading-[30px]">
          Aprende a usar frameworks de JavaScript como React, Vue.js o Angular
          para crear aplicaciones web modernas y escalables. Domina la creación
          de componentes reutilizables y gestión de estado.
        </p>

        <Heading as="h2" label="5. Backend Development (Node.js, Express.js)" />
        <p className="mb-6 leading-[30px]">
          Aprende a construir el backend de tus aplicaciones usando Node.js y
          Express.js. Gestiona bases de datos, autentificación de usuarios, y
          crea APIs RESTful para interactuar con el frontend.
        </p>

        <Heading as="h2" label="6. Bases de Datos (SQL y NoSQL)" />
        <p className="mb-6 leading-[30px]">
          Aprende a gestionar y almacenar datos en bases de datos. Domina bases
          de datos relacionales como PostgreSQL y MySQL, y bases de datos NoSQL
          como MongoDB.
        </p>

        <Heading as="h2" label="7. Desarrollo de APIs (RESTful y GraphQL)" />
        <p className="mb-6 leading-[30px]">
          Aprende a construir y consumir APIs. Domina las APIs RESTful y explora
          GraphQL como una alternativa más eficiente para consultar datos y
          mejorar la interacción entre el frontend y el backend.
        </p>

        <Heading as="h2" label="8. Testing (Jest, Mocha, Cypress)" />
        <p className="mb-6 leading-[30px]">
          Es esencial realizar pruebas para asegurar que tu código funcione
          correctamente. Aprende a escribir pruebas unitarias y de integración,
          y a usar herramientas como Jest, Mocha y Cypress.
        </p>

        <Heading
          as="h2"
          label="9. Despliegue y Hosting (Netlify, Vercel, AWS)"
        />
        <p className="mb-6 leading-[30px]">
          Aprende a desplegar tus aplicaciones full stack. Domina plataformas
          como Netlify, Vercel y AWS para alojar tanto el frontend como el
          backend y garantizar que tu aplicación esté lista para producción.
        </p>

        <Heading as="h2" label="10. DevOps y CI/CD" />
        <p className="mb-6 leading-[30px]">
          La integración continua y el despliegue continuo (CI/CD) son claves en
          el desarrollo full stack. Aprende a automatizar las pruebas, el
          despliegue y la integración usando herramientas como Jenkins, Travis
          CI y GitHub Actions.
        </p>

        <Heading as="h2" label="11. Seguridad" />
        <p className="mb-6 leading-[30px]">
          Aprende las mejores prácticas de seguridad en el desarrollo full
          stack, desde la protección de datos hasta la implementación de
          políticas de seguridad para el backend y el frontend.
        </p>

        <Heading as="h2" label="12. Mantente Actualizado" />
        <p className="mb-6 leading-[30px]">
          El desarrollo full stack está en constante evolución. Mantente al día
          con nuevas herramientas, tecnologías y mejores prácticas para seguir
          siendo competitivo en la industria. Participa en la comunidad y sigue
          aprendiendo.
        </p>
      </Container>
    </>
  );
}
