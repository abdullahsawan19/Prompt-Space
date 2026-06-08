import { useGetmyInvitations } from "./UserDashboard-Hooks/useGetmyInvitations";
import SpinnerMini from "../../ui/SpinnerMini";
import InvitaionDisplay from "./InvitaionDisplay";
import NoInvition from "./NoInvition";

const Invitations = () => {
  const { MyInvitations, MyInvitationsPending } = useGetmyInvitations();

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 shadow-sm flex flex-col h-[400px]">
      <h2 className="text-lg font-bold text-[var(--color-grey-800)] mb-4 border-b border-[var(--color-grey-100)] pb-4 shrink-0">
        Pending Invitations {MyInvitations.length}
      </h2>

      <div className="flex-1 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {MyInvitationsPending ? (
          <div className="flex-1 flex items-center justify-center">
            <SpinnerMini />
          </div>
        ) : MyInvitations?.length === 0 ? (
          <NoInvition />
        ) : (
          <InvitaionDisplay MyInvitations={MyInvitations} />
        )}
      </div>
    </div>
  );
};

export default Invitations;
