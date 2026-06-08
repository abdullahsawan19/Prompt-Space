import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteWorkspace } from "../../../services/apiWorkspaces";

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
      queryClient.invalidateQueries({ queryKey: ["pieChart"] });
      toast.success("Workspace deleted successfully!");
    },
    onError: (err) => {
      toast.error("Error deleting workspace:", err.message);
    },
  });
  return { mutate, isPending };
}
