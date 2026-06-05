import {
  HiOutlineOfficeBuilding,
  HiOutlineCheck,
  HiOutlineX,
} from "react-icons/hi";
import { useUser } from "../auth/Auth-Hooks/useUser";
import { useResponseInvitaions } from "./UserDashboard-Hooks/useResponseInvitaions";
import Button from "../../ui/Button";

const InvitaionDisplay = ({ MyInvitations }) => {
  const { user } = useUser();
  const { mutate: UpdateInvitaions, isPending: UpdateInvitaionsPending } =
    useResponseInvitaions();

  return (
    <div>
      <div className="flex flex-col gap-3 mt-2">
        {MyInvitations.map((invite) => {
          const inviterData = invite.users || {};
          const inviterName =
            inviterData.full_name || inviterData.email || "Someone";

          return (
            <div
              key={invite.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-[var(--color-grey-200)] rounded-xl bg-[var(--color-grey-0)] hover:bg-[var(--color-grey-50)] transition-all gap-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-grey-100)] text-[var(--color-brand-600)] rounded-lg flex items-center justify-center shrink-0">
                  <HiOutlineOfficeBuilding size={24} />
                </div>
                <div>
                  <p className="font-bold text-[var(--color-grey-900)] text-base">
                    {invite.workspaces?.name}
                  </p>
                  <p className="text-sm text-[var(--color-grey-500)] mt-0.5">
                    Invited by{" "}
                    <span className="font-medium text-[var(--color-grey-800)]">
                      {inviterName}
                    </span>{" "}
                    to join as{" "}
                    <span className="font-semibold text-[var(--color-grey-700)] capitalize">
                      {invite.role}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="dangerGhost"
                  size="sm"
                  disabled={UpdateInvitaionsPending}
                  onClick={() =>
                    UpdateInvitaions({
                      inviteId: invite.id,
                      status: "rejected",
                    })
                  }
                  className="flex-1 sm:flex-none"
                >
                  <HiOutlineX size={18} /> Reject
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={UpdateInvitaionsPending}
                  onClick={() =>
                    UpdateInvitaions({
                      inviteId: invite.id,
                      status: "accepted",
                      workspaceId: invite.workspace_id,
                      role: invite.role,
                      userId: user.id,
                    })
                  }
                  className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white border-none shadow-sm"
                >
                  <HiOutlineCheck size={18} /> Accept
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvitaionDisplay;
