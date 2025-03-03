import Link from "next/link";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";

export default function Roadmaps({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: any;
}) {
  return (
    <>
      <PageHeader
        title={dictionary.roadmaps.title}
        description={dictionary.roadmaps.description}
        image="/assets/girl.svg"
      />
      <Container>
        <h2>{dictionary.roadmaps.journeyTitle}</h2>
        <p className="mb-6 leading-[30px]">
          {dictionary.roadmaps.journeyDescription}
        </p>

        <h2>{dictionary.roadmaps.rolesTitle}</h2>
        <h3>{dictionary.roadmaps.frontendName}</h3>
        <p className="mb-6 leading-[30px]">
          {dictionary.roadmaps.frontendDescription}
        </p>
        <h3>{dictionary.roadmaps.backendName}</h3>
        <p className="mb-6 leading-[30px]">
          {dictionary.roadmaps.backendDescription}
        </p>
        <h3>{dictionary.roadmaps.fullstackName}</h3>
        <p className="mb-6 leading-[30px]">
          {dictionary.roadmaps.fullstackDescription}
        </p>

        <h2>{dictionary.roadmaps.chooseYourPath}</h2>
        <div className="grid grid-cols-3 gap-x-[40px] mt-6">
          <Link
            href={getLocalizedPathFromPrefix(lang, `/roadmaps/frontend`)}
            className="font-poppins text-white text-[22px] p-4 min-h-[100px] flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-2xl transition-all duration-500"
          >
            {dictionary.roadmaps.frontendName}
          </Link>
          <Link
            href={getLocalizedPathFromPrefix(lang, `/roadmaps/backend`)}
            className="font-poppins text-white text-[22px] p-4 min-h-[100px] flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-2xl transition-all duration-500"
          >
            {dictionary.roadmaps.backendName}
          </Link>
          <Link
            href={getLocalizedPathFromPrefix(lang, `/roadmaps/fullstack`)}
            className="font-poppins text-white text-[22px] p-4 min-h-[100px] flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-2xl transition-all duration-500"
          >
            {dictionary.roadmaps.fullstackName}
          </Link>
        </div>
      </Container>
    </>
  );
}
