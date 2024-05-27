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
            <th>Technology</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technologies.docs &&
            technologies.docs.map((technology: any) => (
              <tr key={technology.name}>
                <td>
                  {technology.imageLightBlue &&
                    technology.imageLightBlue !== "" && (
                      <img
                        src={technology.imageLightBlue}
                        alt={technology.name}
                      />
                    )}
                  <span className="name">{technology.name}</span>
                </td>
                <td className="actions">
                  <UpdateTechnology id={technology._id.toString()} />
                  <DeleteTechnology id={technology._id.toString()} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
