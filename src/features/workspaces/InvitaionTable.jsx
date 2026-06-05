import { HiOutlineTrash } from "react-icons/hi";
import ReusableTable from "../../ui/ReusableTable";

const InvitaionTable = ({
  sentInvitations,
  isFetching,
  isDeleting,
  deleteInvitation,
}) => {
  return (
    <div>
      {" "}
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
    </div>
  );
};

export default InvitaionTable;
