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
import { User } from "@/lib/models";

interface CoursesProps {
  technology: any;
  filtersArray: any;
  lang: string;
  dictionary: any;
}

const Courses: React.FC<CoursesProps> = ({
  technology,
  filtersArray,
  lang,
  dictionary,
}) => {
  const [activeFilters, setActiveFilters] = useState<string[]>(filtersArray);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
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
      replace(`${pathname}?${decodeURIComponent(newParams.toString())}`);
    }
  }, [activeFilters, searchParams]);

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
            className="w-full flex items-center justify-between"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span className="flex items-center">
              <FaFilter className="mr-2" />
              Filters
            </span>
            {showMobileFilters ? <FaAngleUp /> : <FaAngleDown />}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div
            className={`${
              showMobileFilters ? "block" : "hidden"
            } md:block rounded-lg border border-neutral-200 p-6 h-fit`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3>Filters</h3>
            </div>
            <div className="space-y-6">
              <div>
                <Label className="mb-1.5 block">Order by</Label>
                <Sorting dictionary={dictionary} />
              </div>
              <div>
                <Label className="b-1.5 block">Price</Label>
                <Pricing
                  activeFilters={activeFilters}
                  addFilter={addFilter}
                  removeFilter={removeFilter}
                  stats={stats}
                  dictionary={dictionary}
                />
              </div>
              <div>
                <Label className="mb-1.5 block">Language</Label>
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
                  Clear filters
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            {activeFilters.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500">Active filters:</span>
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="flex items-center gap-1 capitalize font-bold"
                  >
                    {filter}
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
                ))}
                <Button
                  variant="ghost"
                  size="extraSmall"
                  onClick={() => setActiveFilters([])}
                >
                  Clear filters
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">18 courses found</p>
              <div className="flex border border-neutral-200 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="small"
                  className="flex items-center rounded-none px-3"
                  onClick={() => setViewMode("grid")}
                >
                  <FaTableCells className="h-4 w-4 mr-2" />
                  <span>Grid</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="small"
                  className="flex items-center rounded-none px-3"
                  onClick={() => setViewMode("list")}
                >
                  <FaListUl className="h-4 w-4 mr-2" />
                  <span>List</span>
                </Button>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Course 1 - Grid View */}
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="relative pb-[56.25%] bg-gray-100">
                    <img
                      src="https://devslearning.s3.us-east-2.amazonaws.com/courses/617ee4cbefacbd609c11f565/sNDKLup34vKu1Vn9MkSz7m.png"
                      alt="HTML5 desde cero"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <Badge>Español</Badge>
                      <span className="text-sm font-medium">USD $9.99</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Curso de HTML5 desde cero: El más completo en Español
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">
                      Aprende HTML 5 y crea tus primeras páginas web paso a paso
                      con decenas de ejercicios.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Udemy</span>
                      <span>Víctor Robles</span>
                      <span>2024</span>
                    </div>
                    <Button className="w-full">Ver Más</Button>
                  </div>
                </Card>

                {/* Course 2 - Grid View */}
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="relative pb-[56.25%] bg-gray-100">
                    <img
                      src="https://devslearning.s3.us-east-2.amazonaws.com/courses/617ee64aa8aaf2618efd7886/reb4Ag2KjEAFbFdFdxPkTF.png"
                      alt="Learn HTML (web.dev)"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <Badge>Inglés</Badge>
                      <span className="text-sm font-medium text-green-600">
                        Gratis
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Learn HTML (web.dev)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">
                      This HTML course for web developers provides a solid
                      overview for developers, from novice to expert level HTML.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>web.dev</span>
                      <span>Google</span>
                      <span>2024</span>
                    </div>
                    <Button className="w-full">Ver Más</Button>
                  </div>
                </Card>

                {/* Course 3 - Grid View */}
                <Card className="overflow-hidden flex flex-col h-full">
                  <div className="relative pb-[56.25%] bg-gray-100">
                    <img
                      src="https://devslearning.s3.us-east-2.amazonaws.com/courses/6181b92c423df7041870a525/swWTtJLLJet5FTGhR3jniT.png"
                      alt="Learn HTML"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <Badge>Inglés</Badge>
                      <span className="text-sm font-medium text-green-600">
                        Gratis
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Learn HTML</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">
                      Start at the beginning by learning HTML basics — an
                      important foundation for building and editing web pages.
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Codecademy</span>
                      <span>Codecademy Team</span>
                      <span>2024</span>
                    </div>
                    <Button className="w-full">Ver Más</Button>
                  </div>
                </Card>
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="space-y-4">
                {/* Course 1 - List View */}
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 relative flex items-start py-6 bg-gray-100">
                      <img
                        src="https://devslearning.s3.us-east-2.amazonaws.com/courses/6181b92c423df7041870a525/swWTtJLLJet5FTGhR3jniT.png"
                        alt="HTML5 desde cero"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="p-4 md:p-6 md:w-3/4 flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge>Español</Badge>
                        <Badge variant="outline">Udemy</Badge>
                        <Badge variant="outline">2024</Badge>
                        <span className="ml-auto text-sm font-medium">
                          USD $9.99
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Curso de HTML5 desde cero: El más completo en Español
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Aprende HTML 5 y crea tus primeras páginas web paso a
                        paso con decenas de ejercicios. Empieza en el desarrollo
                        web aquí con este curso completo que te llevará desde
                        los conceptos básicos hasta técnicas avanzadas.
                      </p>
                      <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                            <FaUser className="text-neutral-500" />
                          </div>
                          <span className="text-sm">Víctor Robles</span>
                        </div>
                        <Button>Ver Más</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Course 2 - List View */}
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 relative flex items-start py-6 bg-gray-100">
                      <img
                        src="https://devslearning.s3.us-east-2.amazonaws.com/courses/617ee64aa8aaf2618efd7886/reb4Ag2KjEAFbFdFdxPkTF.png"
                        alt="Learn HTML (web.dev)"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="p-4 md:p-6 md:w-3/4 flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge>Inglés</Badge>
                        <Badge variant="outline">web.dev</Badge>
                        <Badge variant="outline">2024</Badge>
                        <span className="ml-auto text-sm font-medium text-green-600">
                          Gratis
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Learn HTML (web.dev)
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        This HTML course for web developers provides a solid
                        overview for developers, from novice to expert level
                        HTML. Comprehensive and practical with hands-on examples
                        and interactive exercises to help you master HTML
                        quickly.
                      </p>
                      <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                            G
                          </div>
                          <span className="text-sm">Google</span>
                        </div>
                        <Button>Ver Más</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Course 3 - List View */}
                <Card className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 relative flex items-start py-6 bg-gray-100">
                      <img
                        src="https://devslearning.s3.us-east-2.amazonaws.com/courses/617ee4cbefacbd609c11f565/sNDKLup34vKu1Vn9MkSz7m.png"
                        alt="Learn HTML"
                        className="w-full h-auto object-contain"
                      />
                    </div>
                    <div className="p-4 md:p-6 md:w-3/4 flex flex-col">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge>Inglés</Badge>
                        <Badge variant="outline">Codecademy</Badge>
                        <Badge variant="outline">2024</Badge>
                        <span className="ml-auto text-sm font-medium text-green-600">
                          Gratis
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Learn HTML</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Start at the beginning by learning HTML basics — an
                        important foundation for building and editing web pages.
                        Interactive lessons with practical exercises that will
                        help you build real websites as you learn.
                      </p>
                      <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                            CT
                          </div>
                          <span className="text-sm">Codecademy Team</span>
                        </div>
                        <Button>Ver Más</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="disabled"
                  size="small"
                  className="border-1 border-neutral-200"
                  disabled
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="small"
                  className="bg-blue-500 text-white"
                >
                  1
                </Button>
                <Button variant="outline" size="small">
                  2
                </Button>
                <Button variant="outline" size="small">
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Courses;
