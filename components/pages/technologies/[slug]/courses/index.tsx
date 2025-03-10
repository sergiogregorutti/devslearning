"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaFilter,
  FaAngleDown,
  FaAngleUp,
  FaTableCells,
  FaListUl,
  FaUser,
} from "react-icons/fa6";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import PageHeader from "@/components/layout/PageHeader";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Badge from "@/components/ui/Badge";
import Sorting from "./_components/Sorting";
import Language from "./_components/Language";
import Pricing from "./_components/Pricing";
import Card from "./_components/Card";
import Pagination from "./_components/Pagination";

interface CoursesProps {
  technology: any;
  filtersArray: any;
  courses: any;
  coursesData: any;
  lang: string;
  dictionary: any;
}

const Courses: React.FC<CoursesProps> = ({
  technology,
  filtersArray,
  courses,
  coursesData,
  lang,
  dictionary,
}) => {
  const [activeFilters, setActiveFilters] = useState<string[]>(filtersArray);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f: any) => f !== filter));
  };

  const [stats, setStats] = useState({});

  useEffect(() => {
    const languageMap: Record<string, string> = {
      english: "en",
      spanish: "es",
    };

    const languageFilters = activeFilters
      .filter((f) => f === "english" || f === "spanish")
      .map((f) => languageMap[f]);

    const pricingFilters = activeFilters.filter(
      (f) => f === "free" || f === "paid"
    );

    const language =
      languageFilters.length > 0 ? languageFilters.join(",") : "";
    const pricing = pricingFilters.length > 0 ? pricingFilters.join(",") : "";

    async function fetchCourses() {
      try {
        const response = await fetch(
          `/api/technologies/${technology._id}/stats?language=${language}&pricing=${pricing}`
        );
        const data = await response.json();
        setStats(data);
      } catch (e) {
        console.error("Error fetching courses", e);
      }
    }

    fetchCourses();
  }, [activeFilters, technology._id]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    const currentFilters = newParams.get("filters")?.split(",") || [];
    const filtersString = activeFilters.join(",");

    if (newParams.has("page")) {
      newParams.delete("page");
    }

    if (filtersString && filtersString !== currentFilters.join(",")) {
      newParams.set("filters", filtersString);
    } else if (!filtersString) {
      newParams.delete("filters");
    }

    if (newParams.toString() !== searchParams.toString()) {
      replace(`${pathname}?${decodeURIComponent(newParams.toString())}`, {
        scroll: false,
      });
    }
  }, [activeFilters]);

  return (
    <>
      <PageHeader
        title={
          lang === "en"
            ? `${technology.name} Courses`
            : `Cursos de ${technology.name}`
        }
        description={
          lang === "en"
            ? `Discover our selection of the best ${technology.name} courses, carefully curated to help you master web development. You can filter courses by language and price, and sort them based on your preferences to find the perfect fit for your learning journey.`
            : `Descubre nuestra selección de los mejores cursos de ${technology.name}, cuidadosamente seleccionados para ayudarte a dominar el desarrollo web. Puedes filtrar los cursos por idioma y precio, y ordenarlos según tus preferencias para encontrar la opción perfecta para tu aprendizaje.`
        }
        image={technology.imageColor}
        imageMobileHidden={true}
        breadcrumb={[
          {
            name: dictionary.common.navigation.courses,
            link: getLocalizedPathFromPrefix(lang, `/courses/`),
          },
        ]}
      />
      <Container>
        <div className="md:hidden mb-6">
          <Button
            size="small"
            variant="outline"
            className="flex items-center gap-2 justify-between"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span className="flex items-center">
              <FaFilter className="mr-2" />
              {dictionary.courses.filters}
            </span>
            {showMobileFilters ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div
            className={`${
              showMobileFilters ? "block" : "hidden"
            } md:block h-fit sticky top-[80px]`}
          >
            <div className="hidden md:flex items-center justify-between mb-4">
              <h3>{dictionary.courses.filters}</h3>
            </div>
            <div className="space-y-6 sticky">
              <div>
                <Label className="mb-1.5 block">
                  {dictionary.courses.orderBy}
                </Label>
                <Sorting dictionary={dictionary} />
              </div>
              <div>
                <Label className="b-1.5 block">
                  {dictionary.courses.price}
                </Label>
                <Pricing
                  activeFilters={activeFilters}
                  addFilter={addFilter}
                  removeFilter={removeFilter}
                  stats={stats}
                  dictionary={dictionary}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">
                  {dictionary.courses.language}
                </Label>
                <Language
                  activeFilters={activeFilters}
                  addFilter={addFilter}
                  removeFilter={removeFilter}
                  stats={stats}
                  dictionary={dictionary}
                />
              </div>
              <div>
                <Button
                  className="w-full border-[1px] rounded-lg"
                  size="small"
                  variant="outline"
                  onClick={() => setActiveFilters([])}
                >
                  {dictionary.courses.clearFilters}
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            {activeFilters.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500 w-100 md:w-auto">
                  {dictionary.courses.activeFilters}:
                </span>
                {activeFilters.map((filter) => {
                  const translatedFilter =
                    {
                      free: lang === "en" ? "Free" : "Gratis",
                      paid: lang === "en" ? "Paid" : "Pago",
                      english: lang === "en" ? "English" : "Inglés",
                      spanish: lang === "en" ? "Spanish" : "Español",
                    }[filter] || filter;

                  return (
                    <Badge
                      key={filter}
                      variant="secondary"
                      className="flex items-center gap-1 capitalize font-bold"
                    >
                      {translatedFilter}
                      <button
                        onClick={() => removeFilter(filter)}
                        className="flex ml-1 hover:text-gray-700 cursor-pointer"
                      >
                        <Image
                          src="/assets/icons/close_black.svg"
                          width={10}
                          height={10}
                          alt="Close"
                        />
                      </button>
                    </Badge>
                  );
                })}
                <Button
                  variant="ghost"
                  size="extraSmall"
                  onClick={() => setActiveFilters([])}
                >
                  {dictionary.courses.clearFilters}
                </Button>
              </div>
            )}

            <div className="flex flex-row gap-4 md:gap-0 items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                {coursesData.totalPages > 1 && (
                  <>
                    {coursesData.startIndex}-{coursesData.endIndex}{" "}
                    {dictionary.courses.of}{" "}
                  </>
                )}
                {coursesData.totalDocs} {dictionary.courses.coursesFound}
              </p>
              <div className="flex border border-neutral-200 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="small"
                  className="flex items-center rounded-none px-3"
                  onClick={() => setViewMode("list")}
                >
                  <FaListUl className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:block">
                    {dictionary.courses.list}
                  </span>
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="small"
                  className="flex items-center rounded-none px-3"
                  onClick={() => setViewMode("grid")}
                >
                  <FaTableCells className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:block">
                    {dictionary.courses.grid}
                  </span>
                </Button>
              </div>
            </div>

            {viewMode === "list" && (
              <div className="flex flex-col gap-10 md:gap-14">
                {courses.map((course: any) => (
                  <Card key={course._id} className="overflow-hidden">
                    <div className="flex flex-row">
                      <div className="w-1/4 relative flex items-start">
                        <img
                          src={course.image}
                          alt={course.name}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="pl-4 md:pl-6 w-3/4 flex flex-col">
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
                        <h3 className="order1 md:order-2 !text-base md:!text-xl !leading-[16px] md:!leading-[20px] font-semibold !mb-1 md:!mb-2">
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
                            className="w-[100%] md:w-auto"
                          >
                            {dictionary.technologies.viewMore}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {courses.map((course: any) => (
                  <Card
                    key={course._id}
                    className="overflow-hidden flex flex-col h-full"
                  >
                    <div className="relative pb-[56.25%] bg-gray-100">
                      <img
                        src={course.image}
                        alt={course.name}
                        className="absolute inset-0 w-full h-full object-contain"
                      />
                    </div>
                    <div className="py-4 flex flex-col flex-grow">
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
                      <h3 className="!text-base md:!text-xl !leading-[16px] md:!leading-[20px] font-semibold !mb-2">
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
                        href={getLocalizedPathFromPrefix(
                          lang,
                          `/courses/${course._id}/`
                        )}
                        className="w-full"
                      >
                        {dictionary.technologies.viewMore}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {coursesData.totalPages > 1 && (
              <Pagination
                className="mt-8"
                totalPages={coursesData.totalPages}
                dictionary={dictionary}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Courses;
