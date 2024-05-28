import type { Metadata, ResolvingMetadata } from "next";
import dbConnect from "../../../../../lib/dbConnect";
import Technology from "../../../../../models/Technology";
import Course from "../../../../../models/Course";
import Courses from "@/components/technologies/Courses";
import { getDictionary } from "../../dictionaries";

import "./styles.css";

type Props = {
  params: { lang: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getTechnology(id: String) {
  await dbConnect();

  const technology = await Technology.findById(
    id,
    "_id  name imageWhite"
  ).exec();

  return technology;
}

async function getCourses(id: String, lang: String) {
  await dbConnect();

  const courses = await Course.paginate(
    { technology: id, language: lang },
    {
      select: "-photo -technology",
      sort: "-price",
    }
  );

  return courses;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const technologyData = await getTechnology(params.id);

  let pageTitle;
  let description;

  switch (params.lang) {
    case "en":
      pageTitle = `${technologyData.name} courses | Devs Learning`;
      description = `The best courses to learn ${technologyData.name}`;
      break;

    case "es":
      pageTitle = `Cursos de ${technologyData.name} | Devs Learning`;
      description = `Los mejores cursos para aprender ${technologyData.name}`;
      break;
  }

  return {
    title: pageTitle,
    description,
  };
}

export default async function TechnologyPage({
  params: { lang, id },
}: {
  params: { lang: string; id: string };
}) {
  const dictionary = await getDictionary(lang);
  const technology = await getTechnology(id);
  const courses = await getCourses(id, lang);

  return (
    <div className="technology">
      <div className="heading">
        <div className="container">
          <img src={technology.imageWhite} alt={technology.name} />
          <h1>{technology.name}</h1>
        </div>
      </div>
      <div className="container">
        <Courses
          technologyId={JSON.parse(JSON.stringify(technology._id))}
          courses={JSON.parse(JSON.stringify(courses.docs))}
          dictionary={dictionary}
          language={lang}
        />
      </div>
    </div>
  );
}
