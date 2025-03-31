import type { Metadata } from "next";
import { Language } from "@/interfaces/course";
import FrontendPage from "@/components/pages/roadmaps/frontend";

type Props = {
  params: Promise<{ lang: Language; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  let pageTitle;
  let description;

  switch (params.lang) {
    case "en":
      pageTitle = "Frontend Developer Roadmap | Devs Learning";
      description =
        "Explore the Frontend Developer Roadmap at Devs Learning. Learn essential skills and technologies for becoming a frontend developer. Get started with HTML, CSS, JavaScript, and more in a structured path.";
      break;

    case "es":
      pageTitle =
        "Ruta de aprendizaje de Desarrollador Frontend | Devs Learning";
      description =
        "Explora la Carrera de Desarrollador Frontend en Devs Learning. Aprende habilidades y tecnologías esenciales para convertirte en un desarrollador frontend. Comienza con HTML, CSS, JavaScript y más en un camino estructurado.";
      break;
  }

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: "https://www.devslearning.com/roadmaps/frontend",
      languages: {
        es: "https://www.devslearning.com/es/roadmaps/frontend",
      },
    },
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

export default async function Frontend() {
  return <FrontendPage />;
}
