import type { Metadata } from "next";
import BackendPage from "@/components/pages/roadmaps/backend/Backend";

type Props = {
  params: Promise<{ lang: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  let pageTitle;
  let description;

  switch (params.lang) {
    case "en":
      pageTitle = "Backend Developer Roadmap | Devs Learning";
      description =
        "Explore the Backend Developer Roadmap at Devs Learning. Learn essential skills and technologies for becoming a backend developer. Get started with databases, server-side programming, APIs, and more in a structured path.";
      break;

    case "es":
      pageTitle =
        "Ruta de aprendizaje de Desarrollador Backend | Devs Learning";
      description =
        "Explora la Carrera de Desarrollador Backend en Devs Learning. Aprende habilidades y tecnologías esenciales para convertirte en un desarrollador backend. Comienza con bases de datos, programación del lado del servidor, APIs y más en un camino estructurado.";
      break;
  }

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      siteName: "Devs Learning",
      images: [
        {
          url: "https://devslearning.com/assets/opengraph-image.png",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["https://devslearning.com/assets/opengraph-image.png"],
    },
  };
}

export default async function Backend(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { lang } = params;

  return <BackendPage lang={lang} />;
}
