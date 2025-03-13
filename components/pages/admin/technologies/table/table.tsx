import { fetchFilteredTechnologies } from "@/lib/data/technologies";
import { DeleteTechnology, UpdateTechnology } from "../buttons";
import Image from "next/image";

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
            <th>Order</th>
            <th>Technology</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technologies.docs &&
            technologies.docs.map((technology: any) => (
              <tr key={technology.name}>
                <td>
                  <span className="name">{technology.order}</span>
                </td>
                <td>
                  {technology.imageLightBlue &&
                    technology.imageLightBlue !== "" && (
                      <Image
                        src={technology.imageLightBlue}
                        width={25}
                        height={30}
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
