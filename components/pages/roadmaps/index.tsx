"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import Link from "next/link";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";

const RoadmapLink = ({
  lang,
  path,
  name,
}: {
  lang: string;
  path: string;
  name: string;
}) => (
  <Link
    href={getLocalizedPathFromPrefix(lang, path)}
    aria-label={`View the ${name} roadmap`}
    className="font-poppins text-white text-center text-[22px] p-4 min-h-[100px] flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-2xl transition-all duration-500"
  >
    {name}
  </Link>
);

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
            <RoadmapLink
              lang={lang}
              path="/roadmaps/frontend"
              name={roadmaps.frontendName}
            />
            <RoadmapLink
              lang={lang}
              path="/roadmaps/backend"
              name={roadmaps.backendName}
            />
            <RoadmapLink
              lang={lang}
              path="/roadmaps/fullstack"
              name={roadmaps.fullstackName}
            />
          </div>
        </section>
      </Container>
    </>
  );
};

export default Roadmaps;
