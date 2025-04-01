import React from "react";
import Label from "@/components/ui/Label";
import Sorting from "./Sorting";
import Language from "./Language";
import Pricing from "./Pricing";
import Button from "@/components/ui/Button";

interface FiltersSidebarProps {
  showMobileFilters: boolean;
  activeFilters: string[];
  addFilter: (f: string) => void;
  removeFilter: (f: string) => void;
  setActiveFilters: (filters: string[]) => void;
  stats: any;
  dictionary: any;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  showMobileFilters,
  activeFilters,
  addFilter,
  removeFilter,
  setActiveFilters,
  stats,
  dictionary,
}) => {
  return (
    <div
      className={`${
        showMobileFilters ? "block" : "hidden"
      } md:block h-fit sticky top-[80px] bg-white rounded-xl p-4 border border-neutral-200`}
    >
      <div className="space-y-6 sticky">
        <div>
          <Label className="mb-1.5 block">{dictionary.courses.orderBy}</Label>
          <Sorting dictionary={dictionary} />
        </div>
        <div>
          <Label className="b-1.5 block">{dictionary.courses.price}</Label>
          <Pricing
            activeFilters={activeFilters}
            addFilter={addFilter}
            removeFilter={removeFilter}
            stats={stats}
            dictionary={dictionary}
          />
        </div>
        <div>
          <Label className="mb-1.5 block">{dictionary.courses.language}</Label>
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
  );
};

export default FiltersSidebar;
