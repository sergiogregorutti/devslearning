import type { Metadata, ResolvingMetadata } from "next";
import dbConnect from "@/lib/dbConnect";
import { Technology } from "@/lib/models";
import TechnologyPageComponent from "@/components/pages/technologies/[slug]";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

async function getTechnology(slug: String) {
  await dbConnect();

  const technology = await Technology.findOne({ slug: slug }).exec();

  return {
    ...technology.toObject(),
    _id: technology._id.toString(),
    technologyCategory: technology.technologyCategory.toString(),
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { lang, slug } = await params;
  const technologyData = await getTechnology(slug);

  let pageTitle;
  let description;

  switch (lang) {
    case "en":
      pageTitle = `${technologyData.name} | Devs Learning`;
      description = `Learn ${technologyData.name} from scratch with Devs Learning. Discover what ${technologyData.name} is, how it works, and how it's used to build websites. Check out our ${technologyData.name} courses and start developing your skills today.`;
      break;

    case "es":
      pageTitle = `${technologyData.name} | Devs Learning`;
      description = `Aprende ${technologyData.name} desde cero con Devs Learning. Descubre qué es ${technologyData.name}, para qué sirve, y cómo se utiliza. Accede a nuestros cursos de ${technologyData.name} y empieza a desarrollar tus habilidades hoy mismo.`;
      break;
  }

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `https://www.devslearning.com/technologies/${slug}`,
      languages: {
        es: `https://www.devslearning.com/es/technologies/${slug}`,
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

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const technology = await getTechnology(slug);

  return <TechnologyPageComponent technology={technology} />;
}
