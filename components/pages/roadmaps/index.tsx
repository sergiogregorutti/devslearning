"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import CardLink from "@/components/ui/CardLink";

const Roadmaps: React.FC = () => {
  const { lang, dictionary } = useLanguage();
  const { roadmaps } = dictionary;

  return (
    <>
      <PageHeader
        title={roadmaps.title}
        description={roadmaps.description}
        image="/assets/girl.svg"
      />
      <Container>
        <section>
          <h2>{roadmaps.journeyTitle}</h2>
          <p className="mb-6 leading-[30px]">{roadmaps.journeyDescription}</p>
        </section>

        <section>
          <h2>{roadmaps.rolesTitle}</h2>

          <div>
            <h3>{roadmaps.frontendName}</h3>
            <p className="mb-6 leading-[30px]">
              {roadmaps.frontendDescription}
            </p>

            <h3>{roadmaps.backendName}</h3>
            <p className="mb-6 leading-[30px]">{roadmaps.backendDescription}</p>

            <h3>{roadmaps.fullstackName}</h3>
            <p className="mb-6 leading-[30px]">
              {roadmaps.fullstackDescription}
            </p>
          </div>
        </section>

        <section>
          <h2>{roadmaps.chooseYourPath}</h2>
          <div className="grid md:grid-cols-3 gap-x-[40px] gap-y-[20px] mt-6">
            <CardLink
              title={roadmaps.frontendName}
              href={getLocalizedPathFromPrefix(lang, "/roadmaps/frontend")}
            />
            <CardLink
              title={roadmaps.backendName}
              href={getLocalizedPathFromPrefix(lang, "/roadmaps/backend")}
            />
            <CardLink
              title={roadmaps.fullstackName}
              href={getLocalizedPathFromPrefix(lang, "/roadmaps/fullstack")}
            />
          </div>
        </section>
      </Container>
    </>
  );
};

export default Roadmaps;
