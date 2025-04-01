"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaFilter, FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import CoursesHeader from "./_components/CoursesHeader";
import ActiveFilters from "./_components/ActiveFilters";
import CoursesViewToggle from "./_components/CoursesViewToggle";
import CoursesGrid from "./_components/CoursesGrid";
import CoursesList from "./_components/CoursesList";
import CoursesPagination from "./_components/CoursesPagination";
import FiltersSidebar from "./_components/FiltersSidebar";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
      <CoursesHeader
        technology={technology}
        lang={lang}
        dictionary={dictionary}
      />
      <Container className="pb-10">
        <div className="md:hidden mb-6">
          <Button
            size="small"
            variant="outline"
            className="!flex items-center gap-2 justify-between bg-white w-full"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span className="flex items-center">
              <FaFilter className="mr-2" />
              {dictionary.courses.filters}
            </span>
            {showMobileFilters ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <FiltersSidebar
            showMobileFilters={showMobileFilters}
            activeFilters={activeFilters}
            addFilter={addFilter}
            removeFilter={removeFilter}
            setActiveFilters={setActiveFilters}
            stats={stats}
            dictionary={dictionary}
          />

          <div className="md:col-span-3">
            {activeFilters.length > 0 && (
              <ActiveFilters
                activeFilters={activeFilters}
                lang={lang}
                dictionary={dictionary}
                removeFilter={removeFilter}
                clearFilters={() => setActiveFilters([])}
              />
            )}

            <div className="flex flex-row gap-4 md:gap-0 items-center justify-between mb-6 bg-white rounded-xl p-4 border border-neutral-200">
              <p className="text-sm text-gray-600">
                {coursesData.totalPages > 1 && (
                  <>
                    {coursesData.startIndex}-{coursesData.endIndex}{" "}
                    {dictionary.courses.of}{" "}
                  </>
                )}
                {coursesData.totalDocs} {dictionary.courses.coursesFound}
              </p>
              <CoursesViewToggle
                viewMode={viewMode}
                setViewMode={setViewMode}
                dictionary={dictionary}
              />
            </div>

            {viewMode === "grid" && (
              <CoursesGrid
                courses={courses}
                dictionary={dictionary}
                lang={lang}
              />
            )}

            {viewMode === "list" && (
              <CoursesList
                courses={courses}
                dictionary={dictionary}
                lang={lang}
              />
            )}

            {coursesData.totalPages > 1 && (
              <CoursesPagination
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
