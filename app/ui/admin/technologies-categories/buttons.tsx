import { deleteTechnologyCategory } from "@/lib/actions/technologiesCategories";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

export function UpdateTechnologyCategory({ id }: { id: string }) {
  return (
    <Link
      className="btn btn-link"
      href={`/admin/technologies-categories/edit/${id}`}
    >
      <EditIcon />
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
        <ClearIcon />
        <span className="btn-text">Remove</span>
      </button>
    </form>
  );
}
