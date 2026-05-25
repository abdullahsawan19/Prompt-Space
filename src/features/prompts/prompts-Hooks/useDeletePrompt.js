import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePrompt } from "../../../services/apiPrompts";
import toast from "react-hot-toast";

export function useDeletePrompt() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deletePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      toast.success("Prompt deleted successfully!");
    },
    onError: (err) => {
      console.error("Error deleting prompt:", err.message);
    },
  });

  return { mutate, isPending };
}
