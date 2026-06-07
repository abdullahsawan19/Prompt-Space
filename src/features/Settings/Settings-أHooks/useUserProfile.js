import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../auth/Auth-Hooks/useUser";
import { getUserProfile } from "../../../services/apiInvitations";

export function useUserProfile() {
  const { user } = useUser();
  const { data: profile, isPending } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getUserProfile(user?.id),
    enabled: !!user?.id,
  });

  return { profile, isPending };
}
