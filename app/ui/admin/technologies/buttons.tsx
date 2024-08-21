import { deleteTechnology } from "@/lib/actions/technologies";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

export function UpdateTechnology({ id }: { id: string }) {
  return (
    <Link className="btn btn-link" href={`/admin/technologies/edit/${id}`}>
      <EditIcon />
      <span className="btn-text">Edit</span>
    </Link>
  );
}

export function DeleteTechnology({ id }: { id: string }) {
  const deleteTechnologyWithId = deleteTechnology.bind(null, id);

  return (
    <form action={deleteTechnologyWithId}>
      <button className="btn btn-link btn-remove">
        <ClearIcon />
        <span className="btn-text">Remove</span>
      </button>
    </form>
  );
}
