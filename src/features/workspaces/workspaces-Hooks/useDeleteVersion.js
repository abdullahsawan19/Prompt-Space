import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVersion } from "../../../services/apiPrompts";
import toast from "react-hot-toast";

export function useDeleteVersion() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteVersion,
    onSuccess: () => {
      toast.success("Version deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
    onError: (err) => {
      toast.error("Error deleting version:", err.message);
    },
  });
  return { mutate, isPending };
}
