import { deleteCourse } from "@/lib/actions/courses";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

export function Update({ id }: { id: string }) {
  return (
    <Link className="btn btn-link" href={`/admin/courses/edit/${id}`}>
      <EditIcon />
      <span className="btn-text">Edit</span>
    </Link>
  );
}

export function Delete({ id }: { id: string }) {
  const deleteCourseWithId = deleteCourse.bind(null, id);

  return (
    <form action={deleteCourseWithId}>
      <button className="btn btn-link btn-remove">
        <ClearIcon />
        <span className="btn-text">Remove</span>
      </button>
    </form>
  );
}
