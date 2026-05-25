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
    staleTime: 5 * 60 * 1000,
  });

  return {
    user,
    isLoading,
    isAuthenticated: user?.role === "authenticated",
    isFetching: fetchStatus === "fetching",
  };
}
