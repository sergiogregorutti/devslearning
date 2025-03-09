import type { Metadata, ResolvingMetadata } from "next";
import dbConnect from "@/lib/dbConnect";
import { Technology } from "@/lib/models";
import { getDictionary } from "../../dictionaries";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Container from "@/components/layout/Container";

import "./styles.css";

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
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang);
  const technology = await getTechnology(slug);

  return (
    <div className="technology-page">
      <PageHeader
        title={technology.name}
        description={
          lang === "en" ? technology.description : technology.description_es
        }
        image={technology.imageColor}
        imagePositionMobile={"bottom"}
        breadcrumb={[
          {
            name: dictionary.technologies.technologies,
            link: getLocalizedPathFromPrefix(lang, `/technologies/`),
          },
        ]}
      />
      <Container>
        <div
          className="long-description"
          dangerouslySetInnerHTML={{
            __html:
              lang === "en"
                ? technology.long_description
                : technology.long_description_es,
          }}
        ></div>
        {lang === "en" ? (
          <>
            <h2>Do you want to learn {technology.name}?</h2>
            <p>
              We got you covered! We have carefully curated the most popular{" "}
              {technology.name} courses, both free and paid. So you can start
              learning it right away!
            </p>
            <Button
              label={`View ${technology.name} Courses`}
              href={getLocalizedPathFromPrefix(
                lang,
                `/technologies/${technology.slug}/courses?filters=${
                  lang === "en" ? "english" : "spanish"
                }`
              )}
              className="inline-block mt-3"
            />
          </>
        ) : (
          <>
            <h2>¿Querés aprender {technology.name}?</h2>
            <p>
              ¡Te tenemos cubierto! Hemos seleccionado cuidadosamente los cursos
              de {technology.name} más populares, tanto gratuitos como de pago.
              ¡Así que puedes empezar a aprender de inmediato!
            </p>
            <Button
              label={`Ver Cursos de ${technology.name}`}
              href={getLocalizedPathFromPrefix(
                lang,
                `/technologies/${technology.slug}/courses?filters=${
                  lang === "en" ? "english" : "spanish"
                }`
              )}
              className="inline-block mt-3"
            />
          </>
        )}
      </Container>
    </div>
  );
}
