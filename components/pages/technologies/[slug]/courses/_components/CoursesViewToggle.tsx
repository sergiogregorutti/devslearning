import Button from "@/components/ui/Button";
import { FaTableCells, FaListUl } from "react-icons/fa6";

const CoursesViewToggle = ({ viewMode, setViewMode, dictionary }: any) => {
  return (
    <div className="flex border border-neutral-200 rounded-md overflow-hidden">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="small"
        className="!flex items-center rounded-none px-3"
        onClick={() => setViewMode("grid")}
      >
        <FaTableCells className="h-4 w-4 md:mr-2" />
        <span className="hidden md:block">{dictionary.courses.grid}</span>
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="small"
        className="!flex items-center rounded-none px-3"
        onClick={() => setViewMode("list")}
      >
        <FaListUl className="h-4 w-4 md:mr-2" />
        <span className="hidden md:block">{dictionary.courses.list}</span>
      </Button>
    </div>
  );
};

export default CoursesViewToggle;
