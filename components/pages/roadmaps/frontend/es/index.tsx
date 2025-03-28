import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Heading from "@/components/ui/Heading";

export default function FrontendEs() {
  return (
    <>
      <PageHeader
        title="Desarrollador Frontend"
        description="¡Comienza tu camino para convertirte en un Desarrollador Frontend! Esta hoja de ruta describe las habilidades y herramientas esenciales necesarias para crear sitios web y aplicaciones web impresionantes y responsivas. Ya sea que estés comenzando desde cero o buscando mejorar tus habilidades, sigue este camino claro para dominar el stack de desarrollo frontend."
        breadcrumb={[
          {
            name: "Carreras",
            link: "/es/roadmaps/",
          },
        ]}
      />
      <Container className="pb-10">
        <Heading as="h2" label="1. Aprende HTML & CSS" />
        <p className="mb-6 leading-[30px]">
          HTML es la columna vertebral del desarrollo web. Aprende a estructurar
          tu contenido utilizando HTML y a estilizarlo con CSS para crear sitios
          web visualmente atractivos. Domina conceptos como el Modelo de Caja,
          Flexbox, Grid y diseño responsive para asegurarte de que tu sitio
          funcione en todos los dispositivos.
        </p>
        <Heading as="h2" label="2. Familiarízate con JavaScript" />
        <p className="mb-6 leading-[30px]">
          JavaScript agrega interactividad y comportamiento dinámico a tus
          sitios web. Aprende lo básico como variables, funciones y bucles, y
          avanza hacia conceptos más complejos como manipulación del DOM,
          eventos y programación asincrónica.
        </p>
        <Heading as="h2" label="3. Control de versiones (Git)" />
        <p className="mb-6 leading-[30px]">
          Git es esencial para la colaboración y control de versiones en el
          desarrollo web. Aprende lo básico de Git, cómo hacer commits, crear
          ramas, hacer merges y trabajar con GitHub para colaborar en equipo.
        </p>
        <Heading as="h2" label="4. Diseño responsive" />
        <p className="mb-6 leading-[30px]">
          El diseño responsive asegura que tu sitio web se vea genial en todos
          los tamaños de pantalla. Aprende a usar media queries, layouts fluidos
          y diseño mobile-first para crear interfaces web flexibles y fáciles de
          usar.
        </p>
        <Heading as="h2" label="5. Preprocesadores CSS (SASS/LESS)" />
        <p className="mb-6 leading-[30px]">
          Preprocesadores como SASS y LESS ayudan a escribir CSS más limpio y
          eficiente. Aprende a usar variables, anidamiento y mixins para
          optimizar tu flujo de trabajo en CSS y mejorar la mantenibilidad.
        </p>
        <Heading
          as="h2"
          label="6. Frameworks y bibliotecas de JavaScript (React.js)"
        />
        <p className="mb-6 leading-[30px]">
          React.js es una poderosa biblioteca de JavaScript utilizada para
          construir aplicaciones web modernas. Aprende a crear componentes
          reutilizables, gestionar el estado y usar hooks para un desarrollo más
          eficiente y mejor rendimiento.
        </p>
        <Heading as="h2" label="7. Gestores de paquetes (NPM/Yarn)" />
        <p className="mb-6 leading-[30px]">
          Los gestores de paquetes como NPM y Yarn ayudan a gestionar las
          dependencias de tu proyecto. Aprende a instalar, actualizar y
          organizar bibliotecas y herramientas, manteniendo tu proyecto
          eficiente y actualizado.
        </p>
        <Heading
          as="h2"
          label="8. Herramientas de construcción (Webpack/Babel)"
        />
        <p className="mb-6 leading-[30px]">
          Webpack y Babel son esenciales para empaquetar y transpilar tu código.
          Comprende cómo configurar estas herramientas para optimizar el
          rendimiento y garantizar la compatibilidad entre navegadores.
        </p>
        <Heading as="h2" label="9. APIs (RESTful y GraphQL)" />
        <p className="mb-6 leading-[30px]">
          Aprende a interactuar con APIs utilizando solicitudes HTTP. Comienza
          con APIs RESTful y luego avanza a GraphQL para consultar datos de
          manera más eficiente y permitir interacciones complejas entre tu
          frontend y backend.
        </p>
        <Heading as="h2" label="10. Pruebas (Jest, Mocha)" />
        <p className="mb-6 leading-[30px]">
          Las pruebas aseguran que tu código funcione sin problemas y según lo
          esperado. Aprende a escribir pruebas unitarias y realizar pruebas de
          integración para detectar errores y mejorar la confiabilidad de tus
          aplicaciones web.
        </p>
        <Heading as="h2" label="11. Despliegue (Netlify, Vercel)" />
        <p className="mb-6 leading-[30px]">
          Aprende cómo desplegar tus aplicaciones utilizando plataformas
          modernas como Netlify y Vercel. Domina el proceso de llevar tu código
          a producción con pipelines de Continuous Deployment (CD) y monitorea
          el rendimiento de tu sitio.
        </p>
        <Heading as="h2" label="12. Mantente actualizado" />
        <p className="leading-[30px]">
          El desarrollo frontend está en constante evolución. Mantente al día
          con los últimos frameworks, mejores prácticas y herramientas para
          asegurarte de estar siempre a la vanguardia como desarrollador
          frontend. Sigue blogs, asiste a eventos y participa en la comunidad.
        </p>
      </Container>
    </>
  );
}
