import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPrompt as createPromptApi } from "../../../services/apiPrompts";
import toast from "react-hot-toast";

export function useCreatePrompt() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPromptApi,
    onSuccess: () => {
      toast.success("Prompt created successfully!");
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      queryClient.invalidateQueries({ queryKey: ["recentPrompts"] });
      queryClient.invalidateQueries({ queryKey: ["areaChart"] });
      queryClient.invalidateQueries({ queryKey: ["pieChart"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { mutate, isPending };
}
