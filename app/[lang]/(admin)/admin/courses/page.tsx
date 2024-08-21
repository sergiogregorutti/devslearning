import Link from "next/link";
import Search from "../../../../../ui/admin/search/Search";
import Table from "../../../../../ui/admin/courses/table/table";
import { fetchCoursesPages } from "@/lib/data/courses";
import Pagination from "../../../../../ui/admin/courses/pagination/pagination";

export default async function Courses({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCoursesPages({ query });

  return (
    <>
      <h1>Courses</h1>
      <div className="main-actions">
        <div>
          <Link className="btn btn-big" href="/admin/courses/create">
            + Add New
          </Link>
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
