import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  HiOutlineTrash,
  HiChevronDown,
  HiOutlineUserAdd,
} from "react-icons/hi";
import SpinnerMini from "../../ui/SpinnerMini";
import ReusableTable from "../../ui/ReusableTable";
import Button from "../../ui/Button";
import { useSentInvitations } from "./workspaces-Hooks/useSentInvitations";
import { useDeleteInvitation } from "./workspaces-Hooks/useDeleteInvitation";
import { PAGE_SIZE } from "../../services/apiInvitations";

const SentInvitationsTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isPending, isFetching, sentInvitations, count } =
    useSentInvitations();
  const [searchParams, setSearchParams] = useSearchParams();
  const { mutate: deleteInvitation, isDeleting } = useDeleteInvitation();

  const currentFilter = searchParams.get("status") || "all";
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil((count || 0) / PAGE_SIZE);

  const handleFilterChange = (status) => {
    searchParams.set("status", status);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

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
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl shadow-sm mt-0 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 focus:outline-none hover:bg-[var(--color-grey-50)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[var(--color-brand-50)] text-[var(--color-brand-600)] rounded-lg">
            <HiOutlineUserAdd size={20} />
          </div>

          <h3 className="font-bold text-[var(--color-grey-800)]">
            Invitations
          </h3>
          {!isPending && count > 0 && (
            <span className="bg-[var(--color-grey-100)] text-[var(--color-grey-700)] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[var(--color-grey-200)]">
              {count}
            </span>
          )}
        </div>
        <HiChevronDown
          className={`text-[var(--color-grey-500)] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      {isOpen && (
        <div className="p-4 border-t border-[var(--color-grey-100)] flex flex-col gap-4">
          {isPending ? (
            <div className="min-h-[200px] flex flex-col justify-center items-center">
              <SpinnerMini />
              <p className="mt-4 text-[var(--color-grey-500)] text-sm font-medium animate-pulse">
                Loading invitations...
              </p>
            </div>
          ) : (
            <>
              <div className="flex gap-2 flex-wrap">
                {["all", "pending", "accepted", "rejected"].map((status) => (
                  <Button
                    key={status}
                    onClick={() => handleFilterChange(status)}
                    variant={currentFilter === status ? "primary" : "outline"}
                    size="sm"
                    className="!rounded-full uppercase tracking-wider text-xs"
                  >
                    {status}
                  </Button>
                ))}
              </div>
              <div
                className={`transition-all duration-200 ${isFetching ? "opacity-50 pointer-events-none" : "opacity-100"}`}
              >
                <ReusableTable
                  headers={["Email Address", "Role", "Status", ""]}
                  data={sentInvitations}
                  emptyMessage="No invitations match this filter."
                  renderRow={(invite) => (
                    <tr
                      key={invite.id}
                      className="hover:bg-[var(--color-grey-50)] transition-colors"
                    >
                      <td className="p-4 font-medium">{invite.email}</td>
                      <td className="p-4">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-grey-100)] font-mono text-[var(--color-grey-600)]">
                          {invite.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            invite.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : invite.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {invite.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {invite.status !== "accepted" && (
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to revoke this invitation?",
                                )
                              ) {
                                deleteInvitation(invite.id);
                              }
                            }}
                            disabled={isDeleting}
                            className="p-1.5 text-[var(--color-grey-400)] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                            title="Revoke Invitation"
                          >
                            <HiOutlineTrash size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  )}
                />
              </div>
              {pageCount > 1 && (
                <div className="flex items-center justify-between bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] p-3 rounded-xl shadow-sm mt-2">
                  <p className="text-sm text-[var(--color-grey-600)]">
                    Showing{" "}
                    <span className="font-bold">
                      {(currentPage - 1) * PAGE_SIZE + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-bold">
                      {currentPage === pageCount
                        ? count
                        : currentPage * PAGE_SIZE}
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SentInvitationsTable;
