import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sendInvitation } from "../../../services/apiInvitations";

export function useSendInvitation() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: sendInvitation,
    onSuccess: () => {
      toast.success("Invitation sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["sentInvitations"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
