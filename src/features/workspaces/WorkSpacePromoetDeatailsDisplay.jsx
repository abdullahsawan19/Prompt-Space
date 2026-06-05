import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { useWorkspace } from "./workspaces-Hooks/useWorkspace";
import { useUser } from "../auth/Auth-Hooks/useUser";
import PromptCard from "./PromptCard";
import SentInvitationsTable from "./SentInvitationsTable";
import InviteMemberForm from "./InviteMemberForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

const WorkSpacePromoetDeatailsDisplay = () => {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: workspace } = useWorkspace();
  console.log(workspace);

  const prompts = workspace?.prompts || [];

  let currentUserRole = "viewer";

  if (workspace?.owner_id === user?.id) {
    currentUserRole = "owner";
  } else if (workspace?.workspace_members) {
    const currentMember = workspace.workspace_members.find(
      (member) => member.user_id === user?.id,
    );
    if (currentMember) {
      currentUserRole = currentMember.role;
    }
  }
  return (
    <div className="flex flex-col mt-6">
      <div className="flex flex-col gap-4">
        {prompts.length === 0 ? (
          <div className="text-center py-16 bg-[var(--color-grey-50)] rounded-2xl border border-[var(--color-grey-200)]">
            <p className="text-[var(--color-grey-500)]">
              No prompts in this workspace yet.
            </p>
          </div>
        ) : (
          prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              currentUserRole={currentUserRole}
            />
          ))
        )}
      </div>

      {workspace.type !== "personal" && currentUserRole === "owner" && (
        <>
          <div className="w-full h-px bg-[var(--color-grey-200)] my-8"></div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--color-grey-800)]">
                Team Management
              </h2>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                <HiOutlinePlus size={18} /> Invite Member
              </Button>
            </div>

            <SentInvitationsTable />
          </div>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <InviteMemberForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default WorkSpacePromoetDeatailsDisplay;
