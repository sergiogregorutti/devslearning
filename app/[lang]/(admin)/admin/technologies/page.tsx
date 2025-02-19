import Link from "next/link";
import Search from "../../../../../ui/admin/search/Search";
import Table from "../../../../../ui/admin/technologies/table/table";
import { fetchTechnologiesPages } from "@/lib/data/technologies";
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
  const totalPages = await fetchTechnologiesPages(query);

  return (
    <>
      <h1>Technologies</h1>
      <div className="main-actions">
        <div>
          <Button label="+ Add New" href="/admin/technologies/create" />
        </div>
        <div className="search-column">
          <Search placeholder="Search technologies..." />
        </div>
      </div>

      <Table query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
