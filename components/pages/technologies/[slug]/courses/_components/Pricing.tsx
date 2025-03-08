"use client";

import Badge from "@/components/ui/Badge";
import Checkbox from "@/components/ui/Checkbox";
import Label from "@/components/ui/Label";

export default function Pricing({
  activeFilters,
  addFilter,
  removeFilter,
  stats,
  dictionary,
}: {
  activeFilters: string[];
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
  stats: any;
  dictionary: { [key: string]: any };
}) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    if (checked) {
      addFilter(id);
    } else {
      removeFilter(id);
    }
  };

  return (
    <div className="space-y-2 pt-1">
      <Checkbox
        id="free"
        checked={activeFilters.includes("free") ? true : false}
        onChange={handleCheckboxChange}
      >
        <Label
          htmlFor="free"
          className="w-full relative top-[1px] flex justify-between cursor-pointer"
        >
          <span>{dictionary.technologies.pricingFree}</span>
          {stats.freeCourses !== undefined ? (
            <Badge variant="outline">{stats.freeCourses}</Badge>
          ) : null}
        </Label>
      </Checkbox>
      <Checkbox
        id="paid"
        checked={activeFilters.includes("paid") ? true : false}
        onChange={handleCheckboxChange}
      >
        <Label
          htmlFor="paid"
          className="w-full relative top-[1px] flex justify-between cursor-pointer"
        >
          <span>{dictionary.technologies.pricingPaid}</span>
          {stats.paidCourses !== undefined ? (
            <Badge variant="outline">{stats.paidCourses}</Badge>
          ) : null}
        </Label>
      </Checkbox>
    </div>
  );
}
