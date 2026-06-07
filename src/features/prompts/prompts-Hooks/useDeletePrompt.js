import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePrompt } from "../../../services/apiPrompts";
import toast from "react-hot-toast";

export function useDeletePrompt() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deletePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      queryClient.invalidateQueries({ queryKey: ["recentPrompts"] });
      toast.success("Prompt deleted successfully!");
    },
    onError: (err) => {
      toast.error("Error deleting prompt:", err.message);
    },
  });

  return { mutate, isPending };
}
