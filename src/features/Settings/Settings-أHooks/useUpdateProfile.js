import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../../../services/auth";
import toast from "react-hot-toast";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateProfile, isUpdating };
}
