import HeroSlider from "./_components/HeroSlider";
import StatsSection from "./_components/StatsSection";
import CoursesSection from "./_components/CoursesSection";
import TechnologiesSection from "./_components/TechnologiesSection";
import RoadmapsSection from "./_components/RoadmapsSection";

interface HomepageProps {
  technologies: any;
}

const Homepage: React.FC<HomepageProps> = ({ technologies }) => {
  return (
    <>
      <HeroSlider />
      <StatsSection />
      <CoursesSection technologies={technologies} />
      <TechnologiesSection />
      <RoadmapsSection />
    </>
  );
};

export default Homepage;
