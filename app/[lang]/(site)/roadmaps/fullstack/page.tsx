import type { Metadata } from "next";
import FullstackPage from "@/components/pages/roadmaps/fullstack";
import { Language } from "@/interfaces/course";

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
      pageTitle = "Fullstack Developer Roadmap | Devs Learning";
      description =
        "Explore the Fullstack Developer Roadmap at Devs Learning. Learn the essential skills and technologies for becoming a fullstack developer. Get started with both frontend and backend development, including databases, APIs, and more in a structured path.";
      break;

    case "es":
      pageTitle =
        "Ruta de aprendizaje de Desarrollador Fullstack | Devs Learning";
      description =
        "Explora la Carrera de Desarrollador Fullstack en Devs Learning. Aprende las habilidades y tecnologías esenciales para convertirte en un desarrollador fullstack. Comienza con el desarrollo tanto de frontend como de backend, incluyendo bases de datos, APIs y más en un camino estructurado.";
      break;
  }

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: "https://www.devslearning.com/roadmaps/fullstack",
      languages: {
        es: "https://www.devslearning.com/es/roadmaps/fullstack",
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

export default async function Fullstack() {
  return <FullstackPage />;
}
