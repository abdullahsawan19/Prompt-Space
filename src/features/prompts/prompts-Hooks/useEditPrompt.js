import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPrompt } from "../../../services/apiPrompts";

export function useEditPrompt() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editPrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
    onError: (err) => {
      console.error("Error editing prompt:", err.message);
    },
  });

  return { mutate, isPending };
}
