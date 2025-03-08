"use client";

import Badge from "@/components/ui/Badge";
import Checkbox from "@/components/ui/Checkbox";
import Label from "@/components/ui/Label";

export default function Language({
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
        id="english"
        checked={activeFilters.includes("english") ? true : false}
        onChange={handleCheckboxChange}
      >
        <Label
          htmlFor="english"
          className="w-full relative top-[1px] flex justify-between cursor-pointer"
        >
          <span>{dictionary.technologies.english}</span>
          {stats.englishCourses !== undefined ? (
            <Badge variant="outline">{stats.englishCourses}</Badge>
          ) : null}
        </Label>
      </Checkbox>
      <Checkbox
        id="spanish"
        checked={activeFilters.includes("spanish") ? true : false}
        onChange={handleCheckboxChange}
      >
        <Label
          htmlFor="spanish"
          className="w-full relative top-[1px] flex justify-between cursor-pointer"
        >
          <span>{dictionary.technologies.spanish}</span>
          {stats.spanishCourses !== undefined ? (
            <Badge variant="outline">{stats.spanishCourses}</Badge>
          ) : null}
        </Label>
      </Checkbox>
    </div>
  );
}
