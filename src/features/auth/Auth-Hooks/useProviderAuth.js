import { useState } from "react";
import toast from "react-hot-toast";
import { loginWithProvider } from "../../../services/auth";

export const useProviderAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const authWithProvider = async (provider) => {
    try {
      setIsLoading(true);
      await loginWithProvider(provider);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return { authWithProvider, isLoading };
};
