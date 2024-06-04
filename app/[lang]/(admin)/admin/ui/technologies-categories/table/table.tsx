import { fetchFilteredTechnologiesCategories } from "@/lib/data/technologiesCategories";
import { DeleteTechnologyCategory, UpdateTechnologyCategory } from "../buttons";
import Image from "next/image";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const technologiesCategories = await fetchFilteredTechnologiesCategories(
    query,
    currentPage
  );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Technology Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technologiesCategories.docs &&
            technologiesCategories.docs.map((technologyCategory: any) => (
              <tr key={technologyCategory.name}>
                <td>
                  <span className="name">{technologyCategory.order}</span>
                </td>
                <td>
                  <span className="name">{technologyCategory.name}</span>
                </td>
                <td className="actions">
                  <UpdateTechnologyCategory
                    id={technologyCategory._id.toString()}
                  />
                  <DeleteTechnologyCategory
                    id={technologyCategory._id.toString()}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
