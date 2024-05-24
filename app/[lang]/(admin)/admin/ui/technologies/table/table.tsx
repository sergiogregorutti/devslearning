import { fetchFilteredTechnologies } from "@/lib/data/technologies";
import { DeleteTechnology, UpdateTechnology } from "../buttons";

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
                  {category.imageLightBlue &&
                    category.imageLightBlue !== "" && (
                      <img src={category.imageLightBlue} alt={category.name} />
                    )}
                  <span className="name">{category.name}</span>
                </td>
                <td className="actions">
                  <UpdateTechnology id={category._id.toString()} />
                  <DeleteTechnology id={category._id.toString()} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
