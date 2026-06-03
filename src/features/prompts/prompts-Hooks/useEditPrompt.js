import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPrompt as editPromptApi } from "../../../services/apiPrompts";
import toast from "react-hot-toast";

export function useEditPrompt() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editPromptApi,

    onMutate: async (newPromptData) => {
      await queryClient.cancelQueries({ queryKey: ["workspace"] });

      const previousWorkspaces = queryClient.getQueriesData({
        queryKey: ["workspace"],
      });

      queryClient.setQueriesData({ queryKey: ["workspace"] }, (oldData) => {
        if (!oldData || !oldData.prompts) return oldData;

        const updatedPrompts = oldData.prompts.map((prompt) => {
          if (prompt.id === newPromptData.promptId) {
            const tempVersionNumber =
              prompt.prompt_versions?.length > 0
                ? Math.max(
                    ...prompt.prompt_versions.map((v) => v.version_number),
                  ) + 1
                : 1;

            const optimisticVersion = {
              id: `temp-${Date.now()}`,
              content: newPromptData.content,
              version_number: tempVersionNumber,
            };

            return {
              ...prompt,
              prompt_versions: [
                optimisticVersion,
                ...(prompt.prompt_versions || []),
              ],
            };
          }
          return prompt;
        });

        return { ...oldData, prompts: updatedPrompts };
      });

      return { previousWorkspaces };
    },

    onError: (err, newPromptData, context) => {
      if (context?.previousWorkspaces) {
        context.previousWorkspaces.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error("Error editing prompt: " + err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
    },

    onSuccess: () => {
      toast.success("New version created successfully!");
    },
  });

  return { mutate, isPending };
}
