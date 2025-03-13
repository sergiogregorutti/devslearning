"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import CategoriesList from "./_components/CategoriesList";

interface CoursesProps {
  categories: any;
}

const Courses: React.FC<CoursesProps> = ({ categories }) => {
  const { dictionary } = useLanguage();

  return (
    <>
      <PageHeader
        title={dictionary.courses.title}
        description={dictionary.courses.description}
        image="/assets/boy2.svg"
      />
      <Container>
        <CategoriesList categories={categories} />
      </Container>
    </>
  );
};

export default Courses;
