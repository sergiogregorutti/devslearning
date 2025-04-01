import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Image from "next/image";

const ActiveFilters = ({
  activeFilters,
  lang,
  dictionary,
  removeFilter,
  clearFilters,
}: any) => {
  const translate = {
    free: lang === "en" ? "Free" : "Gratis",
    paid: lang === "en" ? "Paid" : "Pago",
    english: lang === "en" ? "English" : "Inglés",
    spanish: lang === "en" ? "Spanish" : "Español",
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2 items-center bg-white rounded-xl p-4 border border-neutral-200">
      <span className="text-sm text-gray-500 w-100 md:w-auto">
        {dictionary.courses.activeFilters}:
      </span>
      {activeFilters.map((filter: string) => (
        <Badge
          key={filter}
          variant="secondary"
          className="flex items-center gap-1 capitalize font-bold"
        >
          {translate[filter] || filter}
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
      <Button variant="outline" size="extraSmall" onClick={clearFilters}>
        {dictionary.courses.clearFilters}
      </Button>
    </div>
  );
};

export default ActiveFilters;
