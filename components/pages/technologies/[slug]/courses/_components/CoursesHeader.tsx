import PageHeader from "@/components/layout/PageHeader";
import { getLocalizedPathFromPrefix } from "@/lib/language";

const CoursesHeader = ({ technology, lang, dictionary }: any) => {
  return (
    <PageHeader
      title={
        lang === "en"
          ? `${technology.name} Courses`
          : `Cursos de ${technology.name}`
      }
      description={
        lang === "en"
          ? `Discover our selection of the best ${technology.name} courses, carefully curated to help you master web development.`
          : `Descubre nuestra selección de los mejores cursos de ${technology.name}, cuidadosamente seleccionados para ayudarte a dominar el desarrollo web.`
      }
      image={technology.imageColor}
      imageMobileHidden={true}
      descriptionMobileHidden={true}
      breadcrumb={[
        {
          name: dictionary.common.navigation.courses,
          link: getLocalizedPathFromPrefix(lang, `/courses/`),
        },
      ]}
    />
  );
};

export default CoursesHeader;
