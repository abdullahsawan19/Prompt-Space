import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateInvitationPreference } from "../../../services/apiInvitations";

export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  const { mutate: updatePreferences, isPending: isUpdating } = useMutation({
    mutationFn: updateInvitationPreference,
    onSuccess: () => {
      toast.success("Preferences updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updatePreferences, isUpdating };
}
