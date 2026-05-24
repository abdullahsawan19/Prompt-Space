import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../../services/auth";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.cancelQueries();
      queryClient.removeQueries();
      navigate("/", { replace: true });
    },
  });
  return {
    mutate,
    isPending,
  };
};
