"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import CategoriesList from "./_components/CategoriesList";

interface TechnologiesProps {
  categories: any;
}

const Technologies: React.FC<TechnologiesProps> = ({ categories }) => {
  const { dictionary } = useLanguage();

  return (
    <>
      <PageHeader
        title={dictionary.technologies.title}
        description={dictionary.technologies.description}
        image="/assets/home_hero/hero3.svg"
      />
      <Container className="pb-10">
        <CategoriesList categories={categories} />
      </Container>
    </>
  );
};

export default Technologies;
