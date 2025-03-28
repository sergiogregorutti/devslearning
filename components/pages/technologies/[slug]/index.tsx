"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";

interface TechnologyProps {
  technology: any;
}

const Technology: React.FC<TechnologyProps> = ({ technology }) => {
  const { lang, dictionary } = useLanguage();

  return (
    <>
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
      <Container className="pb-10">
        <div
          className="wysiwyg-content mb-5"
          dangerouslySetInnerHTML={{
            __html:
              lang === "en"
                ? technology.long_description
                : technology.long_description_es,
          }}
        ></div>
        {lang === "en" ? (
          <>
            <Heading
              as="h2"
              label={`Do you want to learn ${technology.name}?`}
            />
            <p className="mb-3">
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
            <Heading as="h2" label={`¿Querés aprender {technology.name}?`} />
            <p className="mb-3">
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
    </>
  );
};

export default Technology;
