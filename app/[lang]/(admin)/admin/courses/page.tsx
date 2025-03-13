import Search from "@/components/pages/admin/search/Search";
import Table from "@/components/pages/admin/courses/table/table";
import { fetchCoursesPages } from "@/lib/data/courses";
import Pagination from "@/components/pages/admin/courses/pagination/pagination";
import Button from "@/components/ui/Button";

export default async function Courses(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCoursesPages({ query });

  return (
    <>
      <h1>Courses</h1>
      <div className="main-actions">
        <div>
          <Button label="+ Add New" href="/admin/courses/create" />
        </div>
        <div className="search-column">
          <Search placeholder="Search courses..." />
        </div>
      </div>

      <Table query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
