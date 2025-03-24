"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import PageHeader from "@/components/layout/PageHeader";
import CourseDetail from "./_components/CourseDetail";
import RelatedCourses from "./_components/RelatedCourses";

interface CourseProps {
  course: any;
  relatedCourses: any;
}

const Course: React.FC<CourseProps> = ({ course, relatedCourses }) => {
  const { lang, dictionary } = useLanguage();

  return (
    <>
      <PageHeader
        title={course.name}
        description={course.description}
        image={course.image}
        imagePositionMobile="bottom"
        breadcrumb={[
          {
            name: dictionary.common.navigation.courses,
            link: getLocalizedPathFromPrefix(lang, `/courses/`),
          },
          {
            name: course.technologyName,
            link: getLocalizedPathFromPrefix(
              lang,
              `/technologies/${course.technologySlug}/courses?filters=${
                lang === "en" ? "english" : "spanish"
              }`
            ),
          },
        ]}
        previousPage={{ name: dictionary.common.goBack }}
      />
      <CourseDetail dictionary={dictionary} lang={lang} course={course} />
      <RelatedCourses relatedCourses={relatedCourses} />
    </>
  );
};

export default Course;
