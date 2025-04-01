import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getLocalizedPathFromPrefix } from "@/lib/language";

const CoursesGrid = ({ courses, dictionary, lang }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {courses.map((course: any) => (
        <Card
          key={course._id}
          className="overflow-hidden flex flex-col h-full bg-white"
        >
          <div className="relative pb-[56.25%] bg-gray-100">
            <img
              src={course.image}
              alt={course.name}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-48 md:h-full object-cover absolute blur-sm opacity-20"
            />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-2">
              <Badge>
                {course.language === "en"
                  ? dictionary.technologies.english
                  : dictionary.technologies.spanish}
              </Badge>
              <span
                className={`text-sm font-medium ${
                  course.pricing === "free" ? "text-green-600" : ""
                }`}
              >
                {course.pricing === "free"
                  ? dictionary.technologies.pricingFree
                  : `USD $${course.price}`}
              </span>
            </div>
            <h3 className="text-base md:text-xl leading-[16px] md:leading-[20px] font-semibold mb-2">
              {course.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {course.description}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>{course.platform}</span>
              <span>{course.author}</span>
              <span>{course.year}</span>
            </div>
            <Button
              href={getLocalizedPathFromPrefix(lang, `/courses/${course._id}/`)}
              className="w-full text-sm md:text-lg py-[5px] md:py-[9px] px-[20px] md:px-[28px]"
            >
              {dictionary.technologies.viewMore}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CoursesGrid;
