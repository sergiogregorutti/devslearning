import type { Metadata } from "next";
import { Language } from "@/interfaces/course";
import RoadmapsPage from "@/components/pages/roadmaps";

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
      pageTitle = "Roadmaps | Devs Learning";
      description =
        "Discover structured learning paths at Devs Learning. Explore detailed roadmaps for Frontend, Backend, and Full Stack development. Start your journey into web development with clear and actionable guides.";
      break;

    case "es":
      pageTitle = "Carreras | Devs Learning";
      description =
        "Descubre rutas de aprendizaje estructurados en Devs Learning. Explora carreras detalladas para desarrollo Frontend, Backend y Full Stack. Comienza tu camino en el desarrollo web con guías claras y prácticas.";
      break;
  }

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: "https://www.devslearning.com/roadmaps",
      languages: {
        es: "https://www.devslearning.com/es/roadmaps",
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

export default async function Roadmaps() {
  return <RoadmapsPage />;
}
