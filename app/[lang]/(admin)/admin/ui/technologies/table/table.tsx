import Link from "next/link";
import { fetchFilteredTechnologies } from "@/lib/data/technologies";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const technologies = await fetchFilteredTechnologies(query, currentPage);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technologies.docs &&
            technologies.docs.map((category: any) => (
              <tr key={category.name}>
                <td>
                  <span className="image-container">
                    <img
                      src={`/assets/technologies/${category._id}.svg`}
                      alt={category.name}
                    />
                  </span>
                  <span className="name">{category.name}</span>
                </td>
                <td>
                  <Link
                    className="btn btn-link"
                    href={`/admin/technologies/edit/${category._id}`}
                  >
                    <EditIcon />
                    <span className="btn-text">Edit</span>
                  </Link>
                  <button className="btn btn-link btn-remove">
                    <ClearIcon />
                    <span className="btn-text">Remove</span>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
