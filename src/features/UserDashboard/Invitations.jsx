import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { useGetmyInvitations } from "./UserDashboard-Hooks/useGetmyInvitations";
import SpinnerMini from "../../ui/SpinnerMini";
import InvitaionDisplay from "./InvitaionDisplay";
import NoInvition from "./NoInvition";

const Invitations = () => {
  const { MyInvitations, MyInvitationsPending } = useGetmyInvitations();

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 min-h-[350px] shadow-sm flex flex-col">
      <h2 className="text-lg font-bold text-[var(--color-grey-800)] mb-4 border-b border-[var(--color-grey-100)] pb-4">
        Pending Invitations {MyInvitations.length}
      </h2>

      <div className="flex-1 flex flex-col">
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
