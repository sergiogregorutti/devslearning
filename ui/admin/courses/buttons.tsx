import { deleteCourse } from "@/lib/actions/courses";
import Link from "next/link";
import { FaPenToSquare, FaXmark } from "react-icons/fa6";

export function Update({ id }: { id: string }) {
  return (
    <Link className="btn btn-link" href={`/admin/courses/edit/${id}`}>
      <FaPenToSquare />
      <span className="btn-text">Edit</span>
    </Link>
  );
}

export function Delete({ id }: { id: string }) {
  const deleteCourseWithId = deleteCourse.bind(null, id);

  return (
    <form action={deleteCourseWithId}>
      <button className="btn btn-link btn-remove">
        <FaXmark />
        <span className="btn-text">Remove</span>
      </button>
    </form>
  );
}
