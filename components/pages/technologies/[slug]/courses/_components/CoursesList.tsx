import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { FaUser } from "react-icons/fa6";
import { getLocalizedPathFromPrefix } from "@/lib/language";

const CoursesList = ({ courses, dictionary, lang }: any) => {
  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {courses.map((course: any) => (
        <Card key={course._id} className="overflow-hidden bg-white">
          <div className="flex flex-row">
            <div className="w-1/4 relative bg-neutral-100 flex items-start">
              <img
                src={course.image}
                alt={course.name}
                className="py-4 md:py-6 w-full object-contain relative z-1"
              />
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-48 md:h-full object-cover absolute blur-sm opacity-20"
              />
            </div>
            <div className="p-4 md:p-6 w-3/4 flex flex-col">
              <div className="order-3 md:order-1 flex flex-wrap items-center gap-2 mb-2">
                <Badge>
                  {course.language === "en"
                    ? dictionary.technologies.english
                    : dictionary.technologies.spanish}
                </Badge>
                {course.platform !== "" && (
                  <Badge variant="outline">{course.platform}</Badge>
                )}
                <Badge variant="outline">{course.year}</Badge>
                <span
                  className={`w-100 md:w-auto md:ml-auto text-sm font-medium ${
                    course.pricing === "free" ? "text-green-600" : ""
                  }`}
                >
                  {course.pricing === "free"
                    ? dictionary.technologies.pricingFree
                    : `USD $${course.price}`}
                </span>
              </div>
              <h3 className="order1 md:order-2 text-base md:text-xl leading-[16px] md:leading-[20px] font-semibold mb-1 md:mb-2">
                {course.name}
              </h3>
              <p className="order-2 md:order-3 text-xs md:text-sm text-gray-600 mb-2 md:mb-4">
                {course.description}
              </p>
              <div className="order-4 mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="hidden md:flex items-center gap-2">
                  {course.author !== "" && (
                    <>
                      <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                        <FaUser className="text-neutral-500" />
                      </div>
                      <span className="text-sm">{course.author}</span>
                    </>
                  )}
                </div>
                <Button
                  href={getLocalizedPathFromPrefix(
                    lang,
                    `/courses/${course._id}/`
                  )}
                  className="w-[100%] md:w-auto text-sm md:text-lg py-[5px] md:py-[9px] px-[20px] md:px-[28px]"
                >
                  {dictionary.technologies.viewMore}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CoursesList;
