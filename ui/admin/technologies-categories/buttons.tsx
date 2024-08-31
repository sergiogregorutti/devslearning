import { deleteTechnologyCategory } from "@/lib/actions/technologiesCategories";
import Link from "next/link";
import { FaPenToSquare, FaXmark } from "react-icons/fa6";

export function UpdateTechnologyCategory({ id }: { id: string }) {
  return (
    <Link
      className="btn btn-link"
      href={`/admin/technologies-categories/edit/${id}`}
    >
      <FaPenToSquare />
      <span className="btn-text">Edit</span>
    </Link>
  );
}

export function DeleteTechnologyCategory({ id }: { id: string }) {
  const deleteTechnologyCategoryWithId = deleteTechnologyCategory.bind(
    null,
    id
  );

  return (
    <form action={deleteTechnologyCategoryWithId}>
      <button className="btn btn-link btn-remove">
        <FaXmark />
        <span className="btn-text">Remove</span>
      </button>
    </form>
  );
}
