import type { Metadata, ResolvingMetadata } from "next";
import dbConnect from "@/lib/dbConnect";
import { Course } from "@/lib/models";
import { Technology } from "@/lib/models";
import { fetchRelatedCourses } from "@/lib/data/courses";
import CoursePageComponent from "@/components/pages/courses/[id]";

type Props = {
  params: Promise<{ lang: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function getCourse(id: String) {
  await dbConnect();

  const course = await Course.findOne({ _id: id }).exec();
  const technology = await Technology.findOne(
    { _id: course.technology },
    "_id name slug"
  ).exec();

  return {
    _id: course._id.toString(),
    name: course.name,
    image: course.image,
    description: course.description,
    long_description: course.long_description,
    long_description_es: course.long_description_es,
    pricing: course.pricing,
    price: course.price,
    platform: course.platform,
    author: course.author,
    year: course.year,
    language: course.language,
    link: course.link,
    technologyId: technology._id.toString(),
    technologyName: technology.name,
    technologySlug: technology.slug,
  };
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const courseData = await getCourse(params.id);

  let pageTitle;
  let description;

  switch (params.lang) {
    case "en":
      pageTitle = `${courseData.name} | Devs Learning`;
      description = courseData.description;
      break;

    case "es":
      pageTitle = `${courseData.name} | Devs Learning`;
      description = courseData.description;
      break;
  }

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `https://www.devslearning.com/courses/${params.id}`,
      languages: {
        es: `https://www.devslearning.com/es/courses/${params.id}`,
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

export default async function CoursePage(props: {
  params: Promise<{ id: string; lang: string }>;
}) {
  const params = await props.params;
  const { id, lang } = params;
  const course = await getCourse(id);
  const relatedCourses = await fetchRelatedCourses(
    course.technologyId,
    course._id,
    lang
  );

  return (
    <CoursePageComponent course={course} relatedCourses={relatedCourses} />
  );
}
