import Link from "next/link";
import Search from "../../../../../ui/admin/search/Search";
import Table from "../../../../../ui/admin/technologies-categories/table/table";
import { fetchTechnologiesCategoriesPages } from "@/lib/data/technologiesCategories";
import Pagination from "../../../../../ui/admin/technologies/pagination/pagination";
import Button from "@/components/ui/Button";

export default async function Technologies(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTechnologiesCategoriesPages(query);

  return (
    <>
      <h1>Technologies Categories</h1>
      <div className="main-actions">
        <div>
          <Button
            label="+ Add New"
            href="/admin/technologies-categories/create"
          />
        </div>
        <div className="search-column">
          <Search placeholder="Search technologies categories..." />
        </div>
      </div>

      <Table query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
