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
                  <span className="image-container">
                    <img
                      src={`/assets/technologies/${category._id}.svg`}
                      alt={category.name}
                    />
                  </span>
                  <span className="name">{category.name}</span>
                </td>
                <td>
                  <UpdateTechnology id={category._id} />
                  <DeleteTechnology id={category._id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
