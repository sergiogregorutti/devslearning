import { fetchFilteredCourses } from "@/lib/data/courses";
import { Delete, Update } from "../buttons";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const courses = await fetchFilteredCourses(query, currentPage);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.docs &&
            courses.docs.map((course: any) => (
              <tr key={course.name}>
                <td>
                  <span className="name">{course.name}</span>
                </td>
                <td className="actions">
                  <Update id={course._id.toString()} />
                  <Delete id={course._id.toString()} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
