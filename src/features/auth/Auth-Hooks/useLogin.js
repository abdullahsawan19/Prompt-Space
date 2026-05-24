import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/auth";
import { getCurrentUser as getCurrentUserApi } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginApi,
    onSuccess: async () => {
      const user = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: getCurrentUserApi,
      });

      toast.success("Logged in successfully!");

      if (user?.is_super_admin) {
        navigate("/admin/stats", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    },
    onError: (err) => {
      console.error("Login error:", err.message);
      toast.error(err.message);
    },
  });
  return { mutate, isPending, error };
};
