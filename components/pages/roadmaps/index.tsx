"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import CardLink from "@/components/ui/CardLink";
import Heading from "@/components/ui/Heading";

const Roadmaps: React.FC = () => {
  const { lang, dictionary } = useLanguage();
  const { roadmaps } = dictionary;

  return (
    <>
      <PageHeader
        title={roadmaps.title}
        description={roadmaps.description}
        image="/assets/home_hero/hero4.svg"
      />
      <Container className="pb-10 flex flex-col gap-10">
        <section>
          <Heading as="h2" label={roadmaps.journeyTitle} className="mb-3" />
          <p className="leading-[30px]">{roadmaps.journeyDescription}</p>
        </section>

        <section>
          <Heading as="h2" label={roadmaps.rolesTitle} className="mb-3" />

          <div>
            <Heading as="h3" label={roadmaps.frontendName} className="mt-5" />
            <p className="mb-6 leading-[30px]">
              {roadmaps.frontendDescription}
            </p>

            <Heading as="h3" label={roadmaps.backendName} className="mt-5" />
            <p className="mb-6 leading-[30px]">{roadmaps.backendDescription}</p>

            <Heading as="h3" label={roadmaps.fullstackName} className="mt-5" />
            <p className="leading-[30px]">{roadmaps.fullstackDescription}</p>
          </div>
        </section>

        <section>
          <Heading as="h2" label={roadmaps.chooseYourPath} className="mb-3" />
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
