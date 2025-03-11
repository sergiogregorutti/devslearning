import HeroSlider from "./_components/HeroSlider";
import StatsSection from "./_components/StatsSection";
import CoursesSection from "./_components/CoursesSection";
import TechnologiesSection from "./_components/TechnologiesSection";
import RoadmapsSection from "./_components/RoadmapsSection";

interface HomepageProps {
  technologies: any;
  lang: string;
  dictionary: any;
}

const Homepage: React.FC<HomepageProps> = ({
  technologies,
  lang,
  dictionary,
}) => {
  return (
    <>
      <HeroSlider dictionary={dictionary} lang={lang} />
      <StatsSection dictionary={dictionary} />
      <CoursesSection
        dictionary={dictionary}
        lang={lang}
        technologies={technologies}
      />
      <TechnologiesSection dictionary={dictionary} lang={lang} />
      <RoadmapsSection dictionary={dictionary} lang={lang} />
    </>
  );
};

export default Homepage;
