import Link from "next/link";
import { createTechnology } from "@/lib/actions/technologies";

export default function Form() {
  return (
    <form action={createTechnology}>
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input id="name" name="name" className="form-input" />
      <div>
        <button type="submit" className="btn">
          Create Technology
        </button>
        <Link href="/admin/technologies" className="btn btn-cancel">
          Cancel
        </Link>
      </div>
    </form>
  );
}
