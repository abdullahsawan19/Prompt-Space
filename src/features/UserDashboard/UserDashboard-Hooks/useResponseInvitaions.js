import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvitationStatus } from "../../../services/apiInvitations";
import toast from "react-hot-toast";

export function useResponseInvitaions() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateInvitationStatus,
    onSuccess: (_, variables) => {
      toast.success(`Invitation ${variables.status} successfully!`);
      queryClient.invalidateQueries({ queryKey: ["myInvitations"] });
      if (variables.status === "accepted") {
        queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      }
    },
    onError: (err) => toast.error("Could not update invitation status"),
  });
  return { mutate, isPending };
}
