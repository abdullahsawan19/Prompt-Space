import { useState } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import { useSentInvitations } from "./workspaces-Hooks/useSentInvitations";
import { useDeleteInvitation } from "./workspaces-Hooks/useDeleteInvitation";
import { InvitationFilter } from "./InvitationFilter";
import InvitaionTable from "./InvitaionTable";
import PaginationButtons from "./PaginationButtons";
import TableOpenButton from "./TableOpenButton";

const SentInvitationsTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isPending, isFetching, sentInvitations, count } =
    useSentInvitations();
  const { mutate: deleteInvitation, isDeleting } = useDeleteInvitation();

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl shadow-sm mt-0 overflow-hidden transition-all duration-300">
      <TableOpenButton
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        count={count}
        isPending={isPending}
      />
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
              <InvitationFilter />

              <InvitaionTable
                sentInvitations={sentInvitations}
                isFetching={isFetching}
                isDeleting={isDeleting}
                deleteInvitation={deleteInvitation}
              />
              <PaginationButtons count={count} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SentInvitationsTable;
