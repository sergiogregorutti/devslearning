import HeroSlider from "./_components/HeroSlider";
import CoursesSection from "./_components/CoursesSection";
import LatestCourses from "./_components/LatestCourses";
import TechnologiesSection from "./_components/TechnologiesSection";
import RoadmapsSection from "./_components/RoadmapsSection";

interface HomepageProps {
  technologies: any;
  latestCourses: any;
}

const Homepage: React.FC<HomepageProps> = ({ technologies, latestCourses }) => {
  return (
    <>
      <HeroSlider />
      <CoursesSection technologies={technologies} />
      <LatestCourses latestCourses={latestCourses} />
      <TechnologiesSection />
      <RoadmapsSection />
    </>
  );
};

export default Homepage;
