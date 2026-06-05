import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../services/apiInvitations";
import Button from "../../ui/Button";

const PaginationButtons = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil((count || 0) / PAGE_SIZE);
  const nextPage = () => {
    if (currentPage < pageCount) {
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  };

  return (
    <div>
      {" "}
      {pageCount > 1 && (
        <div className="flex items-center justify-between bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] p-3 rounded-xl shadow-sm mt-2">
          <p className="text-sm text-[var(--color-grey-600)]">
            Showing{" "}
            <span className="font-bold">
              {(currentPage - 1) * PAGE_SIZE + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold">
              {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
            </span>{" "}
            of <span className="font-bold">{count}</span> results
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === pageCount}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaginationButtons;
