import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/auth";

export function useUser() {
  const {
    data: user,
    isLoading,
    fetchStatus,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
    isFetching: fetchStatus === "fetching",
  };
}
