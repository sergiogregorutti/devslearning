import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";

export default function BackendEs() {
  return (
    <>
      <PageHeader
        title="Desarrollador Backend"
        description="Comienza tu camino para convertirte en un Desarrollador Backend. Este roadmap describe las habilidades esenciales y las herramientas necesarias para crear sistemas backend robustos y escalables. Ya sea que estés comenzando desde cero o buscando mejorar tus habilidades, sigue este camino claro para dominar el stack de desarrollo backend."
        breadcrumb={[
          {
            name: "Carreras",
            link: "/roadmaps/",
          },
        ]}
      />
      <Container className="pb-10">
        <Heading
          as="h2"
          label="1. Aprende los Fundamentos de la Programación"
        />
        <p className="mb-6 leading-[30px]">
          Comienza con los fundamentos de la programación. Aprende a trabajar
          con variables, bucles, funciones y control de flujo. Elige un lenguaje
          de programación como JavaScript, Python o Ruby para construir tu base.
        </p>

        <Heading as="h2" label="2. Aprende sobre Bases de Datos" />
        <p className="mb-6 leading-[30px]">
          Aprende sobre bases de datos y cómo interactúan con las aplicaciones.
          Entiende SQL y bases de datos NoSQL como PostgreSQL, MySQL y MongoDB.
          Aprende a gestionar datos, crear tablas y realizar consultas.
        </p>

        <Heading as="h2" label="3. Aprende sobre Servidores Web" />
        <p className="mb-6 leading-[30px]">
          Los servidores web son la base del desarrollo backend. Aprende cómo
          configurar servidores web como Apache, Nginx o Express.js para manejar
          solicitudes HTTP, servir archivos y gestionar el enrutamiento.
        </p>

        <Heading as="h2" label="4. Entiende las APIs REST" />
        <p className="mb-6 leading-[30px]">
          Aprende cómo crear y consumir APIs RESTful. Entiende cómo trabajar con
          métodos HTTP como GET, POST, PUT, DELETE y cómo estructurar y
          gestionar rutas para manejar solicitudes.
        </p>

        <Heading as="h2" label="5. Autenticación y Autorización" />
        <p className="mb-6 leading-[30px]">
          Asegura tus aplicaciones con técnicas de autenticación y autorización.
          Aprende cómo implementar la autenticación de usuarios con herramientas
          como JWT (JSON Web Tokens) y OAuth para procesos de inicio de sesión
          seguros.
        </p>

        <Heading as="h2" label="6. Aprende sobre Frameworks Web" />
        <p className="mb-6 leading-[30px]">
          Domina frameworks backend como Express.js (Node.js), Django (Python) o
          Ruby on Rails. Estas herramientas ayudan a agilizar el desarrollo
          backend proporcionando funciones incorporadas como enrutamiento,
          seguridad y gestión de sesiones.
        </p>

        <Heading
          as="h2"
          label="7. Aprende sobre Estructuras de Datos y Algoritmos"
        />
        <p className="mb-6 leading-[30px]">
          El desarrollo backend requiere habilidades sólidas para resolver
          problemas. Aprende sobre estructuras de datos (arreglos, árboles,
          tablas hash) y algoritmos para manejar grandes cantidades de datos y
          optimizar el rendimiento.
        </p>

        <Heading as="h2" label="8. Control de Versiones (Git)" />
        <p className="mb-6 leading-[30px]">
          Git es esencial para gestionar el código en el desarrollo backend.
          Aprende a realizar commits, crear ramas, fusionar y trabajar con
          repositorios como GitHub para realizar un seguimiento de cambios y
          colaborar en equipos.
        </p>

        <Heading as="h2" label="9. Testing (Pruebas Unitarias e Integración)" />
        <p className="mb-6 leading-[30px]">
          Las pruebas son fundamentales para garantizar la fiabilidad de tu
          código backend. Aprende a escribir pruebas unitarias usando frameworks
          como Jest o Mocha, y realiza pruebas de integración para detectar
          errores y asegurar una interacción fluida entre componentes.
        </p>

        <Heading as="h2" label="10. Despliegue y Hosting" />
        <p className="mb-6 leading-[30px]">
          Aprende a desplegar tus aplicaciones backend en la nube o servidores
          locales. Adquiere experiencia con plataformas como Heroku, AWS o
          DigitalOcean para alojar tus aplicaciones y bases de datos.
        </p>

        <Heading
          as="h2"
          label="11. Integración Continua y Entrega Continua (CI/CD)"
        />
        <p className="mb-6 leading-[30px]">
          Automatiza tu proceso de desarrollo backend con herramientas de CI/CD.
          Aprende a integrar herramientas como Jenkins o GitHub Actions para
          automatizar pruebas, compilación y despliegue de tus aplicaciones
          backend.
        </p>

        <Heading as="h2" label="12. Mantente Actualizado" />
        <p className="leading-[30px]">
          El desarrollo backend está siempre en constante evolución. Mantente
          actualizado con las últimas herramientas, tecnologías y mejores
          prácticas. Participa en la comunidad de desarrolladores, asiste a
          meetups y sigue aprendiendo.
        </p>
      </Container>
    </>
  );
}
