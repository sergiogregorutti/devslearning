import Link from "next/link";
import Navigation from "../ui/navigation/Navigation";
import Search from "../ui/search/Search";
import Table from "../ui/technologies/table/table";

export default function Technologies({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="admin-template">
      <div className="container">
        <div className="content-container">
          <Navigation />
          <div className="content">
            <h1>Technologies</h1>
            <div className="main-actions">
              <div>
                <Link className="btn btn-big" href="/admin/technologies">
                  + Add New
                </Link>
              </div>
              <div className="search-column">
                <Search placeholder="Search technologies..." />
              </div>
            </div>

            <Table query={query} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
