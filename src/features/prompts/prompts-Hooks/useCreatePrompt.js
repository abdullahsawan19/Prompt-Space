import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPrompt as createPromptApi } from "../../../services/apiPrompts";
import toast from "react-hot-toast";

export function useCreatePrompt() {
  const queryClint = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPromptApi,
    onSuccess: () => {
      toast.success("Prompt created successfully!");
      queryClint.invalidateQueries({ queryKey: ["prompts"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isPending };
}
