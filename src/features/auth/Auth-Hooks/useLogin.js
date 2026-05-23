import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginApi,
    onSuccess: async (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard");
      toast.success("Logged in successfully!");
    },
    onError: (err) => {
      console.error("Login error:", err.message);
      toast.error(err.message);
    },
  });
  return { mutate, isPending, error };
};
