import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "../../../config/supabase";

export const useSignup = () => {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signupApi,

    onSuccess: async () => {
      await supabase.auth.signOut();
      navigate("/login");
      toast.success("Account created successfully! Please log in.");
    },

    onError: (err) => {
      console.error("Signup error:", err.message);
      toast.error(err.message);
    },
  });

  return { mutate, isPending, error };
};
