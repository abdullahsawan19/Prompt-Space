import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvitation } from "../../../services/apiInvitations";
import toast from "react-hot-toast";

export function useDeleteInvitation() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sentInvitations"] });

      toast.success("The invitation has been deleted successfully!");
    },
    onError: (err) => {
      toast.error("Error deleting invitation:", err.message);
    },
  });

  return { mutate, isPending };
}
