import Pagination from "./Pagination";

const CoursesPagination = ({ totalPages, dictionary }: any) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-neutral-200 mt-8">
      <Pagination totalPages={totalPages} dictionary={dictionary} />
    </div>
  );
};

export default CoursesPagination;
